// Only run this as a WASM if the export-abi feature is not set.
#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

// Modules and imports
mod erc721;

/// Import the Stylus SDK along with alloy primitive types for use in our program.
use stylus_sdk::{
    msg, 
    prelude::*, 
    call::Call,
    alloy_primitives::{U256, Address}
};
use alloy_sol_types::sol;
use crate::erc721::{Erc721, Erc721Params, Erc721Error};

sol_interface! {
    interface Storage {
        function setsrcuri(uint256, string) external;
        function getsrcuri(uint256) external returns(string);
    }
}

/// Immutable definitions
struct SourceNFTParams;
impl Erc721Params for SourceNFTParams {
    const NAME: &'static str = "SourceNFT";
    const SYMBOL: &'static str = "SRC";
}

// Define the entrypoint as a Solidity storage object. The sol_storage! macro
// will generate Rust-equivalent structs with all fields mapped to Solidity-equivalent
// storage slots and types.
sol_storage! {
    #[entrypoint]
    struct SourceNFT {
        #[borrow] // Allows erc721 to access StylusNFT's storage and make calls
        Erc721<SourceNFTParams> erc721;

        address authority;
        address storage;
        /// token_id to derivatives count
        mapping(uint256 => uint256) cnt_deriv;
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
#[inherit(Erc721<SourceNFTParams>)]
impl SourceNFT {
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
        storage.setsrcuri(config, token_id, uri).map_err(|_e| StorageError::ErrorSetURI(ErrorSetURI {}))?;
        Ok(())
    }

    #[selector(name = "setAuthority")]
    pub fn set_authority(&mut self, _authority: Address) -> Result<(), Erc721Error> {
        if self.authority.get() != Address::from([0; 20]) {
            if self.authority.get() != msg::sender() {
                return Err(Erc721Error::Unauthorized(erc721::NotAuthority { from: msg::sender() }));
            }
        }
        self.authority.set(_authority);
        Ok(())
    }

    #[selector(name = "increDeriv")]
    pub fn increment_derivatives(&mut self, token_id: U256) -> Result<U256, Erc721Error> {
        if self.authority.get() != msg::sender() {
            return Err(Erc721Error::Unauthorized(erc721::NotAuthority { from: msg::sender() }));
        }
        let mut cnt = self.cnt_deriv.setter(token_id);
        let old_cnt = cnt.get();
        cnt.set(old_cnt + U256::from(1));
        Ok(cnt.get())
    }

    #[selector(name = "tokenURI")]
    pub fn token_uri(&self, token_id: U256) -> Result<String, StorageError> {
        let storage_addr = self.storage.get();
        let storage = Storage::new(storage_addr);
        let config = Call::new();
        let uri = storage.getsrcuri(config, token_id)
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