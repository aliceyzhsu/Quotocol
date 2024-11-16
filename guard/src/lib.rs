// Only run this as a WASM if the export-abi feature is not set.
#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

use alloy_primitives::FixedBytes;
/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{
    abi::Bytes, 
    alloy_primitives::{address, Address, U256}, 
    call::{self, Call}, 
    crypto::keccak, 
    msg, 
    prelude::*};
use alloc::string::String;
use alloy_sol_types::{sol_data::{Address as SOLAddress, FixedBytes as SolFixedBytes, *}, SolType, sol};

type ECRECOVERType = (SolFixedBytes<32>, Uint<8>, SolFixedBytes<32>, SolFixedBytes<32>);

sol_interface! {
    interface SourceNFT {
        function mint() external returns(uint256);
    }
    interface DerivativeNFT {
        function mint() external returns(uint256);
    }
}

sol!{
    error EcrecoverCallError();
    error InvalidSignatureLength();
    error Unauthorized(address from);
    error MintFailed();
}

sol_storage! {
    #[entrypoint]  
    pub struct Guard{
        address authority;
        address src;
        address deriv;
}
}

#[derive(SolidityError)]
pub enum GuardError {
    EcrecoverCallError(EcrecoverCallError),
    InvalidSignatureLength(InvalidSignatureLength),
    Unauthorized(Unauthorized),
    MintFailed(MintFailed),
}

const ECRECOVER: Address = address!("0000000000000000000000000000000000000001");
const SIGNED_MESSAGE_HEAD: &'static str = "\x19Server Alice Signed Message:\n32";

#[public]
impl Guard {
    #[selector(name = "setAuthority")]
    pub fn set_authority(&mut self, _authority: Address) -> Result<(), GuardError> {
        if self.authority.get() != Address::from([0; 20]) {
            if self.authority.get() != msg::sender() {
                return Err(GuardError::Unauthorized(Unauthorized { from: msg::sender()}));
            }
        }
        self.authority.set(_authority);
        Ok(())
    }

    #[selector(name = "authority")]
    pub fn authority(&self) -> Address {
        self.authority.get()
    }

    pub fn get_message_hash(
        &self,
        message: String,
    ) -> FixedBytes<32> {
        let message_data = message.as_bytes();
        keccak(message_data).into()
    }

    #[selector(name = "setSrc")]
    pub fn set_src(&mut self, addr: Address) -> Result<(), GuardError> {
        if self.authority.get() != msg::sender() {
            return Err(GuardError::Unauthorized(Unauthorized { from: msg::sender()}));
        }
        self.src.set(addr);
        Ok(())
    }

    #[selector(name = "setDeriv")]
    pub fn set_deriv(&mut self, addr: Address) -> Result<(), GuardError> {
        if self.authority.get() != msg::sender() {
            return Err(GuardError::Unauthorized(Unauthorized { from: msg::sender()}));
        }
        self.deriv.set(addr);
        Ok(())
    }

    #[selector(name = "mintSrc")]
    pub fn verify_mint_src(&self, ipfs: String, signature: Bytes) -> Result<U256, GuardError> {
        match self.verify(ipfs, signature) {
            Ok(true) => {
                let src_addr = self.src.get();
                let src_contract = SourceNFT::new(src_addr);
                let config = Call::new();
                match src_contract.mint(config) {
                    Ok(i) => Ok(i),
                    _ => Err(GuardError::MintFailed(MintFailed {}))
                }
            }
            _ => Err(GuardError::EcrecoverCallError(EcrecoverCallError {})),
        }
    }

    #[selector(name = "mintDeriv")]
    pub fn verify_mint_deriv(&self, ipfs: String, signature: Bytes) -> Result<U256, GuardError> {
        match self.verify(ipfs, signature) {
            Ok(true) => {
                let deriv_addr = self.deriv.get();
                let deriv_contract = SourceNFT::new(deriv_addr);
                let config = Call::new();
                match deriv_contract.mint(config) {
                    Ok(i) => Ok(i),
                    _ => Err(GuardError::MintFailed(MintFailed {}))
                }
            }
            _ => Err(GuardError::EcrecoverCallError(EcrecoverCallError {})),
        }
    }

    #[selector(name = "signMsg")]
    pub fn sign_message(
        &self,
        message: String,
    ) -> Result<FixedBytes<32>, GuardError> {
        if self.authority.get() != msg::sender() {
            return Err(GuardError::Unauthorized(Unauthorized { from: msg::sender()}));
        }
        let msg_data = message.as_bytes();
        let msg_data: FixedBytes<32> = keccak(msg_data).into();
        let message_to_be_decoded = [SIGNED_MESSAGE_HEAD.as_bytes(), &msg_data.to_vec()].concat();
        Ok(keccak(message_to_be_decoded).into())
    }

    pub fn get_eth_signed_message_hash(&self, message_hash: FixedBytes<32>) -> FixedBytes<32> {
        let message_to_be_decoded = [SIGNED_MESSAGE_HEAD.as_bytes(), &message_hash.to_vec()].concat();
        keccak(message_to_be_decoded).into()
    }

    /* 4. Verify signature
    signer = 0xB273216C05A8c0D4F0a4Dd0d7Bae1D2EfFE636dd
    to = 0x14723A09ACff6D2A60DcdF7aA4AFf308FDDC160C
    amount = 123
    message = "coffee and donuts"
    nonce = 1
    signature =
        0x993dab3dd91f5c6dc28e17439be475478f5635c92a56e17e82349d3fb2f166196f466c0b4e0c146f285204f0dcb13e5ae67bc33f4b888ec32dfe0a063e8f3f781b
    */
    pub fn verify(
        &self,
        message: String,
        signature: Bytes,
    ) -> Result<bool, GuardError> {
        let message_hash = self.get_message_hash(message);
        let eth_signed_message_hash = self.get_eth_signed_message_hash(message_hash);
        match self.recover_signer(eth_signed_message_hash, signature) {
            Ok(recovered_signer) => Ok(recovered_signer == self.authority.get()),
            Err(err) => Ok(true),
        }
    }

    pub fn recover_signer(
        &self,
        eth_signed_message_hash: FixedBytes<32>,
        signature: Bytes
    ) -> Result<Address, GuardError> {
        let (r, s, v) = self.split_signature(signature);
        self.ecrecover_call(eth_signed_message_hash, v, r, s)
    }

    /// Invoke the ECRECOVER precompile.
    pub fn ecrecover_call(
        &self,
        hash: FixedBytes<32>,
        v: u8,
        r: FixedBytes<32>,
        s: FixedBytes<32>,
    ) -> Result<Address, GuardError> {
        let data = (hash, v, r, s);
        let encoded_data = ECRECOVERType::abi_encode(&data);
        match call::static_call(Call::new(), ECRECOVER, &encoded_data) {
            Ok(result) => Ok(SOLAddress::abi_decode(&result, false).unwrap()),
            Err(_) => Err(GuardError::EcrecoverCallError(EcrecoverCallError{})),
        }
    }


    pub fn split_signature(
        &self,
        signature: Bytes
    ) -> (FixedBytes<32>, FixedBytes<32>, u8) {
        let r = FixedBytes::from_slice(&signature[0..32]);
        let s = FixedBytes::from_slice(&signature[32..64]);
        let v = signature[64];
        (r, s, v)
    }
            
}