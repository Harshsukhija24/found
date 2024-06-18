"use client";
import React, { useState, useEffect } from "react";
import Nav_bar from "../components/Nav_Bar";
import Sidebar from "../components/side_bar";
import { useSession } from "next-auth/react";

const Page = () => {
  const [info, setInfo] = useState(null); // State to store info data
  const [company, setCompany] = useState(null); // State to store company data
  const [team, setTeam] = useState(null); // State to store team data
  const [jobDescription, setJobDescription] = useState("");
  const [experienceRequired, setExperienceRequired] = useState("");
  const [jobLink, setJobLink] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [keyResponsibilities, setKeyResponsibilities] = useState("");
  const [qualifications, setQualifications] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      const userId = session?.user?.userId;

      // Fetch company info, company profile, and team data based on user ID
      const [infoResponse, companyResponse, teamResponse] = await Promise.all([
        fetch(`/api/companies/Profile/Info/${userId}`, { method: "GET" }),
        fetch(`/api/companies/Profile/Company/${userId}`, { method: "GET" }),
        fetch(`/api/companies/Profile/Team/${userId}`, { method: "GET" }),
      ]);

      // Check if all responses are OK
      if (!infoResponse.ok || !companyResponse.ok || !teamResponse.ok) {
        throw new Error("Failed to fetch company data");
      }

      // Parse response data
      const infoData = await infoResponse.json();
      const companyData = await companyResponse.json();
      const teamData = await teamResponse.json();

      // Set state with fetched data
      setInfo(infoData);
      setCompany(companyData);
      setTeam(teamData);
    };

    if (status === "authenticated" && session?.user) {
      fetchData();
    }
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare form data
    const formData = {
      userId: session?.user?.userId,
      JobDescription: jobDescription,
      ExperienceRequired: experienceRequired,
      JobLink: jobLink,
      JobLocation: jobLocation,
      SalaryRange: salaryRange,
      KeyResponsibilities: keyResponsibilities,
      Qualifications: qualifications,
      DateofJoining: dateOfJoining,
      info: info,
      company: company,
      team: team,
    };

    // Example of sending the POST request using fetch

    try {
      // Send form data to server for processing
      const response = await fetch("/api/companies/PostJob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      // Check if the request was successful
      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Clear form fields on successful submission
      setJobDescription("");
      setExperienceRequired("");
      setJobLink("");
      setJobLocation("");
      setSalaryRange("");
      setKeyResponsibilities("");
      setQualifications("");
      setDateOfJoining("");

      console.log("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="flex flex-col mt-6 h-screen">
      <div className="w-full">
        <Nav_bar />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>

        <main className="w-5/6 p-6 flex flex-col mt-8 space-y-4">
          <div className="flex flex-1 space-x-6">
            {/* Left Section for Company Details */}

            {/* Right Section for Job Submission Form */}
            <div className="w-4/5">
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
                      required
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
                      required
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
                      required
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
                      required
                    />
                  </div>
                  <div className="flex flex-col">
                    <label className="block text-gray-700 font-bold mb-1">
                      Salary Range
                    </label>
                    <input
                      type="text"
                      value={salaryRange}
                      onChange={(e) => setSalaryRange(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md"
                      placeholder="Salary Range"
                      required
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
                      required
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
                      required
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
                      required
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
        </main>
      </div>
    </div>
  );
};

export default Page;
