import { jsPDF } from 'jspdf';
import {
  CERTIFICATIONS,
  EDUCATION,
  EXPERIENCE,
  HERO_IMAGE,
  LEADERSHIP_STRENGTHS,
  PROFILE,
  PROJECTS,
  SKILL_CATEGORIES,
} from '../data/portfolioData';

async function loadPortraitDataUrl(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const size = 480;
        const canvas = document.createElement('canvas');
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, size, size);

        const scale = Math.max(
          size / img.naturalWidth,
          size / img.naturalHeight
        );
        const drawW = img.naturalWidth * scale;
        const drawH = img.naturalHeight * scale;
        const dx = (size - drawW) / 2;
        const dy = 0;

        ctx.drawImage(img, dx, dy, drawW, drawH);
        resolve(canvas.toDataURL('image/jpeg', 0.92));
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

export async function downloadResumePdf(): Promise<void> {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = 210;
  const marginX = 16;
  const contentWidth = pageWidth - marginX * 2;
  const bottomMargin = 281;
  let y = 16;

  const ensureSpace = (neededMm: number) => {
    if (y + neededMm > bottomMargin) {
      doc.addPage();
      y = 18;
    }
  };

  const drawWrapped = (
    text: string,
    x: number,
    maxWidth: number,
    fontSize: number,
    color: [number, number, number],
    fontStyle: 'normal' | 'bold' = 'normal',
    lineStep = 4.3
  ) => {
    doc.setFont('helvetica', fontStyle);
    doc.setFontSize(fontSize);
    doc.setTextColor(color[0], color[1], color[2]);
    const lines = doc.splitTextToSize(text, maxWidth) as string[];
    for (const line of lines) {
      ensureSpace(lineStep + 1);
      doc.text(line, x, y);
      y += lineStep;
    }
  };

  const drawSectionTitle = (title: string) => {
    ensureSpace(13);
    y += 3.5;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(118, 87, 246);
    doc.text(title.toUpperCase(), marginX, y);
    y += 1.8;
    doc.setDrawColor(226, 232, 240);
    doc.setLineWidth(0.3);
    doc.line(marginX, y, pageWidth - marginX, y);
    y += 4.8;
  };

  const portraitDataUrl = await loadPortraitDataUrl(HERO_IMAGE.src);

  const photoSize = 29;
  const photoX = pageWidth - marginX - photoSize;
  const photoY = 14;
  const headerTextWidth = portraitDataUrl
    ? contentWidth - photoSize - 7
    : contentWidth;

  if (portraitDataUrl) {
    doc.addImage(
      portraitDataUrl,
      'JPEG',
      photoX,
      photoY,
      photoSize,
      photoSize
    );
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.35);
    doc.rect(photoX, photoY, photoSize, photoSize);
  }

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(17.5);
  doc.setTextColor(15, 23, 42);
  doc.text(PROFILE.name, marginX, y + 3);
  y += 8.2;

  drawWrapped(
    PROFILE.designation,
    marginX,
    headerTextWidth,
    9.1,
    [118, 87, 246],
    'bold',
    4.2
  );
  y += 1;

  drawWrapped(
    `${PROFILE.location}  •  Phone: ${PROFILE.phone}`,
    marginX,
    headerTextWidth,
    8.6,
    [51, 65, 85],
    'normal',
    4.1
  );
  drawWrapped(
    `Email: ${PROFILE.email}`,
    marginX,
    headerTextWidth,
    8.6,
    [51, 65, 85],
    'normal',
    4.1
  );
  drawWrapped(
    PROFILE.socials.map((s) => `${s.label}: ${s.handle}`).join('  •  '),
    marginX,
    headerTextWidth,
    8.6,
    [51, 65, 85],
    'normal',
    4.1
  );

  y = Math.max(y + 1, photoY + photoSize + 4);
  doc.setDrawColor(118, 87, 246);
  doc.setLineWidth(0.6);
  doc.line(marginX, y, pageWidth - marginX, y);
  y += 4;

  // Professional Summary
  drawSectionTitle('Professional Summary');
  for (const para of PROFILE.summaryParagraphs) {
    drawWrapped(para, marginX, contentWidth, 9.1, [30, 41, 59], 'normal', 4.3);
    y += 1;
  }

  // Technical Skills & Core Competencies
  drawSectionTitle('Technical Skills & Core Competencies');
  for (const group of SKILL_CATEGORIES) {
    ensureSpace(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    const label = `${group.category}: `;
    const labelW = doc.getTextWidth(label);
    const itemsText = group.items.map((i) => i.name).join(', ');
    const wrappedRest = doc.splitTextToSize(
      itemsText,
      contentWidth - labelW
    ) as string[];
    doc.text(label, marginX, y);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(51, 65, 85);
    if (wrappedRest.length > 0) {
      doc.text(wrappedRest[0], marginX + labelW, y);
      y += 4.3;
      for (let i = 1; i < wrappedRest.length; i++) {
        ensureSpace(4.5);
        doc.text(wrappedRest[i], marginX + labelW, y);
        y += 4.3;
      }
    } else {
      y += 4.3;
    }
  }

  // Professional Experience
  drawSectionTitle('Professional Experience');
  for (const exp of EXPERIENCE) {
    ensureSpace(18);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(15, 23, 42);
    doc.text(`${exp.role} — ${exp.company}`, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(71, 85, 105);
    const rightMeta = exp.isConcurrent
      ? `${exp.period} | Part-Time Role`
      : `${exp.period} | ${exp.location}`;
    doc.text(rightMeta, pageWidth - marginX, y, { align: 'right' });
    y += 4.5;

    if (exp.progressionSteps && exp.progressionSteps.length > 0) {
      drawWrapped(
        `Career Progression: ${exp.progressionSteps.join(' → ')}`,
        marginX,
        contentWidth,
        8.4,
        [118, 87, 246],
        'bold',
        4.1
      );
      y += 0.5;
    }

    for (const bullet of exp.highlights) {
      ensureSpace(6);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(9);
      doc.setTextColor(51, 65, 85);
      doc.text('•', marginX + 1.5, y);
      drawWrapped(
        bullet,
        marginX + 5.5,
        contentWidth - 5.5,
        9,
        [51, 65, 85],
        'normal',
        4.2
      );
    }
    y += 2.5;
  }

  // Key Projects
  drawSectionTitle('Selected Projects');
  for (const proj of PROJECTS) {
    ensureSpace(14);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(15, 23, 42);
    doc.text(proj.title, marginX, y);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8.4);
    doc.setTextColor(71, 85, 105);
    doc.text(`${proj.categoryLabel} · ${proj.year}`, pageWidth - marginX, y, {
      align: 'right',
    });
    y += 4.4;

    drawWrapped(
      proj.summary,
      marginX,
      contentWidth,
      9,
      [51, 65, 85],
      'normal',
      4.2
    );
    drawWrapped(
      `Tech Stack: ${proj.stack.join(' · ')}`,
      marginX,
      contentWidth,
      8.4,
      [71, 85, 105],
      'bold',
      4.1
    );
    y += 2;
  }

  // Education
  drawSectionTitle('Education');
  for (const edu of EDUCATION) {
    ensureSpace(12);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9.8);
    doc.setTextColor(15, 23, 42);
    doc.text(`${edu.degree} in ${edu.field}`, marginX, y);
    y += 4.4;
    drawWrapped(
      `${edu.institution}, ${edu.location}  •  CGPA: ${edu.cgpa}`,
      marginX,
      contentWidth,
      9,
      [51, 65, 85],
      'normal',
      4.2
    );
    y += 1.5;
  }

  // Training & Certifications (Grouped by Track)
  drawSectionTitle('Training & Certifications');
  const certGroups = [
    {
      label: 'National Skills Credentials (NSDA)',
      items: CERTIFICATIONS.filter((c) => c.track === 'nsda'),
    },
    {
      label: 'Networking & Infrastructure',
      items: CERTIFICATIONS.filter((c) => c.track === 'networking'),
    },
    {
      label: 'Online Training & Sessions',
      items: CERTIFICATIONS.filter((c) => c.track === 'training'),
    },
  ];

  for (const group of certGroups) {
    if (group.items.length === 0) continue;
    ensureSpace(8);
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(group.label, marginX, y);
    y += 4.2;

    for (const cert of group.items) {
      ensureSpace(6);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.8);
      doc.setTextColor(51, 65, 85);
      doc.text('•', marginX + 1.5, y);
      const idSuffix = cert.credentialNumber
        ? ` [${cert.credentialNumber}]`
        : '';
      drawWrapped(
        `${cert.title} — ${cert.issuerShort} (${cert.credentialMeta}${idSuffix})`,
        marginX + 5.5,
        contentWidth - 5.5,
        8.8,
        [51, 65, 85],
        'normal',
        4.1
      );
    }
    y += 1.2;
  }

  // Leadership & Execution
  drawSectionTitle('Leadership & Execution');
  drawWrapped(
    LEADERSHIP_STRENGTHS.join('  •  '),
    marginX,
    contentWidth,
    9,
    [51, 65, 85],
    'normal',
    4.3
  );

  doc.save('Md_Lal_Chand_Ali_Resume.pdf');
}
