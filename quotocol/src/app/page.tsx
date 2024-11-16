import React from 'react';
import Middle from '@/components/layout/Middle';
import Footer from '@/components/layout/Footer';
import Side from "@/components/layout/Side"

export default function Home() {
	return (
		<div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
			<main className="flex relative">
				<div className="w-1/3 min-w-[350px] hidden lg:block p-6 relative z-10">
					<Side sample="source" />
				</div>
				<div className="flex-1 max-w-3xl p-6">
					<Middle />
				</div>
				<div className="w-1/3 min-w-[350px] hidden lg:block p-6 relative z-10">
					<Side sample="derivate" />
				</div>
			</main>
			<Footer />
		</div>
	);
}
