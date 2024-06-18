"use client";
import React, { useState, useEffect } from "react";

const Resume_data = () => {
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResume = async () => {
      try {
        const response = await fetch("/api/Profile/Resume");

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error fetching resume:", errorText);
          throw new Error("Failed to fetch resume");
        }

        const resumeDocument = await response.json();
        const resumeContent = resumeDocument.resume;

        const base64Resume = Buffer.from(resumeContent, "base64").toString(
          "base64"
        );
        const dataUri = `data:application/pdf;base64,${base64Resume}`;

        setResumeData(dataUri);
      } catch (error) {
        console.log("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchResume();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <h2>Resume</h2>
      {resumeData ? (
        <embed
          src={resumeData}
          type="application/pdf"
          width="100%"
          height="600px"
        />
      ) : (
        <p>No resume available</p>
      )}
    </div>
  );
};

export default Resume_data;
