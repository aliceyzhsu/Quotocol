"use client";

import React, { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { MintBtn } from './MintBtn';

const QuoteForm = () => {
    const { primaryWallet, user } = useDynamicContext();
    const isAuthenticated = !!user;
    const [currentStep, setCurrentStep] = useState(1);
    const [nftId, setNftId] = useState('');
    const [quoteContent, setQuoteContent] = useState('');
    const [isValidating, setIsValidating] = useState(false);
    const [isQuoteValid, setIsQuoteValid] = useState<boolean | null>(null);

    const handleNextStep = () => setCurrentStep(2);
    const handlePrevStep = () => setCurrentStep(1);

    const isFormValid = () => {
        return nftId.trim() !== '' && quoteContent.trim().length > 0;
    };

    const validateQuote = async () => {
        setIsValidating(true);
        try {
            const response = await fetch('/api/judge', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    quote: quoteContent
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Failed to validate quote');
            }

            const data = await response.json();
            setIsQuoteValid(data.isValid);
            
            if (data.isValid) {
                handleNextStep();
            } else {
                alert('The quote does not accurately represent the NFT content. Please revise your quote.');
            }
        } catch (error) {
            console.error('Validation error:', error);
            setIsQuoteValid(false);
            alert(error instanceof Error ? error.message : 'Failed to validate quote. Please try again.');
        } finally {
            setIsValidating(false);
        }
    };

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="flex justify-between items-center mb-8">
                {[1, 2].map((step) => (
                    <div key={step} className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center 
                            ${currentStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-500'}`}
                        >
                            {step}
                        </div>
                        {step < 2 && (
                            <div className={`w-24 h-1 mx-2 ${currentStep > step ? 'bg-purple-600' : 'bg-gray-200'}`} />
                        )}
                    </div>
                ))}
            </div>

            {/* Step 1: NFT ID and Quote Input */}
            {currentStep === 1 && (
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="block text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            NFT ID
                        </label>
                        <input
                            type="text"
                            value={nftId}
                            onChange={(e) => setNftId(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter NFT ID"
                            required
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="block text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
                            Quote Content
                        </label>
                        <textarea
                            value={quoteContent}
                            onChange={(e) => setQuoteContent(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 min-h-[120px]"
                            placeholder="Enter your quote here"
                            required
                        />
                    </div>
                    <button
                        onClick={validateQuote}
                        disabled={!isFormValid() || isValidating}
                        className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg 
                            disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isValidating ? 'Validating...' : 'Next'}
                    </button>
                </div>
            )}

            {/* Add validation feedback */}
            {isQuoteValid === false && (
                <div className="text-red-500 mt-2">
                    The quote does not accurately represent the NFT content.
                </div>
            )}

            {/* Step 2: Confirmation */}
            {currentStep === 2 && (
                <div className="space-y-6">
                    <div className="p-6 bg-gray-50 rounded-lg divide-y divide-gray-200">
						<div className="pb-4">
							<div className="font-medium text-gray-600">NFT ID</div>
							<div className="break-all mt-1">{nftId}</div>
						</div>
						<div className="py-4">
							<div className="font-medium text-gray-600">Quote Content</div>
							<div className="break-all mt-1">{quoteContent}</div>
						</div>
						<div className="pt-4">
							<div className="font-medium text-gray-600">Wallet Address</div>
							<div className="font-mono text-sm mt-1">{primaryWallet?.address || 'No wallet connected'}</div>
						</div>
					</div>
                    
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrevStep}
                            className="w-1/2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg"
                        >
                            Back
                        </button>
                        <div className="w-1/2">
                            <MintBtn
                                disabled={!isAuthenticated}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuoteForm;
