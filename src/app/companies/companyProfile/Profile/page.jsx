"use client";

import React, { useState } from "react";
import Nav_bar from "../../components/Nav_Bar";
import Sidebar from "../../components/side_bar";
import ProfileNav from "../../components/ProfileNav";

const Page = () => {
  const [companyName, setCompanyName] = useState("");
  const [bio, setBio] = useState("");
  const [overview, setOverview] = useState("");
  const [culture, setCulture] = useState("");
  const [benefit, setBenefit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/companies/Profile/Company", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          companyName,
          bio,
          overview,
          culture,
          benefit,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Clear form fields after successful submission
      setCompanyName("");
      setBio("");
      setOverview("");
      setCulture("");
      setBenefit("");
    } catch (err) {
      console.error("Error:", err);
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
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                <div className="flex flex-col w-full">
                  <label className="block text-gray-700 font-bold mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Company Name"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Bio
                </label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Bio"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Overview
                </label>
                <textarea
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Overview"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Culture
                </label>
                <textarea
                  value={culture}
                  onChange={(e) => setCulture(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Culture"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Benefits
                </label>
                <textarea
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Benefits"
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
