## for Stylus
I am Rustacean and I kinda like rust very much, and that's why I chose stylus in this hackathon. I really appreciate your efforts that make us able to develop EVM ecosystem in rust. Hope you can keep getting better and attract more developers to code in rust. So here are some troubles I've met in my development:

- It usually raises this error: `error: the lock file /source/Cargo.lock needs to be updated but --locked was passed to prevent this. If you want to try to generate the lock file without accessing the network, remove the --locked flag and use --offline instead.` when trying to deploy, i.e. `cast deploy`.
    - dunno why, but I noticed that:
    - after I change `Cargo.toml`, the error occurs.
    - at the very begining, I can `cargo stylus new` a brand new project and can easily make it deployed without any change. but oddly, after a whole day developing, I can't even deploy a brand new boilerplate project, which is really wierd for me.
    - I have to copy `Cargo.toml` and `Cargo.lock` of old project that can be deployed to new projects so that the new ones can be deployed.

- It's really so convenient to call other contract's functions. It is already not so easy to do this in vanilla solidity, and it seems even harder in stylus. maybe we can make it more abstracted and more encapsulated. 

- Contract code can easily exceed max code size. I only added like around a hunder lines of codes and it got oversized. I wonder is it normal? since I've seen many NFT contracts having many thousands lines. 
