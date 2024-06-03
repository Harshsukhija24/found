"use client";
import React, { useState, useEffect } from "react";
import Nav from "../../../components/Nav";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";

const Page = ({ params: { skuId } }) => {
  const [companyData, setCompanyData] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/candidates/Job/${skuId}`);

        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }

        const jsonData = await response.json();
        console.log("Fetched data:", jsonData);

        if (Array.isArray(jsonData) && jsonData.length > 0) {
          setCompanyData(jsonData[0]);
        } else if (jsonData && typeof jsonData === "object") {
          setCompanyData(jsonData);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [skuId]);

  const handleCoverLetterChange = (e) => {
    setCoverLetter(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const applicationData = {
      skuId,
      company_name: companyData?.company_name || "",
      bio: companyData?.bio || "",
      description: companyData?.description || "",
      location: companyData?.location || "",
      salary: companyData?.salary || "",
      coverLetter,
    };

    try {
      const response = await fetch("/api/candidates/AppliedData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(applicationData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit application");
      }

      const result = await response.json();
      console.log(result);
      console.log(result.message);
    } catch (error) {
      console.error("Error submitting application:", error);
    }
  };

  return (
    <div className="min-h-screen ">
      <div className="bg-white shadow">
        <Nav />
      </div>
      <div className="flex">
        <div className="w-1/4 lg:w-1/6 m-3">
          <Sidebar />
        </div>
        <div className="flex-grow  mt-16  p-8">
          <div className="text-2xl font-bold mb-4">Company Info</div>
          <div className="flex mb-8 bg-white rounded p-4">
            <div className="w-1/2">
              {companyData ? (
                <>
                  <h1 className="text-2xl font-bold mb-2">
                    {companyData.company_name}
                  </h1>
                  <h2>{companyData.bio}</h2>
                  <h2 className="">{companyData.description}</h2>
                  <p className="text-gray-700 mb-2">{companyData.location}</p>
                  <p className="text-gray-700 mb-2">{companyData.salary}</p>
                </>
              ) : (
                <p className="text-black">No details available</p>
              )}
            </div>
            <div className="w-1/2   ">
              <h1 className="text-white bg-black w-auto h-1/5 p-6 rounded-xl flex justify-center">
                Apply to{" "}
                {companyData ? companyData.company_name : <span>wait</span>}
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
              <form className="" onSubmit={handleSubmit}>
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
