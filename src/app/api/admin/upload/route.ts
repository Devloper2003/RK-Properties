import { NextRequest, NextResponse } from 'next/server';
import { requireAuth } from '@/lib/admin-auth';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { db } from '@/lib/db';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const ALLOWED_DOC_TYPES = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm', 'video/quicktime'];
const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB

function getAllowedTypes(type: string): string[] {
  switch (type) {
    case 'image': return ALLOWED_IMAGE_TYPES;
    case 'document': return ALLOWED_DOC_TYPES;
    case 'video': return ALLOWED_VIDEO_TYPES;
    default: return [...ALLOWED_IMAGE_TYPES, ...ALLOWED_DOC_TYPES, ...ALLOWED_VIDEO_TYPES];
  }
}

function getSubDir(type: string): string {
  switch (type) {
    case 'image': return 'images';
    case 'document': return 'documents';
    case 'video': return 'videos';
    default: return 'images';
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    const projectId = formData.get('projectId') as string;
    const mediaType = formData.get('type') as string || 'image';
    const name = formData.get('name') as string || file?.name || 'upload';

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const allowed = getAllowedTypes(mediaType);
    if (!allowed.includes(file.type)) {
      return NextResponse.json({
        error: `File type ${file.type} not allowed for ${mediaType}. Allowed: ${allowed.join(', ')}`
      }, { status: 400 });
    }

    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json({ error: 'File too large. Max 50MB.' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = path.extname(file.name) || `.${file.type.split('/')[1]}`;
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
    const subDir = getSubDir(mediaType);
    const relativePath = `/uploads/${subDir}/${uniqueName}`;
    const fullPath = path.join(process.cwd(), 'public', relativePath);

    // Ensure directory exists
    await mkdir(path.dirname(fullPath), { recursive: true });
    await writeFile(fullPath, buffer);

    // Save to database
    const media = await db.projectMedia.create({
      data: {
        projectId,
        type: mediaType,
        url: relativePath,
        name,
        size: file.size,
        mimeType: file.type,
      },
    });

    return NextResponse.json(media, { status: 201 });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}
