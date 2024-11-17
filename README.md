## Contracts
all deployed on [Arbitrum Sepolia](https://sepolia.arbiscan.io)
- sourceNFT contract: [0x4cb55ebb1c57e1f72842718147441412708f6521](https://sepolia.arbiscan.io/address/0x4cb55ebb1c57e1f72842718147441412708f6521)
- derivativeNFT contract: [0x7cd7dedb79fdb1d442beab19633a1bc3e172bac3](https://sepolia.arbiscan.io/address/0x7cd7dedb79fdb1d442beab19633a1bc3e172bac3)
- guard contract: [0x1bbf9fc473b5da74c5b08da9ea8daba35ef77f95](https://sepolia.arbiscan.io/address/0x1bbf9fc473b5da74c5b08da9ea8daba35ef77f95)
- storage contract: [0x5ef067f435e4b25d91d5787219bfcf7180cc32ee](https://sepolia.arbiscan.io/address/0x5ef067f435e4b25d91d5787219bfcf7180cc32ee)

I tried varify contracts on arbiscan, but for some unknown reason didn't make it.

## Implementation
Quotocol is considered to be capable to handle big amount of queries with low tx fees, since the higher the tx fee is, the less passion user would have to use our service. So we chose Arbitrum, a well know L2 network to deploy our contracts on.

In addition, I'm personally a fan of rust🦀, so when I know that Arbitrum presents stylus, which enable us to contribution to EVM ecosystem using rust language, I was very excited. So we implemented all our contracts in rust with Arbitrum Stylus. 

Technically, we deployed 4 contracts, namely sourceNFT, derivativeNFT, storage and guard. sourceNFT and derivativeNFT are our main NFT contracts logics. And some data of them are stored in another storage contract. And we use cross contracts calls to communicate them. Further more, we deployed a guard contract to avoid malicious minting by some random bad guys. So all minting should go to guard, and guard will call mint for sourceNFTs and derivativeNFTs, instead of users directly calling these two contracts. The guard ensures our quotations are really verified and all NFTs will not be minted to wrong addresses. 

We use TS to write front end, and Dynamic to build a better login experience.

## Concepting
TLDR: quotocol provides a better form of quotation: 
- For Public Figures like Politicians, critics, writers … Quotocol provides their words with More Power of Influence.
- For Media like CNN, WSJ, Coindesk … Quotocol make their quotaions and articles with More Credible and Trustable.
- For Readers like you and me, Quotocol ensures a way Easier Verification for a quotation.

Nowadays, the mainstream quotation form is stick a hyper link of source onto the quotation text. But is this really a good form of quotation? Think about it. It is still unconvenient and tiring for readers to verify the quotation. The adversary can totally put on a plausible link while his words actually have nothing to do with the link. One has to read the whole article behind the link to find out if the quotation is an approriate one. 

Now let's imagine a better form of quotation, which should be very convenient and easy for readers to see if it's a proper quotaion. Therefore, we present Quotocol. Our main product is a new kind of quotation link. This kind of links point to the source content, and also along with a certificate that proves the quotation to be true. With this certificate, readers can have more confidence to trust in the quotation. 

In practice, we abtract quotations and their sources into NFTs, namely derivativeNFTs and sourceNFTs. Writers and politicians can increase the influence of their words or articles by minting sourceNFTs for others to quote. And a valid quotation must be based on a valid source NFT. To derive a quotation from a sourceNFT, quoter need to issue a query, including the sourceNFT and the quotation text. To ensure the quotation is a proper one and is not distorted from original meaning, we use an AI senate to judge. I.e. a senate consists with several different AI agents deciding together and give a majority voting to output the final decision. 

Further more, we can build a quotemarket, where we can list most quoted words or articles in the fashion of sourceNFTs, and most viewed derivativeNFTs. Which give both original content providers and their quoters more incentives, and help grow a bigger and more active community. Reader can go to the quotemarket and check most valued words, and media writers can find good quotation sources more easily and check how most viewed quotations are like.
