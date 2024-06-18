// CombinedData.js

"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Sidebar from "../../components/side_bar";
import Nav_bar from "../../../companies/components/Nav_Bar";
import ProfileNav from "../../components/ProfileNav";

const OverView = () => {
  const [info, setInfo] = useState(null);
  const [company, setCompany] = useState(null);
  const [team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [jobs, setJobs] = useState([]);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.user) {
        const userId = session.user.userId;
        console.log(session, "session");
        console.log("user", userId);
        try {
          const [infoResponse, companyResponse, teamResponse, jobResponse] =
            await Promise.all([
              fetch(`/api/companies/Profile/Info/${userId}`, { method: "GET" }),
              fetch(`/api/companies/Profile/Company/${userId}`, {
                method: "GET",
              }),
              fetch(`/api/companies/Profile/Team/${userId}`, { method: "GET" }),
              fetch("/api/companies/PostJob", { method: "GET" }),
            ]);

          if (!infoResponse.ok || !companyResponse.ok || !teamResponse.ok) {
            throw new Error("Failed to fetch company data");
          }

          const infoData = await infoResponse.json();
          const companyData = await companyResponse.json();
          const teamData = await teamResponse.json();
          const postData = await jobResponse.json();

          if (infoData && infoData.length > 0) setInfo(infoData[0]);
          if (companyData && companyData.length > 0) setCompany(companyData[0]);
          if (teamData && teamData.length > 0) setTeam(teamData[0]);
          setJobs(postData); // Assuming postData is an array
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [session, status]);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center mt-4">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col mt-6 h-screen">
      <div className="w-full">
        <Nav_bar />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>

        <div className="w-5/6 p-4 overflow-auto">
          <ProfileNav className="" />
          <div className="space-y-4">
            {company ? (
              <div className="p-4">
                <h2 className="text-2xl font-bold mb-2">
                  This is how your profile appears to potential candidates.
                </h2>
                <div className="flex flex-wrap">
                  <div className="w-full sm:w-1/2 mt-1 text-gray-700">
                    <p className="mt-1">
                      <strong>Name:</strong> {company.companyName}
                    </p>
                    <p className="mt-1">
                      <strong>Bio:</strong> {company.bio}
                    </p>
                    <p className="mt-1">
                      <strong>Overview:</strong> {company.overview}
                    </p>
                    <p className="mt-1">
                      <strong>Location:</strong> {info.location}
                    </p>
                    <p className="mt-1">
                      <strong>Website:</strong> {info.website}
                    </p>
                    <p className="mt-1">
                      <strong>Employees:</strong> {info.employees}
                    </p>
                    <p className="mt-1">
                      <strong>Environment:</strong> {company.culture}
                    </p>
                  </div>
                  <div className="w-full sm:w-1/2 mt-1 text-gray-700">
                    <p className="mt-1">
                      <strong>Founder Name:</strong> {team?.founderName}
                    </p>
                    <p className="mt-1">
                      <strong>Founder Location:</strong> {team?.founderLocation}
                    </p>
                    <p className="mt-1">
                      <strong>Founder Past Experience:</strong>{" "}
                      {team?.founderPastExperience}
                    </p>
                    <p className="mt-1">
                      <strong>Co-Founder Name:</strong> {team?.coFounderName}
                    </p>
                    <p className="mt-1">
                      <strong>Co-Founder Location:</strong>{" "}
                      {team?.coFounderLocation}
                    </p>
                    <p className="mt-1">
                      <strong>Co-Founder Past Experience:</strong>{" "}
                      {team?.coFounderPastExperience}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center mt-2 text-gray-700">
                No company data available.
              </div>
            )}
          </div>
          <div>
            {jobs.length > 0 ? (
              <div>
                <h2 className="text-2xl font-bold mb-2">Job Posted</h2>
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
              </div>
            ) : (
              <div className="text-center mt-2 text-gray-700">
                No jobs available.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OverView;
