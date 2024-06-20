// pages/Page.js
"use client";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import Sidebar from "@/app/components/Sidebar";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedContentIndex } from "../../redux/contentSlice";
import { useSession } from "next-auth/react";

const Page = () => {
  const selectedContentIndex = useSelector(
    (state) => state.content.selectedContentIndex
  );
  const contents = useSelector((state) => state.content.contents);
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { data: session, status } = useSession();
  const userId = session?.user?.userId;

  const handleSelectChange = (e) => {
    const newIndex = parseInt(e.target.value);
    dispatch(setSelectedContentIndex(newIndex));
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([
          fetchProfileData(),
          fetchRecommendedJobs(),
          fetchAppliedJobs(),
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchProfileData = async () => {
    if (status === "authenticated" && session?.user) {
      const userId = session.user.userId;
      try {
        const response = await fetch(`/api/Profile/Profile/{userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        console.log("Profile Data:", data); // Log the data received from the API
        if (data.length > 0) {
          setName(data[0].name); // Assuming 'name' is a property of the object
        } else {
          setName(null);
        }
      } catch (err) {
        console.error("Profile Error:", err);
        setName(null); // Set name to null on error
      }
    }
  };

  const fetchRecommendedJobs = async () => {
    try {
      const response = await fetch("/api/candidates/AppliedData");
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const jsonData = await response.json();
      console.log("Recommended Jobs Data:", jsonData); // Log the recommended jobs data

      setRecommendedJobs(jsonData.slice(0, 4));
    } catch (error) {
      console.error("Error fetching recommended jobs:", error);
    }
  };

  const fetchAppliedJobs = async () => {
    try {
      const response = await fetch("/api/candidates/Applied");
      if (!response.ok) {
        throw new Error("Failed to fetch applied jobs data");
      }
      const jsonData = await response.json();
      console.log("Applied Jobs Data:", jsonData); // Log the applied jobs data
      setAppliedJobs(jsonData.slice(0, 4)); // Slice to show only 4 applied jobs
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-5">
      <div className="col-span-12">
        <Nav />
      </div>
      <div className="col-span-2 m-2 p-4  text-white h-screen">
        <Sidebar />
      </div>
      <div className="col-span-10 p-5 mt-9 grid gap-5">
        <div className="p-4 border border-black">
          <h1 className="text-xl font-bold mb-3">Profile</h1>
          <p>Name: {typeof name === "string" ? name : "Name not available"}</p>

          <h2>
            Where are you in your job search?
            <br /> Keep your job status up-to-date to inform employers of your
            search.
          </h2>
          <form>
            <select
              value={selectedContentIndex}
              className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
              onChange={handleSelectChange}
            >
              {contents.map((content, index) => (
                <option key={index} value={index}>
                  {content}
                </option>
              ))}
            </select>
          </form>
        </div>

        <div className="p-4 border border-black">
          <h2 className="text-lg font-semibold mb-3">Recommended Jobs</h2>
          {recommendedJobs.length > 0 ? (
            recommendedJobs.map((company, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg p-6 mb-6"
              >
                {company.company.map((item, skuId) => (
                  <div key={skuId} className="">
                    <p className="mb-1">
                      <span className="font-semibold">Company Name:</span>{" "}
                      {item.companyName}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Bio:</span> {item.bio}
                    </p>
                    <h3 className="text-lg font-semibold mb-2">Jobs:</h3>
                    <p className="mb-1">
                      <span className="font-semibold">Job Description:</span>{" "}
                      {company.JobDescription}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Salary:</span>{" "}
                      {company.SalaryRange}
                    </p>
                    <p className="mb-1">
                      <span className="font-semibold">Location:</span>{" "}
                      {company.JobLocation}
                    </p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">No data available.</p>
          )}
          <Link href="/candidates/Job">
            <button className="mb-2 w-full border border-black text-black p-2">
              More Companies
            </button>
          </Link>
        </div>

        <div className="p-4 border border-black">
          <h2 className="text-lg font-semibold mb-3">Applied Jobs</h2>
          {appliedJobs.length > 0 ? (
            appliedJobs.map((applied_company, index) => (
              <div key={index} className="mb-2 border border-black p-2">
                <h3 className="text-lg font-semibold">
                  {applied_company.company_name ||
                    (applied_company.companyData?.company[0]?.companyName ??
                      "Company Name Not Available")}
                </h3>
                <p>
                  Location:{" "}
                  {applied_company.location ||
                    (applied_company.companyData?.JobLocation ??
                      "Location Not Available")}
                </p>
                <p>
                  Salary:{" "}
                  {applied_company.salary ||
                    (applied_company.companyData?.SalaryRange ??
                      "Salary Not Available")}
                </p>
                <p>
                  {applied_company.bio ||
                    (applied_company.companyData?.company[0]?.bio ??
                      "Bio Not Available")}
                </p>
              </div>
            ))
          ) : (
            <div className="p-4 border border-black">
              <p>No applied jobs available</p>
            </div>
          )}
          <Link href="/candidates/Applied">
            <button className="mt-3 w-full border border-black text-black py-2">
              More Applied Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
