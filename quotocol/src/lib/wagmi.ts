import { http, createConfig } from 'wagmi'
import { mainnet, sepolia, arbitrumSepolia } from 'wagmi/chains'

export const config = createConfig({
  chains: [mainnet, sepolia, arbitrumSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [arbitrumSepolia.id]: http(),
  },
}); 