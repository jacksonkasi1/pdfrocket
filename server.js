const express = require("express");
const NodeCache = require("node-cache");
const { PDFDocument } = require("pdf-lib");
const {
  initBrowser,
  generatePDF,
  generatePDFFromHTML,
} = require("./utils/pdfUtils");
const { encryptPdf } = require("./utils/pdfEncryption");

const app = express();
const port = process.env.PORT || 3000;
const maxConcurrentJobs = 5; // Adjust based on your system's resources
const cache = new NodeCache({ stdTTL: 3600 }); // Cache PDFs for 1 hour

app.use(express.json());

app.get("/api/url-to-pdf", async (req, res) => {
  const { url, protected, password } = req.query;

  if (!url) {
    return res.status(400).send("URL parameter is required");
  }

  // Check if PDF is cached
  const cachedPdf = cache.get(url);

  let pdf;
  if (cachedPdf) {
    console.log("Serving cached PDF:", url);
    pdf = cachedPdf;
  } else {
    try {
      pdf = await generatePDF(url);
      // Cache the generated PDF
      cache.set(url, pdf);
    } catch (err) {
      console.error("Error generating PDF:", err);
      return res.status(500).send("Error generating PDF");
    }
  }

  if (protected === "true" && password) {
    try {
      pdf = await encryptPdf(pdf, password);
    } catch (err) {
      console.error("Error encrypting PDF:", err);
      return res.status(500).send("Error encrypting PDF");
    }
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=${encodeURIComponent(url)}.pdf`
  );
  res.send(pdf);
});

app.post("/api/html-to-pdf", async (req, res) => {
  const { html } = req.body;

  const { protected, password } = req.query;

  if (!html) {
    return res.status(400).send("HTML parameter is required");
  }

  let pdf;
  try {
    pdf = await generatePDFFromHTML(html);
  } catch (err) {
    console.error("Error generating PDF:", err);
    return res.status(500).send("Error generating PDF");
  }

  if (protected === "true" && password) {
    try {
      pdf = await encryptPdf(pdf, password);
    } catch (err) {
      console.error("Error encrypting PDF:", err);
      return res.status(500).send("Error encrypting PDF");
    }
  }

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", `attachment; filename=html-to-pdf.pdf`);
  res.send(pdf);
});

(async () => {
  await initBrowser(maxConcurrentJobs);
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
})();
