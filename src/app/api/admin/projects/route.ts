import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/admin-auth';

export async function GET() {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: 'desc' },
      include: { media: { orderBy: { createdAt: 'desc' } } },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching admin projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const {
      name, type, status, location, size, price, priceVal,
      appreciationRate, amenities, description, highlights,
      roiProjection5Yr, roiProjection10Yr, details, image, tag,
      mapEmbedUrl, videoUrl
    } = body;

    if (!name) {
      return NextResponse.json({ error: 'Project name is required' }, { status: 400 });
    }

    const project = await db.project.create({
      data: {
        name,
        type: type || 'Residential Project',
        status: status || 'Pre-launch',
        location: location || '',
        size: size || '',
        price: price || '',
        priceVal: priceVal || 0,
        appreciationRate: appreciationRate || 18,
        amenities: typeof amenities === 'string' ? amenities : JSON.stringify(amenities || []),
        description: description || '',
        highlights: typeof highlights === 'string' ? highlights : JSON.stringify(highlights || []),
        roiProjection5Yr: roiProjection5Yr || '',
        roiProjection10Yr: roiProjection10Yr || '',
        details: details || '',
        image: image || '',
        tag: tag || '',
        mapEmbedUrl: mapEmbedUrl || '',
        videoUrl: videoUrl || '',
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}
