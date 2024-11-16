"use client";

import React from 'react';
import QuoteForm from './QuoteForm';
import { DynamicContextProvider } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiProvider } from 'wagmi'
import { config } from '@/lib/wagmi'

const queryClient = new QueryClient()

const ArchiveFormWrapper = () => {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <DynamicContextProvider
                    settings={{
                        environmentId: 'e98eade3-2577-4c98-bce5-3a4d0f40ba0c',
                        walletConnectors: [EthereumWalletConnectors],
                    }}>
                    {/* Add your form content here */}
                    <QuoteForm />
                </DynamicContextProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default ArchiveFormWrapper;