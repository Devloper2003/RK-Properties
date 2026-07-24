import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/admin-auth';

export async function GET() {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const subscribers = await db.newsletterSubscriber.findMany({
      orderBy: { subscribedAt: 'desc' },
    });
    return NextResponse.json(subscribers);
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 });
  }
}
