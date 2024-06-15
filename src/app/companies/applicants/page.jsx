"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../components/side_bar"; // Adjusted import
import Nav from "../components/Nav_Bar"; // Adjusted import
import { useRouter } from "next/navigation";

const Page = () => {
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/candidates/Summary");
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Fetched userData:", data); // Log fetched data
        if (data.length > 0) {
          setUserData(data[0]); // Assuming there's only one item in the array
        } else {
          throw new Error("No data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleClick = (skuId) => {
    router.push(`/companies/applicants/${skuId}`);
  };

  if (error) {
    console.log("Detailed Error:", error);
    return <p>Error: {error}</p>;
  }

  if (!userData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex">
      <Sidebar />
      <Nav />
      <div className="flex-1 mt-24 ml-56 ">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <ul>
            {userData.profile && userData.profile.length > 0 ? (
              userData.profile.map((item, index) => (
                <li key={index} onClick={() => handleClick(userData.skuId)}>
                  <strong>Name:</strong> {item.name}
                  <br />
                  <strong>Bio:</strong> {item.bio}
                  <br />
                  <strong>Skills:</strong> {item.skills}
                  <br />
                  <p>
                    <strong>Cover Letter:</strong>{" "}
                    {userData.coverLetter || "Not provided"}
                  </p>
                </li>
              ))
            ) : (
              <li>No profile data available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
