import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    
    // Hacer proxy al backend usando variable de entorno
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    const response = await fetch(`${backendUrl}/assets/${id}`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        // Pasar cookies de autenticación
        'Cookie': request.headers.get('cookie') || ''
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Asset not found' }));
      return NextResponse.json(errorData, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);

  } catch (error) {
    console.error('Asset get proxy error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}