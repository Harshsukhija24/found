// pages/upload.js
"use client";
import React, { useState } from "react";
import Nav_Home from "@/app/components/Nav_Home";
import Sidebar from "@/app/components/Sidebar";
import { useSession } from "next-auth/react";
import Nav from "../../../components/Nav";
import Resume_data from "@/app/components/Resume_data";

const Page = () => {
  const [resume, setResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setResume(selectedFile);
    setUploadSuccess(false);
    setUploadError(null);
  };

  const handleUpload = async () => {
    if (!resume) {
      console.error("No resume selected for upload");
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    // Add userId to FormData
    if (session) {
      formData.append("userId", session.user.userId);
    }

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
    <div className="flex flex-col mt-6   h-screen">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>
        <div className="w-5/6 p-4 overflow-auto">
          <div className="flex-grow">
            <Nav_Home />
            <h1 className="text-xl mb-0 font-bold">Edit your Found Profile</h1>

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
          <Resume_data />
        </div>
      </div>
    </div>
  );
};

export default Page;
