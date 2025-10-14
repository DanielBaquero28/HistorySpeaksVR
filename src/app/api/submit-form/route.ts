import { NextRequest, NextResponse } from 'next/server';

// 🚨 Use an environment variable for security 🚨
// const EXTERNAL_FORM_URL = process.env.FORM_SERVICE_URL;
const EXTERNAL_FORM_URL = 'https://formspree.io/f/mvgwgwpk';

export async function POST(request: NextRequest) {
  if (!EXTERNAL_FORM_URL) {
    return NextResponse.json({ error: 'Form service URL not configured' }, { status: 500 });
  }

  try {
    const data = await request.json(); // Data from the client-side component
    
    // Forward the client data securely to the external service
    const externalResponse = await fetch(EXTERNAL_FORM_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseData = await externalResponse.json(); 
    
    if (!externalResponse.ok) {
        return NextResponse.json(responseData, { status: externalResponse.status });
    }

    console.log("Form submitted correctly!");
    return NextResponse.json({ message: 'Submission successful' }, { status: 200 });

  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}