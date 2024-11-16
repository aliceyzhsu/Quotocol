"use client";

import React from "react";
import { useRouter } from "next/navigation";

const QuoteDerivation = () => {
    const router = useRouter();

    const handleQuoteClick = () => {
        router.push('/quote');
    };

    return (
        <div className="flex justify-center relative z-0">
            <button
                type="button"
                onClick={handleQuoteClick}
                className="group relative px-8 py-4 w-full max-w-md overflow-hidden rounded-xl 
                bg-gradient-to-r from-blue-500 to-purple-600
                transition-all duration-300 ease-out
                hover:scale-[1.02] hover:shadow-lg
                active:scale-95"
            >
                {/* Button Content */}
                <span className="relative z-[1] flex items-center justify-center gap-2 text-white font-semibold">
                    <svg 
                        className="w-5 h-5" 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                    >
                        <path fillRule="evenodd" d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z" clipRule="evenodd" />
                    </svg>
                    Make a verified quotation as DerivativeNFT
                </span>

                {/* Animated Background */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glow Effect */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 blur-xl 
                        scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </button>
        </div>
    );
};

export default QuoteDerivation;