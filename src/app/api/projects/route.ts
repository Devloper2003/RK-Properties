import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { propertiesData } from '@/data/propertyData';

// Public API — no auth required. Returns published projects for the public website.
// Falls back to static propertyData.ts when the database has no published projects.

export async function GET() {
  try {
    // 1. Try fetching published projects from the database
    const dbProjects = await db.project.findMany({
      where: { published: true },
      include: {
        media: {
          orderBy: { sortOrder: 'asc' },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    // 2. If DB has published projects, return them
    if (dbProjects.length > 0) {
      const projects = dbProjects.map((p) => {
        // Safely parse JSON strings; default to empty array on failure
        let amenities: string[] = [];
        try {
          amenities = p.amenities ? JSON.parse(p.amenities) : [];
        } catch {
          amenities = [];
        }

        let highlights: string[] = [];
        try {
          highlights = p.highlights ? JSON.parse(p.highlights) : [];
        } catch {
          highlights = [];
        }

        // Build gallery from media items where type='image'
        const gallery = p.media
          .filter((m) => m.type === 'image')
          .map((m) => m.url);

        // Build full media array with all media items
        const media = p.media.map((m) => ({
          id: m.id,
          type: m.type,
          url: m.url,
          name: m.name,
          size: m.size,
          mimeType: m.mimeType,
          sortOrder: m.sortOrder,
        }));

        return {
          id: p.id,
          name: p.name,
          type: p.type,
          status: p.status,
          location: p.location,
          size: p.size,
          price: p.price,
          priceVal: p.priceVal,
          appreciationRate: p.appreciationRate,
          amenities,
          description: p.description,
          highlights,
          roiProjection5Yr: p.roiProjection5Yr,
          roiProjection10Yr: p.roiProjection10Yr,
          details: p.details,
          image: p.image,
          tag: p.tag,
          gallery,
          mapEmbedUrl: p.mapEmbedUrl,
          videoUrl: p.videoUrl,
          media,
        };
      });

      return NextResponse.json({ projects });
    }

    // 3. Fallback: DB is empty, return static data
    return NextResponse.json({ projects: propertiesData });
  } catch (error) {
    console.error('Error fetching projects:', error);

    // On DB error, gracefully fall back to static data
    return NextResponse.json({ projects: propertiesData });
  }
}
