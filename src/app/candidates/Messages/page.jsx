"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Nav_bar from "../../components/Nav";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const CandidateMessagePage = () => {
  const [jobDetails, setJobDetails] = useState([]);
  const [error, setError] = useState(null);
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.userId;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/Messages"); // Replace with your actual API endpoint
        if (!response.ok) {
          throw new Error(
            `Failed to fetch job details: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Fetched job details:", data); // Log fetched data
        setJobDetails(data); // Store job details in state
      } catch (error) {
        console.error("Error fetching job details:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col mt-6 h-screen">
      <div className="w-full">
        <Nav_bar />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>
        <div className="w-5/6 p-4   mt-11 overflow-auto">
          <h1 className="text-2xl font-bold mb-4">Job Details</h1>
          {error && <p className="text-red-500">Error: {error}</p>}
          {jobDetails.length === 0 ? (
            <p className="text-gray-500">Loading...</p>
          ) : (
            jobDetails.map((jobDetail, index) => (
              <div
                key={index}
                onClick={() =>
                  router.push(
                    `/candidates/Messages/${jobDetail.userData.skuId}`
                  )
                }
                className="cursor-pointer bg-white p-4 shadow rounded-lg mb-4"
              >
                <p className="text-lg font-semibold">
                  Company Name:{" "}
                  {jobDetail.summaryData.companyData.company[0]?.companyName ||
                    "N/A"}
                </p>
                <p className="text-lg font-semibold">
                  Job Description:{" "}
                  {jobDetail.summaryData.companyData.JobDescription || "N/A"}
                </p>
                <p className="text-lg font-semibold">
                  Key Responsibilities:{" "}
                  {jobDetail.summaryData.companyData.KeyResponsibilities ||
                    "N/A"}
                </p>
                {/* Add additional fields as needed */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateMessagePage;
