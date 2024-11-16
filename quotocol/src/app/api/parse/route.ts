import { NextResponse } from 'next/server';
import { spawn } from 'child_process';

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    return new Promise((resolve, reject) => {
      const pythonProcess = spawn('python', ['src/script/parse.py', url]);
      
      let result = '';
      let error = '';

      pythonProcess.stdout.on('data', (data) => {
        result += data.toString();
      });

      pythonProcess.stderr.on('data', (data) => {
        error += data.toString();
      });

      pythonProcess.on('close', (code) => {
        if (code !== 0) {
          reject(new NextResponse(JSON.stringify({ error }), { 
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }));
        }

        try {
          // Convert the string representation of Python dict to JSON
          const cleanedResult = result.replace(/'/g, '"')
            .replace(/None/g, 'null')
            .trim();
          const parsedData = JSON.parse(cleanedResult);
          
          resolve(new NextResponse(JSON.stringify(parsedData), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
          }));
        } catch (parseError) {
          reject(new NextResponse(JSON.stringify({ error: 'Failed to parse Python output' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
          }));
        }
      });
    });
  } catch (error) {
    return new NextResponse(JSON.stringify({ error: 'Failed to process request' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}