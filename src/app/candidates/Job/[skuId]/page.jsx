"use client";
import React, { useState, useEffect } from "react";
import Nav from "../../../components/Nav";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useSession } from "next-auth/react";

const Page = ({ params: { skuId } }) => {
  const [companyData, setCompanyData] = useState(null);
  const [profile, setProfile] = useState(null);
  const [preference, setPreference] = useState(null);
  const [culture, setCulture] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");
  const { data: session, status } = useSession();
  const userId = session?.user?.userId;

  useEffect(() => {
    if (!session) return;

    const fetchCompanyData = async () => {
      try {
        const response = await fetch(`/api/candidates/Job/${skuId}`);
        if (!response.ok)
          throw new Error(
            `Failed to fetch company data: ${response.statusText}`
          );
        const data = await response.json();
        setCompanyData(Array.isArray(data) ? data[0] : data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };

    const fetchProfileData = async () => {
      try {
        const response = await fetch(`/api/Profile/Profile/${userId}`); // Corrected URL
        if (!response.ok)
          throw new Error(
            `Failed to fetch profile data: ${response.statusText}`
          );
        const data = await response.json();
        setProfile(data);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    const fetchPreferenceData = async () => {
      try {
        const response = await fetch(`/api/Profile/Preferences/${userId}`);
        if (!response.ok)
          throw new Error(
            `Failed to fetch preference data: ${response.statusText}`
          );
        const data = await response.json();
        setPreference(data);
      } catch (error) {
        console.error("Error fetching preference data:", error);
      }
    };

    const fetchCultureData = async () => {
      try {
        const response = await fetch(`/api/Profile/Culture/${userId}`);
        if (!response.ok)
          throw new Error(
            `Failed to fetch culture data: ${response.statusText}`
          );
        const data = await response.json();
        setCulture(data);
      } catch (error) {
        console.error("Error fetching culture data:", error);
      }
    };

    fetchCompanyData();
    fetchProfileData();
    fetchPreferenceData();
    fetchCultureData();
  }, [skuId, session, userId]);

  const handleCoverLetterChange = (e) => setCoverLetter(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!companyData || !companyData.company) {
      console.error("Company data not available.");
      return;
    }

    const applicationData = {
      userId: session.user.userId,
      skuId,
      coverLetter,
      companyData,
    };

    const summaryData = {
      skuId,
      coverLetter,
      companyId: companyData.userId,

      profile,
      preference,
      culture,
    };

    try {
      const response = await fetch("/api/candidates/AppliedData", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) throw new Error("Failed to submit application");

      const result = await response.json();
      console.log(result.message);

      const summaryResponse = await fetch("/api/candidates/Summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(summaryData),
      });

      if (!summaryResponse.ok) throw new Error("Failed to submit summary");

      const summaryResult = await summaryResponse.json();
      console.log(summaryResult.message);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  if (status === "loading") return <div>Loading...</div>;
  if (!session || !session.user) return <div>No user session found</div>;

  return (
    <div className="min-h-screen">
      <div className="bg-white shadow">
        <Nav />
      </div>
      <div className="flex">
        <div className="w-1/4 lg:w-1/6 m-3">
          <Sidebar />
        </div>
        <div className="flex-grow ml-16 mt-16 p-8">
          <div className="text-2xl font-bold mb-4">Company Info</div>
          <div className="flex mb-8 bg-white rounded p-4">
            <div className="w-1/2">
              {companyData ? (
                <>
                  {companyData.company.map((item, index) => (
                    <div key={index} className="p-4 mb-2">
                      <p className="mb-1">
                        <span className="font-semibold">Company Name:</span>{" "}
                        {item.companyName}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Bio:</span> {item.bio}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Overview:</span>{" "}
                        {item.overview}
                      </p>
                    </div>
                  ))}
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {companyData.JobDescription}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Location:</span>{" "}
                    {companyData.JobLocation}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Salary:</span>{" "}
                    {companyData.SalaryRange}
                  </p>
                </>
              ) : (
                <p className="text-black">No details available</p>
              )}
            </div>
            <div className="w-1/2">
              <h1 className="text-white bg-black w-auto h-1/5 p-6 rounded-xl flex justify-center">
                Apply to {companyData ? companyData.company_name : "wait"}
              </h1>
              <h3 className="mt-4">
                Is your profile up to date? Click here to{" "}
                <Link
                  className="text-blue-600"
                  href="/candidates/Profile/Overview"
                >
                  verify
                </Link>{" "}
                how you will appear to recruiters.
              </h3>
              <form onSubmit={handleSubmit}>
                <label
                  className="block text-gray-700 text-sm font-bold mt-4"
                  htmlFor="cover-letter"
                >
                  Cover Letter
                </label>
                <textarea
                  id="cover-letter"
                  className="w-full h-32 p-2 border rounded mb-4"
                  value={coverLetter}
                  onChange={handleCoverLetterChange}
                  aria-label="Cover Letter"
                />
                <button
                  type="submit"
                  className="bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
