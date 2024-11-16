import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: Request) {
    // Get URL from search params
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    if (!url) {
        return NextResponse.json(
            { error: 'URL is required' },
            { status: 400 }
        );
    }

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br',
                'Connection': 'keep-alive',
                'Upgrade-Insecure-Requests': '1',
                'Sec-Fetch-Dest': 'document',
                'Sec-Fetch-Mode': 'navigate',
                'Sec-Fetch-Site': 'none',
                'Sec-Fetch-User': '?1',
                'Cache-Control': 'max-age=0'
            },
            maxRedirects: 5,
            validateStatus: (status) => status < 500,
        });

        // Handle different response types
        if (typeof response.data === 'string') {
            // If HTML, modify it to handle relative URLs
            let modifiedHtml = response.data;
            // Convert relative URLs to absolute
            modifiedHtml = modifiedHtml.replace(
                /(href|src)="\/([^"]*?)"/g,
                `$1="${new URL(url).origin}/$2"`
            );

            return new NextResponse(modifiedHtml, {
                status: 200,
                headers: {
                    'Content-Type': response.headers['content-type'] || 'text/html',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
        } else {
            return NextResponse.json(response.data, {
                status: 200,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
                }
            });
        }

    } catch (error) {
        console.error('Proxy error:', error);
        if (axios.isAxiosError(error)) {
            return NextResponse.json({
                error: 'Failed to fetch content',
                details: error.message,
                response: error.response?.data
            }, { status: 500 });
        }
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS(request: Request) {
    return new NextResponse(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400'
        }
    });
}

// Configure segment behavior
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs'; 