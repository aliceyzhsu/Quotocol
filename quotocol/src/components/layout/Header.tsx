import React from "react";
import Link from "next/link";
import { DynamicContextProvider, DynamicWidget } from '@dynamic-labs/sdk-react-core';
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";

const setButton = () => {
    return (
        <button>
            Connect Wallet
        </button>
    )
}

const Header = () => {
    const btnContent = setButton();

    return (
        <DynamicContextProvider
            settings={{
                environmentId: 'e98eade3-2577-4c98-bce5-3a4d0f40ba0c',
                walletConnectors: [EthereumWalletConnectors],
            }}
        >
            <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-16">
                        <Link
                            href="/"
                            className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 
                            bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                        >
                            Quotocol
                        </Link>

                        <DynamicWidget innerButtonComponent={btnContent} />
                    </div>
                </div>
            </header>
        </DynamicContextProvider>
    );
};

export default Header;