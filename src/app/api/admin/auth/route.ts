import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { hashPassword } from '@/lib/admin-auth';

export async function GET() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const expectedHash = await hashPassword(adminPassword);
    
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    if (token === expectedHash) {
      return NextResponse.json({ authenticated: true });
    }

    return NextResponse.json({ authenticated: false }, { status: 401 });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({ authenticated: false }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';

    if (password === adminPassword) {
      const expectedHash = await hashPassword(adminPassword);
      const cookieStore = await cookies();
      
      cookieStore.set('admin_token', expectedHash, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24, // 24 hours
        path: '/',
      });

      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete('admin_token');
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
