// pages/Profile.js
"use client";

import React, { useState } from "react";
import Nav_bar from "../../components/Nav_Bar";
import Sidebar from "../../components/side_bar";
import ProfileNav from "../../components/ProfileNav";

const Page = () => {
  const [founderName, setFounderName] = useState("");
  const [founderLocation, setFounderLocation] = useState("");
  const [founderPastExperience, setFounderPastExperience] = useState("");
  const [coFounderName, setCoFounderName] = useState("");
  const [coFounderLocation, setCoFounderLocation] = useState("");
  const [coFounderPastExperience, setCoFounderPastExperience] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/companies/Profile/Team", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          founderName,
          founderLocation,
          founderPastExperience,
          coFounderName,
          coFounderLocation,
          coFounderPastExperience,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Clear form fields after successful submission
      setFounderName("");
      setFounderLocation("");
      setFounderPastExperience("");
      setCoFounderName("");
      setCoFounderLocation("");
      setCoFounderPastExperience("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Nav_bar />
      <div className="flex flex-1">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6 p-6 flex flex-col space-y-4">
          <ProfileNav />
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg space-y-6"
          >
            <div className="flex space-x-6">
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Founder Name
                </label>
                <input
                  type="text"
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Co-Founder Name
                </label>
                <input
                  type="text"
                  value={coFounderName}
                  onChange={(e) => setCoFounderName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Founder Location
                </label>
                <input
                  type="text"
                  value={founderLocation}
                  onChange={(e) => setFounderLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Co-Founder Location
                </label>
                <input
                  type="text"
                  value={coFounderLocation}
                  onChange={(e) => setCoFounderLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Founder Past Experience
                </label>
                <input
                  type="text"
                  value={founderPastExperience}
                  onChange={(e) => setFounderPastExperience(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Co-Founder Past Experience
                </label>
                <input
                  type="text"
                  value={coFounderPastExperience}
                  onChange={(e) => setCoFounderPastExperience(e.target.value)}
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
