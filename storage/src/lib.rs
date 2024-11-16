// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

/// Import items from the SDK. The prelude contains common traits and macros.
use stylus_sdk::{
    alloy_primitives::U256,
    prelude::*
};
use alloy_sol_types::sol;

sol_storage! {
    #[entrypoint]
    pub struct Storage {
        mapping(uint256 => string) src_uri;
        mapping(uint256 => string) deriv_uri;
    }
}

sol! {
    error ErrorSetURI();
    error Unauthorized();
}

#[derive(SolidityError)]
pub enum StorageError {
    ErrorSetURI(ErrorSetURI),
    Unauthorized(Unauthorized),
}

/// Declare that `Counter` is a contract with the following external methods.
#[public]
impl Storage {
    #[selector(name = "getsrcuri")]
    pub fn getsrcuri(&mut self, token_id: U256) -> String {
        self.src_uri.get(token_id).get_string()
    }

    #[selector(name = "setsrcuri")]
    pub fn setsrcuri(&mut self, token_id: U256, _uri: String) {
        let mut uri = self.src_uri.setter(token_id);
        uri.set_str(_uri);
    }

    #[selector(name = "getderivuri")]
    pub fn getderivuri(&mut self, token_id: U256) -> Result<String, StorageError> {
        Ok(self.deriv_uri.get(token_id).get_string())
    }

    #[selector(name = "setderivuri")]
    pub fn setderivuri(&mut self, token_id: U256, _uri: String) -> Result<(), StorageError>{
        let mut uri = self.deriv_uri.setter(token_id);
        uri.set_str(_uri);
        Ok(())
    }
}
