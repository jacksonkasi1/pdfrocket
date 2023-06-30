const puppeteer = require("puppeteer");

let browser;
let browserPageQueue = [];

async function initBrowser(maxConcurrentJobs) {
  browser = await puppeteer.launch();
  for (let i = 0; i < maxConcurrentJobs; i++) {
    const page = await browser.newPage();
    browserPageQueue.push(page);
  }
}

async function generatePDF(url) {
  if (browserPageQueue.length === 0) {
    throw new Error("No available browser pages for parallelization");
  }

  const page = browserPageQueue.pop();
  await page.goto(url, { waitUntil: "networkidle2" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  browserPageQueue.push(page);

  return pdf;
}

async function generatePDFFromHTML(html) {
  if (browserPageQueue.length === 0) {
    throw new Error("No available browser pages for parallelization");
  }

  const page = browserPageQueue.pop();
  await page.setContent(html, { waitUntil: "networkidle2" });
  const pdf = await page.pdf({ format: "A4", printBackground: true });
  browserPageQueue.push(page);

  return pdf;
}

module.exports = {
  initBrowser,
  generatePDF,
  generatePDFFromHTML,
};