import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { requireAuth } from '@/lib/admin-auth';

const DEFAULT_SETTINGS: Record<string, string> = {
  bannerText: 'Welcome to RK Properties — Premium Real Estate in Vrindavan',
  contactPhone: '+91 91152 77000',
  contactEmail: 'info@rkproperties.in',
  whatsappNumber: '919115277000',
  companyAddress: 'RK Properties, Vrindavan, Mathura, Uttar Pradesh, India',
};

export async function GET() {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const settings = await db.siteSetting.findMany();
    const result: Record<string, string> = { ...DEFAULT_SETTINGS };

    for (const s of settings) {
      result[s.key] = s.value;
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const authError = requireAuth();
  if (authError) return authError;

  try {
    const body = await request.json();
    const results: { key: string; value: string }[] = [];

    for (const [key, value] of Object.entries(body)) {
      if (key in DEFAULT_SETTINGS) {
        const upserted = await db.siteSetting.upsert({
          where: { key },
          create: { key, value: String(value) },
          update: { value: String(value) },
        });
        results.push({ key: upserted.key, value: upserted.value });
      }
    }

    return NextResponse.json({ success: true, settings: results });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}
