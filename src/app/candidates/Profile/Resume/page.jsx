"use client";
import Nav_Home from "@/app/components/Nav_Home";
import Sidebar from "@/app/components/Sidebar";
import React, { useState } from "react";

const Page = () => {
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!resume) {
      console.error("No resume selected for upload");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    setUploading(true);

    try {
      const response = await fetch("/api/Profile/Resume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        console.log("Resume uploaded successfully");
      } else {
        const errorText = await response.text();
        console.error("Failed to upload resume:", errorText);
      }
    } catch (error) {
      console.error("Error uploading resume:", error);
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
