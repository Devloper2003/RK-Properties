import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/admin-auth';
import { unlinkSync, existsSync } from 'fs';
import path from 'path';

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const { id } = await params;
    const media = await db.projectMedia.findUnique({ where: { id } });

    if (!media) {
      return NextResponse.json({ error: 'Media not found' }, { status: 404 });
    }

    // Delete file from disk
    if (media.url.startsWith('/uploads/')) {
      const filePath = path.join(process.cwd(), 'public', media.url);
      if (existsSync(filePath)) {
        try { unlinkSync(filePath); } catch {}
      }
    }

    await db.projectMedia.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting media:', error);
    return NextResponse.json({ error: 'Failed to delete media' }, { status: 500 });
  }
}
