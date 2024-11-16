// Only run this as a WASM if the export-abi feature is not set.
#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

// Modules and imports
mod erc721;

use stylus_sdk::{
    msg, 
    prelude::*, 
    evm,
    call::Call,
    alloy_primitives::{U256, Address}
};
use alloy_sol_types::sol;
use crate::erc721::{Erc721, Erc721Params, Erc721Error};

sol_interface! {
    interface Storage {
        function setderivuri(uint256, string) external;
        function getderivuri(uint256) external returns(string);
    }
}

/// Immutable definitions
struct DerivativeNFTParams;
impl Erc721Params for DerivativeNFTParams {
    const NAME: &'static str = "DerivativeNFT";
    const SYMBOL: &'static str = "DERIV";
}

sol_storage! {
    #[entrypoint]
    struct DerivativeNFT {
        #[borrow]
        Erc721<DerivativeNFTParams> erc721;
        address authority;
        address storage;
        address source_contract_addr;
    }
}

sol! {
    error ErrorSetURI();
    error Unauthorized(address from);
}

#[derive(SolidityError)]
pub enum StorageError {
    ErrorSetURI(ErrorSetURI),
    Unauthorized(Unauthorized),
}

#[public]
#[inherit(Erc721<DerivativeNFTParams>)]
impl DerivativeNFT {
    /// Mints an NFT
    pub fn mint(&mut self) -> Result<(), Erc721Error> {
        let minter = msg::sender();
        self.erc721.mint(minter)?;
        Ok(())
    }

    /// Mints an NFT to another address
    pub fn mint_to(&mut self, to: Address) -> Result<(), Erc721Error> {
        self.erc721.mint(to)?;
        Ok(())
    }

    /// Burns an NFT
    pub fn burn(&mut self, token_id: U256) -> Result<(), Erc721Error> {
        // This function checks that msg::sender() owns the specified token_id
        self.erc721.burn(msg::sender(), token_id)?;
        Ok(())
    }

    /// Total supply
    pub fn total_supply(&mut self) -> Result<U256, Erc721Error> {
        Ok(self.erc721.total_supply.get())
    }

    #[selector(name = "setSrcContract")]
    pub fn set_source_contract(&mut self, contract_addr: Address) -> Result<(), Erc721Error> {
        if self.authority.get() != msg::sender() {
            return Err(Erc721Error::Unauthorized(erc721::NotAuthority { from: msg::sender() }));
        }
        evm::log(erc721::SrcContractSet{
            src_contract_addr: contract_addr,
        });
        
        Ok(())
    }

    #[selector(name = "setAuthority")]
    pub fn set_authority(&mut self, _authority: Address) -> Result<(), Erc721Error> {
        if self.authority.get() != Address::from([0; 20]) {
            if self.authority.get() != msg::sender() {
                return Err(Erc721Error::Unauthorized(erc721::NotAuthority { from: msg::sender() }));
            }
        }
        let old_auth = self.authority.get();
        self.authority.set(_authority);
        evm::log(erc721::AuthoritySet{
            old_auth: old_auth,
            new_auth: _authority,
        });
        Ok(())
    }

    #[selector(name = "setStorage")]
    pub fn set_storage(&mut self, addr: Address) -> Result<(), StorageError> {
        if self.authority.get() != msg::sender() {
            return Err(StorageError::Unauthorized(Unauthorized { from: msg::sender() }));
        }
        self.storage.set(addr);
        Ok(())
    }

    #[selector(name = "setURI")]
    pub fn set_uri(&mut self, token_id: U256, uri: String) -> Result<(), StorageError> {
        if self.authority.get() != msg::sender() {
            return Err(StorageError::Unauthorized(Unauthorized { from: msg::sender() }));
        }
        let storage_addr = self.storage.get();
        let storage = Storage::new(storage_addr);
        let config = Call::new();
        storage.setderivuri(config, token_id, uri).map_err(|_e| StorageError::ErrorSetURI(ErrorSetURI {}))?;
        Ok(())
    }

    #[selector(name = "tokenURI")]
    pub fn token_uri(&self, token_id: U256) -> Result<String, StorageError> {
        let storage_addr = self.storage.get();
        let storage = Storage::new(storage_addr);
        let config = Call::new();
        let uri = storage.getderivuri(config, token_id)
            .map_err(|_e| StorageError::ErrorSetURI(ErrorSetURI {}))?;
        Ok(uri)
    }
    
    #[selector(name = "authority")]
    pub fn authority(&self) -> Address {
        self.authority.get()
    }

    #[selector(name = "storage")]
    pub fn storage(&self) -> Address {
        self.storage.get()
    }
}