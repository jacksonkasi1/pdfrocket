const fs = require("fs");
const path = require("path");
const HummusRecipe = require("hummus-recipe");
const tmp = require("tmp");

async function encryptPdf(inputPdfBuffer, password) {
  const inputPdfPath = tmp.tmpNameSync({ postfix: ".pdf" });
  const outputPdfPath = tmp.tmpNameSync({ postfix: ".pdf" });

  fs.writeFileSync(inputPdfPath, inputPdfBuffer);

  const pdfDoc = new HummusRecipe(inputPdfPath, outputPdfPath);

  pdfDoc
    .encrypt({
      userPassword: password,
      ownerPassword: password,
      userProtectionFlag: 4, // Prevent copying and editing
    })
    .endPDF();

  const encryptedPdfBuffer = fs.readFileSync(outputPdfPath);

  fs.unlinkSync(inputPdfPath);
  fs.unlinkSync(outputPdfPath);

  return encryptedPdfBuffer;
}

module.exports = {
  encryptPdf,
};