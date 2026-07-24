import { cookies, headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import bcrypt from 'bcryptjs';

const ADMIN_SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'rk-admin-session-v1';

export function createAdminToken(userId: string, role: string): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2);
  const payload = `${userId}:${role}:${timestamp}.${random}`;
  return Buffer.from(`${ADMIN_SESSION_SECRET}:${payload}`).toString('base64');
}

export function verifyAdminToken(token: string | null): { valid: boolean; userId?: string; role?: string } {
  if (!token) return { valid: false };
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    if (!decoded.startsWith(`${ADMIN_SESSION_SECRET}:`)) return { valid: false };
    const parts = decoded.slice(ADMIN_SESSION_SECRET.length + 1).split(':');
    return { valid: true, userId: parts[0], role: parts[1] };
  } catch {
    return { valid: false };
  }
}

export async function getAdminSession(): Promise<{ authenticated: boolean; user?: { id: string; name: string; email: string; role: string } } | null> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('admin_session')?.value;
    const result = verifyAdminToken(token);
    if (!result.valid || !result.userId) return null;
    const user = await db.adminUser.findUnique({
      where: { id: result.userId },
      select: { id: true, name: true, email: true, role: true, isActive: true },
    });
    if (!user || !user.isActive) return null;
    return { authenticated: true, user: { id: user.id, name: user.name, email: user.email, role: user.role } };
  } catch {
    return null;
  }
}

export async function requireAuth(): Promise<NextResponse | null> {
  const session = await getAdminSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return null;
}

export async function verifyCredentials(username: string, password: string) {
  const user = await db.adminUser.findUnique({ where: { username } });
  if (!user || !user.isActive) return null;
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;
  await db.adminUser.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
  return { id: user.id, name: user.name, email: user.email, role: user.role };
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function ensureDefaultAdmin() {
  const count = await db.adminUser.count();
  if (count === 0) {
    const hash = await hashPassword('admin@rk2024');
    await db.adminUser.create({
      data: {
        username: 'admin',
        passwordHash: hash,
        name: 'RK Admin',
        email: 'admin@rkproperties.in',
        role: 'admin',
      },
    });
  }
}

export async function getClientIp(): Promise<string> {
  try {
    const headersList = await headers();
    return headersList.get('x-forwarded-for')?.split(',')[0]?.trim() || headersList.get('x-real-ip') || '';
  } catch {
    return '';
  }
}

export async function logActivity(userId: string, action: string, details: string = '') {
  try {
    const ip = await getClientIp();
    await db.activityLog.create({ data: { userId, action, details, ipAddress: ip } });
  } catch {}
}
