// Only run this as a WASM if the export-abi feature is not set.
#![cfg_attr(not(any(feature = "export-abi", test)), no_main)]
extern crate alloc;

// Modules and imports
mod erc721;

use alloy_primitives::{U256, Address};
/// Import the Stylus SDK along with alloy primitive types for use in our program.
use stylus_sdk::{
    msg, prelude::*
};
use crate::erc721::{Erc721, Erc721Params, Erc721Error};

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
        /// token_id to tokenURI
        mapping(uint256 => string) uris;
        /// token_id to derivatives count
        mapping(uint256 => uint256) cnt_deriv;
    }
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

    #[selector(name = "setURI")]
    pub fn set_uri(&mut self, token_id: U256, _uri: String) -> Result<(), Erc721Error> {
        if self.authority.get() != msg::sender() {
            return Err(Erc721Error::Unauthorized(erc721::NotAuthority { from: msg::sender() }));
        }
        let mut uri = self.uris.setter(token_id);
        uri.set_str(_uri);
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
    pub fn token_uri(&self, token_id: U256) -> Result<String, Erc721Error> {
        self.erc721.owner_of(token_id)?; // require NFT exist
        let uri = self.uris.get(token_id);
        if uri.get_string().is_empty(){
            Err(Erc721Error::NoURI(erc721::NoURITokenId { token_id }))
        }else{
            Ok(uri.get_string())
        }
    }

    pub fn authority(& self) -> Result<Address, Erc721Error> {
        Ok(self.authority.get())
    }
}