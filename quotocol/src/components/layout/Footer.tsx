import React from 'react';
import Link from 'next/link';

const socialLinks = [
	{
		name: 'instagram',
		icon: (
			<svg className="h-6 w-6 transition-colors duration-200" fill="currentColor" viewBox="0 0 1024 1024" aria-hidden="true">
				<path fillRule="evenodd" d="M911.8 512c0-55.2 0.5-109.9-2.6-165-3.1-64-17.7-120.8-64.5-167.6-46.9-46.9-103.6-61.4-167.6-64.5-55.2-3.1-109.9-2.6-165-2.6-55.2 0-109.9-0.5-165 2.6-64 3.1-120.8 17.7-167.6 64.5C132.6 226.3 118.1 283 115 347c-3.1 55.2-2.6 109.9-2.6 165s-0.5 109.9 2.6 165c3.1 64 17.7 120.8 64.5 167.6 46.9 46.9 103.6 61.4 167.6 64.5 55.2 3.1 109.9 2.6 165 2.6 55.2 0 109.9 0.5 165-2.6 64-3.1 120.8-17.7 167.6-64.5 46.9-46.9 61.4-103.6 64.5-167.6 3.2-55.1 2.6-109.8 2.6-165zM512 717.1c-113.5 0-205.1-91.6-205.1-205.1S398.5 306.9 512 306.9 717.1 398.5 717.1 512 625.5 717.1 512 717.1z m213.5-370.7c-26.5 0-47.9-21.4-47.9-47.9s21.4-47.9 47.9-47.9 47.9 21.4 47.9 47.9c-0.1 26.6-21.4 47.9-47.9 47.9z" clipRule="evenodd" />
			</svg>
		)
	},
	{
		name: 'facebook',
		icon: (
			<svg className="h-6 w-6 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
			</svg>
		)
	},
	{
		name: 'twitter',
		icon: (
			<svg className="h-6 w-6 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
			</svg>
		)
	},
	{
		name: 'linkedin',
		icon: (
			<svg className="h-6 w-6 transition-colors duration-200" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
				<path fillRule="evenodd" d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" clipRule="evenodd" />
			</svg>
		)
	}
];

const footerLinks = [
	{ href: '/privacy', label: 'Privacy Policy' },
	{ href: '/terms', label: 'Terms & Conditions' },
	{ href: '/about', label: 'About Us' },
	{ href: '/contact', label: 'Contact' }
];

const Footer: React.FC = () => (
	<footer className="bg-gradient-to-b from-neutral-900 to-black text-white py-16 px-6">
		<div className="max-w-7xl mx-auto">
			{/* Upper Footer */}
			<div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
				{/* Logo Section */}
				<div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
					Quotocol
				</div>

				{/* Navigation Links */}
				<nav className="flex flex-wrap gap-8 items-center text-sm font-medium">
					{footerLinks.map(({ href, label }) => (
						<Link
							key={href}
							href={href}
							className="text-zinc-400 hover:text-white transition-colors duration-200 hover:underline underline-offset-4"
						>
							{label}
						</Link>
					))}
				</nav>
			</div>

			{/* Divider */}
			<div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent my-8" />

			{/* Lower Footer */}
			<div className="flex flex-col md:flex-row justify-between items-center gap-6">
				{/* Copyright */}
				<div className="text-sm font-medium text-neutral-400">
					© {new Date().getFullYear()} Quotocol. All Rights Reserved.
				</div>

				{/* Social Links */}
				<div className="flex gap-6 items-center">
					{socialLinks.map((social) => (
						<Link
							key={social.name}
							href="#"
							className="text-neutral-400 hover:text-white transform hover:scale-110 transition-all duration-200"
							aria-label={`Follow us on ${social.name}`}
						>
							{social.icon}
						</Link>
					))}
				</div>
			</div>
		</div>
	</footer>
);

export default Footer;