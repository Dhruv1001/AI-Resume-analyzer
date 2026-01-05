import { useState } from "react";
import axios from "axios";
import Result from "./Result";

export default function ResumeUpload() {
  const [file, setFile] = useState(null);
  const [jd, setJd] = useState("");
  const [result, setResult] = useState({
    match_percentage: 0,
    missing_skills: [],
    suggestions: []
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (!file || !jd) {
    alert("Please upload resume and paste job description");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jd);

    const res = await axios.post(
      "http://localhost:5000/analyze",
      formData
    );

    console.log("API RESPONSE:", res.data); // 🔴 IMPORTANT

    // 🔥 THIS LINE FIXES IT
    setResult(res.data.data ?? res.data);

  } catch (error) {
    console.error(error);
    alert("Error analyzing resume");
  }
};


  return (
    <div>
      <h2>AI Resume Analyzer</h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <textarea
        placeholder="Paste Job Description"
        rows={6}
        onChange={(e) => setJd(e.target.value)}
      />

      <br /><br />

      <button onClick={handleSubmit} disabled={loading}>
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      <hr />
      <pre>{JSON.stringify(result, null, 2)}</pre>

      <Result result={result} />
    </div>
  );
}
