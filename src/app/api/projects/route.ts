import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function GET() {
  try {
    const projects = await db.project.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, type, status, location, size, price, priceVal, appreciationRate, amenities, description, highlights, roiProjection5Yr, roiProjection10Yr, details, image, tag } = body;

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
        amenities: JSON.stringify(amenities || []),
        description: description || '',
        highlights: JSON.stringify(highlights || []),
        roiProjection5Yr: roiProjection5Yr || '',
        roiProjection10Yr: roiProjection10Yr || '',
        details: details || '',
        image: image || '',
        tag: tag || '',
      }
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}