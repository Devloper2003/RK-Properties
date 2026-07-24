import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search') || '';
    const status = searchParams.get('status') || '';
    const project = searchParams.get('project') || '';

    const where: Record<string, unknown> = {};

    if (search) {
      where.OR = [
        { name: { contains: search } },
        { email: { contains: search } },
        { phone: { contains: search } },
      ];
    }
    if (status) {
      where.status = status;
    }
    if (project) {
      where.projectInterest = project;
    }

    const leads = await db.lead.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });

    const count = await db.lead.count({ where });

    return NextResponse.json({ leads, count });
  } catch (error) {
    console.error('Error fetching admin leads:', error);
    return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 });
  }
}
