import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { fetchBackend } from '@/app/api/lib/backend';

export async function POST(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token');
    const refreshToken = cookieStore.get('rt');

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'No authenticated user',
          message: 'Auth token not found'
        },
        { status: 401 }
      );
    }

    const contentType = request.headers.get('content-type') || '';
    let bodyData: any;

    if (contentType.includes('application/json')) {
      // Manejar JSON
      bodyData = await request.json();
    } else if (contentType.includes('multipart/form-data')) {
      // Manejar FormData
      bodyData = await request.formData();
    } else {
      return NextResponse.json(
        {
          success: false,
          error: 'Unsupported content type',
          message: `Content-Type ${contentType} not supported`
        },
        { status: 400 }
      );
    }

    // Usar la función centralizada para hacer la petición al backend
    const result = await fetchBackend('/publications', {
      method: 'POST',
      authToken: authToken.value,
      refreshToken: refreshToken?.value,
      body: bodyData
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Backend error: ${result.status}`,
          details: result.error
        },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const cookieStore = cookies();
    const authToken = cookieStore.get('auth_token');
    const refreshToken = cookieStore.get('rt');

    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          error: 'No authenticated user',
          message: 'Auth token not found'
        },
        { status: 401 }
      );
    }

    // Obtener query parameters
    const { searchParams } = new URL(request.url);
    const queryString = searchParams.toString();
    const endpoint = queryString ? `/publications?${queryString}` : '/publications';

    const result = await fetchBackend(endpoint, {
      method: 'GET',
      authToken: authToken.value,
      refreshToken: refreshToken?.value
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          success: false,
          error: `Backend error: ${result.status}`,
          details: result.error
        },
        { status: result.status }
      );
    }

    return NextResponse.json(result.data);

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
