"use client";
import React, { useState } from "react";
import Nav_bar from "../components/Nav_Bar";

import Sidebar from "../components/side_bar";

const Page = () => {
  const [jobDescription, setJobDescription] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [jobSalary, setJobSalary] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      jobDescription,
      experienceRequired,
      jobLink,
      jobLocation,
      jobSalary,
      keyResponsibilities,
      qualifications,
      dateOfJoining,
    };
    console.log("Form submitted!", formData);
    // Optionally send the formData to a server here
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav_bar />
      <div className="flex flex-1">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6 p-6 flex flex-col  mt-8 space-y-4">
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg space-y-6"
          >
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Job Description
                </label>
                <textarea
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Job Description"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Experience Required
                </label>
                <input
                  type="text"
                  value={experienceRequired}
                  onChange={(e) => setExperienceRequired(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Experience Required"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Job Link
                </label>
                <input
                  type="text"
                  value={jobLink}
                  onChange={(e) => setJobLink(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Job Link"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Job Location
                </label>
                <input
                  type="text"
                  value={jobLocation}
                  onChange={(e) => setJobLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Job Location"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Salary Range
                </label>
                <input
                  type="text"
                  value={jobSalary}
                  onChange={(e) => setJobSalary(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Salary"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Key Responsibilities
                </label>
                <textarea
                  value={keyResponsibilities}
                  onChange={(e) => setKeyResponsibilities(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Key Responsibilities"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Qualifications
                </label>
                <textarea
                  value={qualifications}
                  onChange={(e) => setQualifications(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Qualifications"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Date of Joining
                </label>
                <input
                  type="date"
                  value={dateOfJoining}
                  onChange={(e) => setDateOfJoining(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
