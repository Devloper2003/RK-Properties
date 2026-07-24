import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth, getAdminSession, logActivity } from '@/lib/admin-auth';

export async function GET(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const search = searchParams.get('search') || '';
    const where: Record<string, unknown> = {};
    if (search) where.OR = [{ title: { contains: search } }];
    const [blogs, total] = await Promise.all([
      db.blogPost.findMany({ where, orderBy: { createdAt: 'desc' }, skip: (page - 1) * limit, take: limit }),
      db.blogPost.count({ where }),
    ]);
    return NextResponse.json({ blogs, total, page, limit });
  } catch (e) { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}

export async function POST(request: NextRequest) {
  const authError = await requireAuth();
  if (authError) return authError;
  const session = await getAdminSession();
  try {
    const b = await request.json();
    const blog = await db.blogPost.create({
      data: { title: b.title||'', slug: b.slug||b.title?.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')||'', content: b.content||'', excerpt: b.excerpt||'', featuredImage: b.featuredImage||'', category: b.category||'', tags: typeof b.tags==='string'?b.tags:JSON.stringify(b.tags||[]), author: b.author||'', status: b.status||'draft', seoTitle: b.seoTitle||'', seoDescription: b.seoDescription||'', seoKeywords: b.seoKeywords||'', ogImage: b.ogImage||'', publishedAt: b.status==='published'?new Date():null },
    });
    if (session?.user) await logActivity(session.user.id, 'create_blog', 'Created: '+blog.title);
    return NextResponse.json(blog, { status: 201 });
  } catch (e) { return NextResponse.json({ error: 'Failed' }, { status: 500 }); }
}
