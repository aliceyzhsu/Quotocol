/**
 *  @type {import('next').NextConfig}
 */

// const nextConfig = {};
// export default nextConfig;

import { createProxyMiddleware } from 'http-proxy-middleware';

const nextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/proxy/:path*',
				destination: 'https://medium.com/:path*',
			},
		];
	},
};

export default nextConfig;