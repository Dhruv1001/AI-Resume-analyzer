import express from "express";
import multer from "multer";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { analyzeResume } from "../utils/ai.js";

const router = express.Router();
const upload = multer();

router.post("/", upload.single("resume"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No resume uploaded" });
    }

    // 1️⃣ Extract PDF text
    const data = new Uint8Array(req.file.buffer);
    const pdf = await pdfjsLib.getDocument({ data }).promise;

    let resumeText = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      resumeText += content.items.map(item => item.str).join(" ");
    }

    // 2️⃣ 🔥 ADD THIS BLOCK RIGHT HERE 🔥
    resumeText = resumeText
      .replace(/\s+/g, " ")
      .replace(/[^\x20-\x7E]/g, "")
      .trim();

    // (Optional but useful)
    console.log("RESUME TEXT LENGTH:", resumeText.length);

    // 3️⃣ Send clean text to AI
    const jobDescription = req.body.jobDescription;
    const result = await analyzeResume(resumeText, jobDescription);

    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Resume analysis failed" });
  }
});

export default router;
