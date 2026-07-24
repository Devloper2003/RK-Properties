import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createAdminToken, getAdminSession, logActivity, ensureDefaultAdmin } from '@/lib/admin-auth';

export async function GET() {
  await ensureDefaultAdmin();
  const session = await getAdminSession();
  if (!session?.authenticated || !session.user) {
    return NextResponse.json({ authenticated: false });
  }
  return NextResponse.json({ authenticated: true, user: session.user });
}

export async function POST(request: NextRequest) {
  try {
    await ensureDefaultAdmin();
    const { username, password } = await request.json();
    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password are required' }, { status: 400 });
    }
    const user = await verifyCredentials(username, password);
    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    const token = createAdminToken(user.id, user.role);
    const response = NextResponse.json({ success: true, user });
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
    });
    await logActivity(user.id, 'login', 'Admin logged in');
    return response;
  } catch (error) {
    console.error('Admin auth error:', error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    const session = await getAdminSession();
    if (session?.user) {
      await logActivity(session.user.id, 'logout', 'Admin logged out');
    }
  } catch {}
  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 0,
    path: '/',
  });
  return response;
}
