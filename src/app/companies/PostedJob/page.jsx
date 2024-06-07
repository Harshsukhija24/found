"use client";
import React, { useEffect, useState } from "react";
import Nav_bar from "../components/Nav_Bar";
import Sidebar from "../components/side_bar";

const Page = () => {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/companies/PostJob", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Nav_bar />
      <div className="flex flex-1">
        <div className="w-1/6">
          <Sidebar />
        </div>
        <div className="w-5/6 p-6 flex flex-col mt-8 space-y-4">
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job.skuId}
                  className="bg-white p-6 rounded-lg shadow-md space-y-4"
                >
                  <h2 className="text-xl font-bold text-gray-800">
                    {job.JobDescription}
                  </h2>
                  <p className="text-gray-600">
                    <strong>Experience Required:</strong>{" "}
                    {job.ExperienceRequired}
                  </p>
                  <p className="text-gray-600">
                    <strong>Job Link:</strong> {job.JobLink}
                  </p>
                  <p className="text-gray-600">
                    <strong>Location:</strong> {job.JobLocation}
                  </p>
                  <p className="text-gray-600">
                    <strong>Salary Range:</strong> {job.SalaryRange}
                  </p>
                  <p className="text-gray-600">
                    <strong>Key Responsibilities:</strong>{" "}
                    {job.KeyResponsibilities}
                  </p>
                  <p className="text-gray-600">
                    <strong>Qualifications:</strong> {job.Qualifications}
                  </p>
                  <p className="text-gray-600">
                    <strong>Date of Joining:</strong> {job.DateofJoining}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              No job postings available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
