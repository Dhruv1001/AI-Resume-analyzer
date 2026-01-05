const Result = ({ result }) => {
  const missingSkills = result?.missing_skills || [];
  const suggestions = result?.suggestions || [];

  return (
    <div>
      <h3>Missing Skills</h3>
      <ul>
        {missingSkills.length > 0 ? (
          missingSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))
        ) : (
          <li>No missing skills 🎉</li>
        )}
      </ul>

      <h3>Suggestions</h3>
      <ul>
        {suggestions.length > 0 ? (
          suggestions.map((s, index) => (
            <li key={index}>{s}</li>
          ))
        ) : (
          <li>No suggestions</li>
        )}
      </ul>
    </div>
  );
};

export default Result;
