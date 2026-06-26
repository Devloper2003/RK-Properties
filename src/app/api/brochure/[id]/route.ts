import { NextRequest, NextResponse } from 'next/server';
import { propertiesData } from '@/data/propertyData';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const project = propertiesData.find(p => p.id === id);

  if (!project) {
    return NextResponse.json({ error: 'Project not found' }, { status: 404 });
  }

  try {
    const { jsPDF } = await import('jspdf');
    const doc = new jsPDF();

    const pageW = doc.internal.pageSize.getWidth();
    const margin = 20;
    let y = 20;

    // Helper
    const addText = (text: string, fontSize: number, color: [number, number, number], fontWeight: 'normal' | 'bold' = 'normal', maxWidth?: number) => {
      doc.setFontSize(fontSize);
      doc.setFont('helvetica', fontWeight);
      doc.setTextColor(...color);
      const lines = doc.splitTextToSize(text, maxWidth || (pageW - margin * 2));
      doc.text(lines, margin, y);
      y += lines.length * (fontSize * 0.5) + 4;
      return lines.length;
    };

    const addLine = () => {
      doc.setDrawColor(212, 175, 55);
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageW - margin, y);
      y += 8;
    };

    const checkPage = () => {
      if (y > 260) {
        doc.addPage();
        y = 20;
      }
    };

    // === COVER SECTION ===
    // Gold header bar
    doc.setFillColor(30, 25, 15);
    doc.rect(0, 0, pageW, 50, 'F');

    doc.setTextColor(212, 175, 55);
    doc.setFontSize(22);
    doc.setFont('helvetica', 'bold');
    doc.text('RK PROPERTIES', margin, 25);

    doc.setTextColor(180, 180, 180);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Trust \u2022 Transparency \u2022 Value', margin, 33);
    doc.text('MVDA Approved | UP-RERA Registered', margin, 40);

    // Right side badge
    doc.setTextColor(212, 175, 55);
    doc.setFontSize(9);
    doc.text('PROJECT BROCHURE', pageW - margin, 30, { align: 'right' });

    y = 65;

    // Project Name
    addText(project.name, 24, [30, 25, 15], 'bold');
    addText(`${project.type} | ${project.status}`, 10, [212, 175, 55], 'bold');
    addText(project.tag, 9, [130, 130, 130]);
    y += 2;
    addLine();

    // Key Stats Grid
    checkPage();
    addText('PROJECT OVERVIEW', 10, [212, 175, 55], 'bold');
    y += 2;

    const stats = [
      ['Location', project.location],
      ['Size Range', project.size],
      ['Price', project.price],
      ['Annual Appreciation', `+${project.appreciationRate}% per annum`],
    ];

    stats.forEach(([label, value]) => {
      checkPage();
      doc.setFontSize(8);
      doc.setFont('helvetica', 'normal');
      doc.setTextColor(130, 130, 130);
      doc.text(label, margin, y);

      doc.setFontSize(10);
      doc.setFont('helvetica', 'bold');
      doc.setTextColor(30, 30, 30);
      const valLines = doc.splitTextToSize(value as string, pageW - margin - 50);
      doc.text(valLines, margin + 45, y);
      y += valLines.length * 5 + 6;
    });

    y += 4;
    addLine();

    // Description
    checkPage();
    addText('PROJECT DESCRIPTION', 10, [212, 175, 55], 'bold');
    y += 2;
    addText(project.description, 10, [60, 60, 60]);
    y += 4;
    addLine();

    // Highlights
    checkPage();
    addText('KEY HIGHLIGHTS', 10, [212, 175, 55], 'bold');
    y += 2;
    project.highlights.forEach((h) => {
      checkPage();
      doc.setFontSize(10);
      doc.setTextColor(60, 60, 60);
      doc.text(`\u2713  ${h}`, margin + 4, y);
      y += 7;
    });
    y += 2;
    addLine();

    // Amenities
    checkPage();
    addText('AMENITIES & INFRASTRUCTURE', 10, [212, 175, 55], 'bold');
    y += 2;
    project.amenities.forEach((a) => {
      checkPage();
      doc.setFontSize(9);
      doc.setTextColor(60, 60, 60);
      doc.text(`\u2726  ${a}`, margin + 4, y);
      y += 6;
    });
    y += 2;
    addLine();

    // ROI Projections
    checkPage();
    addText('ROI PROJECTIONS', 10, [212, 175, 55], 'bold');
    y += 2;
    addText('5-Year Outlook:', 9, [100, 100, 100], 'bold');
    addText(project.roiProjection5Yr, 9, [60, 60, 60]);
    y += 2;
    checkPage();
    addText('10-Year Outlook:', 9, [100, 100, 100], 'bold');
    addText(project.roiProjection10Yr, 9, [60, 60, 60]);
    y += 4;

    // Additional Details
    checkPage();
    addLine();
    addText('ADDITIONAL DETAILS', 10, [212, 175, 55], 'bold');
    y += 2;
    addText(project.details, 9, [60, 60, 60]);

    // Footer on every page
    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFillColor(245, 245, 245);
      doc.rect(0, 275, pageW, 25, 'F');

      doc.setFontSize(7);
      doc.setTextColor(150, 150, 150);
      doc.setFont('helvetica', 'normal');
      doc.text('This brochure is for informational purposes only. Prices and availability are subject to change without prior notice.', margin, 283);
      doc.text(`RK Properties Vrindavan | Phone: +91 9115277000 | Email: listings@rkproperties.in`, margin, 290);
      doc.text(`Page ${i} of ${totalPages}`, pageW - margin, 290, { align: 'right' });
    }

    const pdfBuffer = doc.output('arraybuffer');

    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="RK-Properties-${project.name.replace(/\s+/g, '-')}-Brochure.pdf"`,
      },
    });
  } catch (error) {
    console.error('PDF generation error:', error);
    return NextResponse.json({ error: 'Failed to generate PDF' }, { status: 500 });
  }
}