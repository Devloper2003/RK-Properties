import { NextResponse } from 'next/server';
import { propertiesData } from '@/data/propertyData';
import type { Project } from '@/types/rk-properties';

export async function POST(request: Request) {
  try {
    const body = await request.json() as { projectId?: string };
    const { projectId } = body;

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const project = propertiesData.find((p) => p.id === projectId);

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Dynamic import jsPDF (server-only)
    const { jsPDF } = await import('jspdf');

    const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;
    let y = 0;

    // Helper: add text with auto page break
    const addText = (text: string, x: number, yy: number, options: { fontSize?: number; font?: string; color?: [number, number, number]; maxWidth?: number; lineHeight?: number; align?: 'left' | 'center' | 'right' } = {}) => {
      const {
        fontSize = 10,
        font = 'helvetica',
        color = [45, 41, 38] as [number, number, number],
        maxWidth = contentWidth,
        lineHeight = 1.4,
        align = 'left',
      } = options;

      doc.setFontSize(fontSize);
      doc.setFont(font, 'normal');
      doc.setTextColor(color[0], color[1], color[2]);

      const lines = doc.splitTextToSize(text, maxWidth);

      // Check if we need a new page
      const textHeight = lines.length * fontSize * 0.3528 * lineHeight;
      if (yy + textHeight > doc.internal.pageSize.getHeight() - 30) {
        doc.addPage();
        return addText(text, x, 25, options); // recurse on new page
      }

      let currentY = yy;
      for (const line of lines) {
        if (currentY > doc.internal.pageSize.getHeight() - 25) {
          doc.addPage();
          currentY = 25;
        }
        doc.text(line, x, currentY, { align });
        currentY += fontSize * 0.3528 * lineHeight;
      }

      return currentY;
    };

    const addBoldText = (text: string, x: number, yy: number, options: { fontSize?: number; font?: string; color?: [number, number, number]; maxWidth?: number; lineHeight?: number; align?: 'left' | 'center' | 'right' } = {}) => {
      return addText(text, x, yy, { ...options, font: 'helvetica', color: options.color || [45, 41, 38] });
    };

    const addLine = (yy: number, color: [number, number, number] = [212, 175, 55]) => {
      doc.setDrawColor(color[0], color[1], color[2]);
      doc.setLineWidth(0.5);
      doc.line(margin, yy, pageWidth - margin, yy);
      return yy + 5;
    };

    // ── HEADER ──
    // Gold accent bar at top
    doc.setFillColor(139, 115, 91);
    doc.rect(0, 0, pageWidth, 8, 'F');
    doc.setFillColor(212, 175, 55);
    doc.rect(0, 8, pageWidth, 2, 'F');

    y = 20;
    y = addBoldText('RK PROPERTIES', pageWidth / 2, y, { fontSize: 22, align: 'center', color: [139, 115, 91] });
    y = addText('Trust \u2022 Transparency \u2022 Value \u2014 RK Group', pageWidth / 2, y + 2, { fontSize: 8, align: 'center', color: [139, 115, 91], font: 'courier' });
    y = addLine(y + 6);

    // ── PROJECT NAME ──
    y = addBoldText(project.name, pageWidth / 2, y + 4, { fontSize: 20, align: 'center', color: [45, 41, 38] });
    y = addText(project.type.toUpperCase(), pageWidth / 2, y + 2, { fontSize: 9, align: 'center', color: [139, 115, 91], font: 'courier' });
    y += 4;
    y = addLine(y);

    // ── QUICK INFO GRID ──
    y += 4;
    const gridItems = [
      ['Status', project.status],
      ['Location', project.location],
      ['Plot Size', project.size],
      ['Price', project.price],
      ['Appreciation Rate', `${project.appreciationRate}% per annum`],
    ];

    doc.setFillColor(252, 251, 247);
    doc.roundedRect(margin, y - 4, contentWidth, gridItems.length * 10 + 8, 3, 3, 'F');
    doc.setDrawColor(229, 225, 216);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y - 4, contentWidth, gridItems.length * 10 + 8, 3, 3, 'S');

    for (const [label, value] of gridItems) {
      y = addBoldText(`${label}:`, margin + 4, y + 2, { fontSize: 8, color: [139, 115, 91], font: 'courier' });
      y = addText(value, margin + 45, y, { fontSize: 9, maxWidth: contentWidth - 50 });
    }
    y += 6;

    // ── DESCRIPTION ──
    y = addBoldText('PROJECT DESCRIPTION', margin, y + 2, { fontSize: 12, color: [139, 115, 91], font: 'courier' });
    y = addLine(y + 2, [229, 225, 216]);
    y = addText(project.description, margin, y + 2, { fontSize: 9.5, color: [60, 60, 60], lineHeight: 1.5 });
    y += 4;

    // ── HIGHLIGHTS ──
    y = addBoldText('KEY HIGHLIGHTS', margin, y, { fontSize: 12, color: [139, 115, 91], font: 'courier' });
    y = addLine(y + 2, [229, 225, 216]);
    for (const h of project.highlights) {
      doc.setFontSize(10);
      doc.setTextColor(34, 197, 94); // green check
      doc.text('\u2713', margin + 2, y + 2);
      y = addText(h, margin + 8, y + 2, { fontSize: 9, maxWidth: contentWidth - 12 });
      y += 1;
    }
    y += 3;

    // ── AMENITIES ──
    y = addBoldText('AMENITIES & INFRASTRUCTURE', margin, y, { fontSize: 12, color: [139, 115, 91], font: 'courier' });
    y = addLine(y + 2, [229, 225, 216]);
    for (const a of project.amenities) {
      doc.setFontSize(10);
      doc.setTextColor(34, 197, 94);
      doc.text('\u2713', margin + 2, y + 2);
      y = addText(a, margin + 8, y + 2, { fontSize: 9, maxWidth: contentWidth - 12 });
      y += 1;
    }
    y += 3;

    // ── ROI PROJECTIONS ──
    y = addBoldText('ROI PROJECTIONS', margin, y, { fontSize: 12, color: [139, 115, 91], font: 'courier' });
    y = addLine(y + 2, [229, 225, 216]);

    // 5-year box
    doc.setFillColor(236, 253, 245);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
    y = addBoldText('5-Year Projection', margin + 4, y + 5, { fontSize: 9, color: [22, 163, 74], font: 'courier' });
    y = addText(project.roiProjection5Yr, margin + 4, y + 1, { fontSize: 8.5, color: [30, 30, 30], maxWidth: contentWidth - 8 });
    y += 5;

    // 10-year box
    doc.setFillColor(252, 251, 247);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.3);
    doc.roundedRect(margin, y, contentWidth, 18, 2, 2, 'S');
    y = addBoldText('10-Year Projection', margin + 4, y + 5, { fontSize: 9, color: [139, 115, 91], font: 'courier' });
    y = addText(project.roiProjection10Yr, margin + 4, y + 1, { fontSize: 8.5, color: [30, 30, 30], maxWidth: contentWidth - 8 });
    y += 5;

    // ── ADDITIONAL DETAILS ──
    y = addBoldText('ADDITIONAL DETAILS', margin, y + 2, { fontSize: 12, color: [139, 115, 91], font: 'courier' });
    y = addLine(y + 2, [229, 225, 216]);
    y = addText(project.details, margin, y + 2, { fontSize: 9.5, color: [60, 60, 60], lineHeight: 1.5 });
    y += 4;

    // ── MVDA APPROVAL NOTICE ──
    doc.setFillColor(254, 243, 199); // yellow
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'F');
    doc.setDrawColor(212, 175, 55);
    doc.setLineWidth(0.5);
    doc.roundedRect(margin, y, contentWidth, 20, 2, 2, 'S');
    y = addBoldText('\u26A0 MVDA APPROVAL NOTICE', margin + 4, y + 5, { fontSize: 9, color: [139, 115, 91], font: 'courier' });
    y = addText(
      'This project is fully approved under Mathura-Vrindavan Development Authority (MVDA) guidelines. All documentation, title deeds, and regulatory clearances are verified and available for inspection upon request.',
      margin + 4, y + 1, { fontSize: 8, color: [80, 80, 80], maxWidth: contentWidth - 8 }
    );
    y += 8;

    // ── FOOTER ──
    const footerY = doc.internal.pageSize.getHeight() - 20;
    doc.setFillColor(139, 115, 91);
    doc.rect(0, footerY + 10, pageWidth, 2, 'F');

    addBoldText('RK PROPERTIES VRINDAVAN', pageWidth / 2, footerY, { fontSize: 10, align: 'center', color: [139, 115, 91] });
    addText('Phone: +91 91152 77000  |  Email: listings@rkproperties.in', pageWidth / 2, footerY + 4, { fontSize: 7.5, align: 'center', color: [120, 120, 120], font: 'courier' });
    addText('Chhatikara Road, Near Prem Mandir, Vrindavan, UP - 281121', pageWidth / 2, footerY + 7.5, { fontSize: 7, align: 'center', color: [150, 150, 150], font: 'courier' });

    // Generate PDF buffer
    const pdfBuffer = Buffer.from(doc.output('arraybuffer'));

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${project.name.replace(/\s+/g, '_')}_Brochure.pdf"`,
      },
    });
  } catch (error) {
    console.error('Brochure generation error:', error);
    return NextResponse.json({ error: 'Failed to generate brochure' }, { status: 500 });
  }
}