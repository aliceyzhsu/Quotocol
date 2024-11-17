import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

// Helper function to fetch NFT content from your storage/contract
async function getNFTContent(nftId: string) {
    // This is a placeholder - implement your actual NFT content fetching logic
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/nft/${nftId}`);
        const data = await response.json();
        return {
            title: data.title,
            content: data.content
        };
    } catch (error) {
        console.error('Error fetching NFT content:', error);
        throw new Error('Failed to fetch NFT content');
    }
}

export async function POST(request: Request) {
    // try {
    //     const { quote } = await request.json();

    //     return new Promise((resolve, reject) => {
    //         // Ensure arguments are properly escaped
    //         const pythonArgs = [
    //             'src/script/judge.py',
    //             quote
    //         ].map(arg => arg.toString());

    //         const pythonProcess = spawn('python', pythonArgs);

    //         let result = '';
    //         let error = '';

    //         pythonProcess.stdout.on('data', (data) => {
    //             result += data.toString();
    //         });

    //         pythonProcess.stderr.on('data', (data) => {
    //             error += data.toString();
    //             console.error('Python error:', data.toString());
    //         });

    //         const timeout = setTimeout(() => {
    //             pythonProcess.kill();
    //             reject(new NextResponse(
    //                 JSON.stringify({ error: 'Validation timeout' }),
    //                 { status: 504 }
    //             ));
    //         }, 30000);

    //         pythonProcess.on('close', (code) => {
    //             clearTimeout(timeout);
                
    //             if (code !== 0) {
    //                 return reject(new NextResponse(
    //                     JSON.stringify({ error: error || 'Validation process failed' }),
    //                     { status: 500 }
    //                 ));
    //             }

    //             const isValid = result.trim() === "Yes";
    //             resolve(new NextResponse(
    //                 JSON.stringify({ 
    //                     isValid,
    //                     details: result.trim()
    //                 }),
    //                 { 
    //                     status: 200,
    //                     headers: { 'Content-Type': 'application/json' }
    //                 }
    //             ));
    //         });

    //         pythonProcess.on('error', (err) => {
    //             clearTimeout(timeout);
    //             reject(new NextResponse(
    //                 JSON.stringify({ error: err.message }),
    //                 { status: 500 }
    //             ));
    //         });
    //     });
    // } catch (error) {
    //     return new NextResponse(
    //         JSON.stringify({ error: 'Failed to process request' }),
    //         { status: 500 }
    //     );
    // }

    return new NextResponse(
        JSON.stringify({ isValid: true }),
        { status: 200 }
    );
}
