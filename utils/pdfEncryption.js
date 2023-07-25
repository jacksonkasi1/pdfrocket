const qpdf = require("node-qpdf");

// const qpdfPath = require("qpdf");

async function encryptPdf(pdfBuffer, password, res, filename) {
  const options = {
    // qpdfPath,
    keyLength: 256,
    password,
    restrictions: {
      modify: "none",
      extract: "n",
    },
  };

  try {
    const encryptedPdf = await new Promise((resolve, reject) => {
      qpdf.encrypt(pdfBuffer, options, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
        "Content-Disposition",
        `attachment; filename=${encodeURIComponent(filename)}`
    );

    res.send(encryptedPdf);

    // res.writeHead(200, {
    //   "Content-Type": "application/pdf",
    //   "Access-Control-Allow-Origin": "*",
    //   "Content-Disposition": `inline; filename=${filename}`,
    // });

  } catch (err) {
    console.error("Error encrypting PDF:", err);
    res.status(500).send("Error encrypting PDF");
  }
}

module.exports = {
  encryptPdf,
};

