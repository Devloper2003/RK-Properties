import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/admin-auth';

export async function GET() {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const totalLeads = await db.lead.count();
    const newLeads = await db.lead.count({ where: { status: 'New' } });
    const totalProjects = await db.project.count();
    const totalSubscribers = await db.newsletterSubscriber.count();
    const totalMedia = await db.projectMedia.count();

    // Leads by status
    const leadsByStatusRaw = await db.lead.groupBy({
      by: ['status'],
      _count: { status: true },
    });
    const leadsByStatus = leadsByStatusRaw.map((item) => ({
      status: item.status,
      count: item._count.status,
    }));

    // Recent 5 leads
    const recentLeads = await db.lead.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    // Leads by project interest
    const leadsByProjectRaw = await db.lead.groupBy({
      by: ['projectInterest'],
      _count: { projectInterest: true },
    });
    const leadsByProject = leadsByProjectRaw
      .map((item) => ({
        project: item.projectInterest || 'Unknown',
        count: item._count.projectInterest,
      }))
      .sort((a, b) => b.count - a.count);

    return NextResponse.json({
      totalLeads,
      newLeads,
      totalProjects,
      totalSubscribers,
      totalMedia,
      leadsByStatus,
      recentLeads,
      leadsByProject,
    });
  } catch (error) {
    console.error('Error fetching admin stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
