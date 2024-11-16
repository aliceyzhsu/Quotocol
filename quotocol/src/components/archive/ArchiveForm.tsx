"use client";

import React, { useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { MintBtn } from './MintBtn';

interface ParsedData {
	title: string;
	author: string;
	date: string;
	content: string;
	platform: string;
}

const ArchiveForm = () => {
	const { primaryWallet, user } = useDynamicContext();
	const isAuthenticated = !!user;
	// const [isLoading, setIsLoading] = useState(false);
	const [currentStep, setCurrentStep] = useState(1);
	const [sourceUrl, setSourceUrl] = useState('');
	const [parsedData, setParsedData] = useState<ParsedData | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const handleNextStep = async () => {
		setIsLoading(true);
		try {
			const response = await fetch('/api/parse', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ url: sourceUrl })
			});
			
			const data = await response.json();
			console.log(data);
			setParsedData(data);
			setCurrentStep(2);
		} catch (error) {
			console.error('Error parsing URL:', error);
			alert('Failed to parse the URL. Please try again.');
		} finally {
			setIsLoading(false);
		}
	};

	const handlePrevStep = () => setCurrentStep(1);

	const isUrlValid = () => /^https?:\/\/.+/i.test(sourceUrl.trim());

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

			{/* Step 1: URL Input */}
			{currentStep === 1 && (
				<div className="space-y-6 h-[260px]">
					<div className="space-y-8">
						<label className="block text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
							Source Content Link
						</label>
						<input
							type="url"
							value={sourceUrl}
							onChange={(e) => setSourceUrl(e.target.value)}
							className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
							placeholder="https://"
							required
						/>
					</div>
					<button
						onClick={handleNextStep}
						disabled={!isUrlValid() || isLoading}
						className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white font-medium rounded-lg 
								disabled:opacity-50 disabled:cursor-not-allowed"
					>
						{isLoading ? 'Parsing...' : 'Next'}
					</button>
				</div>
			)}

			{/* Step 2: Confirmation */}
			{currentStep === 2 && parsedData && (
				<div className="space-y-6">
					<div className="p-6 bg-gray-50 rounded-lg divide-y divide-gray-200">
						<div className="pb-4">
							<div className="font-medium text-gray-600">Title</div>
							<div className="break-all mt-1">{parsedData.title}</div>
						</div>
						<div className="py-4">
							<div className="font-medium text-gray-600">Author</div>
							<div className="break-all mt-1">{parsedData.author}</div>
						</div>
						<div className="py-4">
							<div className="font-medium text-gray-600">Date</div>
							<div className="break-all mt-1">{parsedData.date}</div>
						</div>
						<div className="py-4">
							<div className="font-medium text-gray-600">Platform</div>
							<div className="break-all mt-1">{parsedData.platform}</div>
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
								sourceUrl={sourceUrl}
								disabled={!isAuthenticated}
							// onSuccess={() => {
							// 	alert('Successfully minted!');
							// 	setCurrentStep(1);
							// 	setSourceUrl('');
							// }}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default ArchiveForm; 