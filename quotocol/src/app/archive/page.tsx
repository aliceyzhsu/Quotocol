import React from 'react';
import ArchiveFormWrapper from '@/components/archive/ArchiveFormWrapper';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ArchivePage() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			<Header />

			<main className="container mx-auto px-4 py-8">
				<div className="max-w-3xl mx-auto space-y-8">
					<div className="text-center space-y-2">
						<h1 className="text-3xl font-bold text-gray-900">
							Archive Your Content
						</h1>
						<p className="text-gray-600">
							Create a permanent record of your content as a SourceNFT
						</p>
					</div>

					{/* Archive Form */}
					<ArchiveFormWrapper />
				</div>
			</main>

			<Footer />
		</div>
	);
}