"use client";

import { FC, useState } from 'react';
import { ethers } from 'ethers';

interface MintBtnProps {
    disabled?: boolean;
}

export const MintBtn: FC<MintBtnProps> = ({ disabled }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [hash, setHash] = useState<string>('');

    const contractABI = [
        "function mint() public payable",
    ];
    const contractAddress = '0x899455f74487d7Bbd1dCC59023a2A7cb92091219';

    const handleMint = async () => {
        try {
            setIsLoading(true);

            if (!window.ethereum) {
                throw new Error("Please install MetaMask!");
            }

            // Arbitrum Sepolia configuration
            const arbitrumSepoliaChainId = "0x66eee"; // 421614 in hex
            const currentChainId = await window.ethereum.request({ method: 'eth_chainId' });

            if (currentChainId !== arbitrumSepoliaChainId) {
                try {
                    await window.ethereum.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: arbitrumSepoliaChainId }],
                    });
                } catch (switchError: any) {
                    // If the chain hasn't been added to MetaMask, add it
                    try {
                        await window.ethereum.request({
                            method: 'wallet_addEthereumChain',
                            params: [{
                                chainId: arbitrumSepoliaChainId,
                                chainName: 'Arbitrum Sepolia',
                                nativeCurrency: {
                                    name: 'ETH',
                                    symbol: 'ETH',
                                    decimals: 18
                                },
                                rpcUrls: ['https://sepolia-rollup.arbitrum.io/rpc'],
                                blockExplorerUrls: ['https://sepolia.arbiscan.io']
                            }]
                        });
                    } catch (addError) {
                        throw new Error("Please switch to Arbitrum Sepolia network in MetaMask");
                    }
                }
            }

            await window.ethereum.request({
                method: 'eth_requestAccounts'
            });

            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();

            // Get the network to ensure we're on the right chain
            const network = await provider.getNetwork();
            console.log("Current network:", network.chainId);

            const contract = new ethers.Contract(
                contractAddress,
                contractABI,
                signer
            );

            // Add gas estimation with higher limit
            const gasLimit = await contract.mint.estimateGas();

            // Add 20% to the estimated gas limit
            const adjustedGasLimit = gasLimit * BigInt(120) / BigInt(100);

            console.log("Estimated gas:", gasLimit.toString());
            console.log("Adjusted gas limit:", adjustedGasLimit);

            // Call mint function with explicit gas limit
            const tx = await contract.mint(
                {
                    gasLimit: adjustedGasLimit
                }
            );

            console.log("Transaction sent:", tx.hash);

            const receipt = await tx.wait();
            console.log("Transaction receipt:", receipt);

            setHash(receipt.hash);
            setIsSuccess(true);

        } catch (error: any) {
            console.error("Error minting:", error);
            // More detailed error message
            if (error.reason) {
                alert(`Failed to mint: ${error.reason}`);
            } else if (error.data?.message) {
                alert(`Failed to mint: ${error.data.message}`);
            } else {
                alert("Failed to mint. Please check console for details.");
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4">
            <button
                onClick={handleMint}
                disabled={isLoading || disabled}
                className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg 
                            disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? 'Minting...' : 'Confirm to mint'}
            </button>
            {isSuccess && (
                <>
                    {disabled = true}
                    <div className="fixed bottom-4 right-4 bg-white shadow-lg rounded-lg p-4 border border-green-500 flex flex-col gap-2 animate-fade-in">
                        <div className="flex items-center gap-2">
                            <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                            <span className="text-green-500 font-medium">Successfully minted your NFT!</span>
                        </div>
                        <a
                            href={`https://sepolia.arbiscan.io/tx/${hash}`}
                            className="text-blue-500 hover:underline flex items-center gap-1"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <span>View on Arbiscan</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </>
            )}
        </div>
    );
};