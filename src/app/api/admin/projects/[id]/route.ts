import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();

    const {
      name, type, status, location, size, price, priceVal,
      appreciationRate, amenities, description, highlights,
      roiProjection5Yr, roiProjection10Yr, details, image, tag
    } = body;

    const data: Record<string, unknown> = {};
    if (name !== undefined) data.name = name;
    if (type !== undefined) data.type = type;
    if (status !== undefined) data.status = status;
    if (location !== undefined) data.location = location;
    if (size !== undefined) data.size = size;
    if (price !== undefined) data.price = price;
    if (priceVal !== undefined) data.priceVal = priceVal;
    if (appreciationRate !== undefined) data.appreciationRate = appreciationRate;
    if (amenities !== undefined) data.amenities = typeof amenities === 'string' ? amenities : JSON.stringify(amenities);
    if (description !== undefined) data.description = description;
    if (highlights !== undefined) data.highlights = typeof highlights === 'string' ? highlights : JSON.stringify(highlights);
    if (roiProjection5Yr !== undefined) data.roiProjection5Yr = roiProjection5Yr;
    if (roiProjection10Yr !== undefined) data.roiProjection10Yr = roiProjection10Yr;
    if (details !== undefined) data.details = details;
    if (image !== undefined) data.image = image;
    if (tag !== undefined) data.tag = tag;

    const project = await db.project.update({
      where: { id },
      data,
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await db.project.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
