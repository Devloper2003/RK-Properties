import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'rkproperties@2024';
const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'rk-admin-session-v1';

// Simple token-based auth (not production-grade but sufficient for this use case)
export function createAdminToken(): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  const payload = `${timestamp}.${random}`;
  // Simple encoding (not encryption - this is session-level protection)
  return Buffer.from(`${ADMIN_SESSION_SECRET}:${payload}`).toString('base64');
}

export function verifyAdminToken(token: string | null): boolean {
  if (!token) return false;
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    return decoded.startsWith(`${ADMIN_SESSION_SECRET}:`);
  } catch {
    return false;
  }
}

export function getAdminSession(): boolean {
  const cookieStore = cookies();
  const token = cookieStore.get('admin_session')?.value;
  return verifyAdminToken(token);
}

export function requireAuth(): NextResponse | null {
  if (!getAdminSession()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export function verifyPassword(password: string): boolean {
  return password === ADMIN_PASSWORD;
}
