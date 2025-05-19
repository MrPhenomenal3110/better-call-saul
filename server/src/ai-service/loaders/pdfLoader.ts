import fs from "fs";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.js";

export async function extractTextFromPDF(filePath: string): Promise<string> {
  // Read file as Uint8Array
  const data = new Uint8Array(fs.readFileSync(filePath));

  // Load the PDF document
  const loadingTask = pdfjsLib.getDocument({ data });
  const pdfDocument = await loadingTask.promise;

  let fullText = "";

  // Loop through each page
  for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
    const page = await pdfDocument.getPage(pageNum);
    const textContent = await page.getTextContent();

    // Extract text items from the page text content
    const pageText = textContent.items.map((item: any) => item.str).join(" ");

    fullText += pageText + "\n";
  }

  return fullText;
}
