const express = require("express");
const app = express();
require("dotenv").config();

const fs = require("fs");
const crypto = require("crypto");
const PDFDocument = require("pdfkit");

app.get("/", async (req, res) => {
  try {
    res.status(200).send({
      message: "Welcome to my API server!",
    });
  } catch (error) {
    console.log(error);
  }
});

app.get("/pdf", async (req, res) => {
  try {
    // Create a new PDF document
    const doc = new PDFDocument();

    // Set response headers for PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", 'attachment; filename="output.pdf"');

    // Pipe the PDF document to the response stream
    doc.pipe(res);

    // Add content to the PDF document
    doc
      .font("Helvetica-Bold")
      .fontSize(24)
      .text("Hello, PDF!", { align: "center" });

    // Finalize the PDF document
    doc.end();

    console.log("PDF generated successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("An error occurred while generating the PDF.");
  }
});

const SECRET = "secretsupersecret111";
const CLOUD_RUN_URL =
  "https://bni-gme-development-staging-a4xuazxb4q-et.a.run.app/api/v1/emrv2/refresh";
// const CLOUD_RUN_URL = 'http://localhost:8080/api/v1/pelanggan';
const jwt = require("jsonwebtoken");
const axios = require("axios");
var key = "jkwdbnwy8g2yg78234bhjk";
var encryptor = require("simple-encryptor")(key);

app.get("/function", async (req, res) => {
  try {
    const token = generateToken(1, "bagusn05@gmail.com", "admin", "huda");
    const response = await axios.delete(CLOUD_RUN_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.headers);
    // console.log(response?.data);
    return res.status(200).send({
      message: "Successfully executed",
      data: response?.data?.message,
    });
  } catch (err) {
    console.log(err?.response?.data);
    return res.status(500).send(err.message);
  }
});

function generateToken(id, email, role, name) {
  let expiresIn = "15m";
  const token = jwt.sign(
    {
      userId: id,
      email: email,
      role: role,
      name: name,
    },
    SECRET,
    { expiresIn: expiresIn }
  );
  var encrypted = encryptor.encrypt(token);
  return encrypted;
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Application is running on ${PORT}!! `);
});
