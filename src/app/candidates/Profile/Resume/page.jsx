"use client";
import Nav_Home from "@/app/components/Nav_Home";
import Sidebar from "@/app/components/Sidebar";
import React, { useState } from "react";

const Page = () => {
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const handleFileChange = (event) => {
    setResume(event.target.file);
    setUploadSuccess(false);
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!resume) {
      console.error("No resume selected for upload");
      return;
    }

    console.log("Selected file:", resume);

    const formData = new FormData();
    formData.append("resume", resume);

    // Rest of the code...

    setUploading(true);

    try {
      const response = await fetch("/api/Profile/Resume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Resume uploaded successfully");
        setUploadSuccess(true);
      } else {
        const errorText = await response.text();
        console.error("Failed to upload resume:", errorText);
        setUploadError(errorText);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
      setUploadError(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-2 text-white">
          <Sidebar />
        </div>
        <div className="col-span-10 flex flex-col">
          <div className="p-4">
            <h1 className="text-xl mb-0 font-bold">Edit your Found Profile</h1>
          </div>
          <div className="flex-grow">
            <Nav_Home />
            <div className="p-4">
              <h2 className="text-lg font-semibold mb-2">Upload Resume</h2>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
              />
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 ${
                  uploading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
              {uploadSuccess && (
                <p className="text-green-500 mt-2">
                  Resume uploaded successfully!
                </p>
              )}
              {uploadError && (
                <p className="text-red-500 mt-2">Error: {uploadError}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
