import { jsPDF } from "jspdf";
import type { StatutsSASData } from "./questionnaire-config";
import { generateStatutsSAS } from "./statuts-sas-template";

const MARGIN_LEFT = 25;
const MARGIN_RIGHT = 25;
const MARGIN_TOP = 30;
const MARGIN_BOTTOM = 25;
const LINE_HEIGHT = 6;
const PAGE_WIDTH = 210;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

export function generateStatutsPDF(data: StatutsSASData): Buffer {
  const doc = new jsPDF({ unit: "mm", format: "a4" });
  const text = generateStatutsSAS(data);

  let y = MARGIN_TOP;
  let pageNum = 1;

  function addPageNumber() {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(`Page ${pageNum}`, PAGE_WIDTH / 2, 290, { align: "center" });
    doc.text(`${data.denomination.toUpperCase()} — Statuts`, MARGIN_LEFT, 290);
  }

  function addWatermark() {
    doc.setFont("helvetica", "normal");
    doc.setFontSize(40);
    doc.setTextColor(240, 240, 240);
    doc.text("QuickLegal", PAGE_WIDTH / 2, 150, {
      align: "center",
      angle: 45,
    });
  }

  function checkNewPage(neededSpace: number = LINE_HEIGHT * 2) {
    if (y + neededSpace > 297 - MARGIN_BOTTOM) {
      addPageNumber();
      addWatermark();
      doc.addPage();
      pageNum++;
      y = MARGIN_TOP;
    }
  }

  // Process text line by line
  const lines = text.split("\n");

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      y += LINE_HEIGHT * 0.5;
      checkNewPage();
      continue;
    }

    // TITLE LINES (all uppercase, long enough)
    if (trimmed === trimmed.toUpperCase() && trimmed.length > 10 && !trimmed.startsWith("-") && !trimmed.startsWith("[")) {
      checkNewPage(LINE_HEIGHT * 3);
      y += LINE_HEIGHT;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(13);
      doc.setTextColor(20, 20, 60);

      const titleLines = doc.splitTextToSize(trimmed, CONTENT_WIDTH);
      for (const tl of titleLines) {
        checkNewPage();
        doc.text(tl, PAGE_WIDTH / 2, y, { align: "center" });
        y += LINE_HEIGHT * 1.3;
      }
      y += LINE_HEIGHT * 0.5;
      continue;
    }

    // ARTICLE HEADERS
    if (trimmed.startsWith("Article ") || trimmed.startsWith("TITRE ") || trimmed.startsWith("DESIGNATION")) {
      checkNewPage(LINE_HEIGHT * 4);
      y += LINE_HEIGHT;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 80);

      const headerParts = trimmed.split(" - ");
      if (headerParts.length > 1) {
        doc.text(headerParts[0] + " -", MARGIN_LEFT, y);
        y += LINE_HEIGHT;
        doc.setFont("helvetica", "bolditalic");
        const subLines = doc.splitTextToSize(headerParts.slice(1).join(" - "), CONTENT_WIDTH);
        for (const sl of subLines) {
          checkNewPage();
          doc.text(sl, MARGIN_LEFT, y);
          y += LINE_HEIGHT;
        }
      } else {
        const headerLines = doc.splitTextToSize(trimmed, CONTENT_WIDTH);
        for (const hl of headerLines) {
          checkNewPage();
          doc.text(hl, MARGIN_LEFT, y);
          y += LINE_HEIGHT;
        }
      }
      y += LINE_HEIGHT * 0.3;
      continue;
    }

    // SIGNATURE HINT
    if (trimmed === "(signature precedee de la mention \"Lu et approuve\")") {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      checkNewPage();
      doc.text(trimmed, MARGIN_LEFT, y);
      y += LINE_HEIGHT;
      // Add signature line
      y += LINE_HEIGHT * 2;
      doc.setDrawColor(180, 180, 180);
      doc.line(MARGIN_LEFT, y, MARGIN_LEFT + 60, y);
      y += LINE_HEIGHT * 2;
      continue;
    }

    // BULLET POINTS
    if (trimmed.startsWith("- ") || trimmed.match(/^\d+\.\s/)) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(40, 40, 40);
      const bulletLines = doc.splitTextToSize(trimmed, CONTENT_WIDTH - 5);
      for (let i = 0; i < bulletLines.length; i++) {
        checkNewPage();
        doc.text(bulletLines[i], MARGIN_LEFT + (i === 0 ? 0 : 5), y);
        y += LINE_HEIGHT;
      }
      continue;
    }

    // NOTES in brackets
    if (trimmed.startsWith("[NOTE")) {
      doc.setFont("helvetica", "italic");
      doc.setFontSize(9);
      doc.setTextColor(100, 100, 100);
      const noteLines = doc.splitTextToSize(trimmed, CONTENT_WIDTH - 10);
      for (const nl of noteLines) {
        checkNewPage();
        doc.text(nl, MARGIN_LEFT + 5, y);
        y += LINE_HEIGHT * 0.9;
      }
      y += LINE_HEIGHT * 0.3;
      continue;
    }

    // Regular text
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(40, 40, 40);

    const wrappedLines = doc.splitTextToSize(trimmed, CONTENT_WIDTH);
    for (const wl of wrappedLines) {
      checkNewPage();
      doc.text(wl, MARGIN_LEFT, y);
      y += LINE_HEIGHT;
    }
  }

  // Last page footer
  addPageNumber();
  addWatermark();

  // Return as buffer
  const arrayBuffer = doc.output("arraybuffer");
  return Buffer.from(arrayBuffer);
}
