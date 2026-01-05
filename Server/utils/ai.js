import { GoogleGenerativeAI } from "@google/generative-ai";

export async function analyzeResume(resumeText, jobDescription) {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an ATS resume analyzer.

The resume text IS valid and readable.
Do NOT ask for another format.
Do NOT refuse analysis.

Analyze the resume against the job description
and return ONLY valid JSON in this format:

{
  "match_percentage": number,
  "missing_skills": string[],
  "suggestions": string[]
}


RESUME:
${resumeText}

JOB DESCRIPTION:
${jobDescription}
`;

  const result = await model.generateContent(prompt);
  const text = result.response.text();

  // 🔒 Safety cleanup (just in case)
  const cleaned = text
    .replace(/```json/g, "")
    .replace(/```/g, "")
    .trim();

  return JSON.parse(cleaned);
}
