"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ArchiveSource = () => {
    const router = useRouter();

    const handleArchiveClick = () => {
        router.push('/archive');
    };

    return (
        <div className="flex justify-center relative z-0">
            <button
                type="button"
                onClick={handleArchiveClick}
                className="group relative px-8 py-4 w-full max-w-md overflow-hidden rounded-xl 
                bg-gradient-to-r from-purple-600 to-blue-500 
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
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                    </svg>
                    Archive words as SourceNFT
                </span>

                {/* Animated Background */}
                <div className="absolute inset-0 z-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300" />

                {/* Glow Effect */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-blue-400/20 blur-xl 
                        scale-150 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
            </button>
        </div>
    );
};

export default ArchiveSource;