import React from "react";
import ArchiveSource from '@/components/ArchiveSource';
import QuoteDerivation from '@/components/QuoteDerivation';
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const setButton = () => {
    return (
        <button>
            Connect Wallet
        </button>
    )
}

const Middle = () => {
    const btnContent = setButton();

    return (
        <DynamicContextProvider
            settings={{
                environmentId: 'e98eade3-2577-4c98-bce5-3a4d0f40ba0c',
                walletConnectors: [EthereumWalletConnectors],
            }}
        >
            <div className="bg-gradient-to-b from-gray-50 to-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Header Section */}
                    <header className="flex justify-between items-center mb-12">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Quotocol
                        </h1>
                        <div className="flex items-center">
                            <DynamicWidget innerButtonComponent={btnContent} />
                        </div>
                    </header>

                    {/* Main Content */}
                    <main className="space-y-12">
                        {/* Archive Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                Archive Source
                            </h2>
                            <ArchiveSource />
                        </section>

                        {/* Quote Section */}
                        <section className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                                Quote Derivation
                            </h2>
                            <QuoteDerivation />
                        </section>
                    </main>
                </div>
            </div>
        </DynamicContextProvider>
    );
};

export default Middle;
