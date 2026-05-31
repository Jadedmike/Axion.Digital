import { cookies } from 'next/headers';

export async function hashPassword(password: string) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function isAdminAuthenticated() {
  try {
    const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
    const expectedHash = await hashPassword(adminPassword);
    
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_token')?.value;

    return token === expectedHash;
  } catch (error) {
    console.error('Auth verification error:', error);
    return false;
  }
}
