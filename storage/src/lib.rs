// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{
    alloy_primitives::{U256, Address, FixedBytes},
    abi::Bytes, 
    prelude::*,
    call::{call, Call},
};
use alloc::string::String;
// Becauce the naming of alloy_primitives and alloy_sol_types is the same, so we need to re-name the types in alloy_sol_types
use sha3::{Digest, Keccak256};

// Define some persistent storage using the Solidity ABI.
// `Counter` will be the entrypoint.
sol_storage! {
    #[entrypoint]
    pub struct Storage {
        mapping(uint256 => string) src_uri;
        mapping(uint256 => string) deriv_uri;
    }
}

/// Declare that `Counter` is a contract with the following external methods.
#[public]
impl Storage {
    /// Gets the number from storage.
    #[selector(name = "getSrcURI")]
    pub fn get_src_uri(&self, token_id: U256) -> String {
        self.src_uri.get(token_id).get_string()
    }

    #[selector(name = "setSrcURI")]
    pub fn set_src_uri(&mut self, token_id: U256, _uri: String) {
        let mut uri = self.src_uri.setter(token_id);
        uri.set_str(_uri);
    }

    #[selector(name = "getDerivURI")]
    pub fn get_deriv_uri(&self, token_id: U256) -> String {
        self.deriv_uri.get(token_id).get_string()
    }

    #[selector(name = "setDerivURI")]
    pub fn set_deriv_uri(&mut self, token_id: U256, _uri: String) {
        let mut uri = self.deriv_uri.setter(token_id);
        uri.set_str(_uri);
    }

    #[selector(name = "mycall")]
    pub fn mycall(&mut self, token_id: U256) -> Result<(), Vec<u8>> {
        let checksummed = "0x1b9cbdc65a7bebb0be7f18d93a1896ea1fd46d7a";
        let contract = Address::parse_checksummed(checksummed, None).unwrap();

        let func = String::from("increDeriv(uint256)");
        let call_data = self.encode_with_signature(func, token_id);
        call(Call::new_in(self), contract, call_data.as_slice())?;
        Ok(())
    }

    pub fn encode_with_signature(
        &self, 
        func: String, 
        token_id: U256
    ) -> Vec<u8> {
        type TransferType = U256;
        let tx_data = token_id;
        let data = tx_data;
        // Get function selector
        let hashed_function_selector = self.keccak256(func.as_bytes().to_vec().into());
        // Combine function selector and input data (use abi_packed way)
        let calldata = [&hashed_function_selector[..4], data.as_le_slice()].concat();
        calldata
    }

    fn keccak256(&self, data: Bytes) -> FixedBytes<32> {
        // prepare hasher
        let mut hasher = Keccak256::new();
        // populate the data
        hasher.update(data);
        // hashing with keccack256
        let result = hasher.finalize();
        // convert the result hash to FixedBytes<32>
        let result_vec = result.to_vec();
        FixedBytes::<32>::from_slice(&result_vec)
    }
}
