"use client";

import { FC } from 'react';
import {
    useSimulateContract,
    useWriteContract,
    useWaitForTransactionReceipt,
} from 'wagmi';

interface MintBtnProps {
    nftId: string;
    quoteContent: string;
    disabled?: boolean;
}

export const MintBtn: FC<MintBtnProps> = ({ nftId, quoteContent, disabled }) => {
    const { data: simulateData } = useSimulateContract({
        abi: [
            {
                inputs: [
                    { internalType: "uint256", name: "tokenId", type: "uint256" },
                    { internalType: "string", name: "content", type: "string" }
                ],
                name: 'mint',
                outputs: [],
                stateMutability: 'nonpayable',
                type: 'function',
            },
        ] as const,
        // TODO: no contract address
        address: process.env.NEXT_PUBLIC_QUOTE_CONTRACT_ADDRESS as `0x${string}`,
        functionName: 'mint',
        args: [BigInt(nftId), quoteContent],
    });

    const { writeContract, data: hash } = useWriteContract();

    const { isLoading, isSuccess } = useWaitForTransactionReceipt({
        hash,
    });

    const handleMint = () => {
        if (simulateData?.request) {
            writeContract(simulateData.request);
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
                <div className="text-green-500">
                    Successfully minted your quote NFT!
                    <div>
                        <a
                            href={`https://etherscan.io/tx/${hash}`}
                            className="text-blue-500 hover:underline"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View on Etherscan
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};
