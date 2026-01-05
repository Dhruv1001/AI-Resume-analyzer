import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import analyzeRoute from "./routes/analyze.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/analyze", analyzeRoute);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
console.log("Gemini Key Loaded:", process.env.GEMINI_API_KEY);

