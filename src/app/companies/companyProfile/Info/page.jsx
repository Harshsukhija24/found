"use client";

import React, { useState, useEffect } from "react";
import Nav_bar from "../../components/Nav_Bar";
import Sidebar from "../../components/side_bar";
import ProfileNav from "../../components/ProfileNav";
import { useSession } from "next-auth/react";

const Page = () => {
  const [founded, setFounded] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [employees, setEmployees] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for showing success message
  const { data: session, status } = useSession();
  const [profileData, setProfileData] = useState({});
  const userId = session?.user?.userId;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/companies/Profile/Info/${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data) {
          const profile = data[0]; // Assuming the response is an array with one object
          setFounded(profile.founded || "");
          setLocation(profile.location || "");
          setWebsite(profile.website || "");
          setEmployees(profile.employees || "");
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      console.log("Unauthorized");
      return;
    }

    try {
      // POST request to save new data or update existing data
      const response = await fetch("/api/companies/Profile/Info", {
        method: "POST", // Use POST to create new data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          founded,
          location,
          website,
          employees,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      // Assuming you handle updates with a PUT request
      const putResponse = await fetch("/api/companies/Profile/Info", {
        method: "PUT", // Use PUT to update existing data
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          founded,
          location,
          website,
          employees,
        }),
      });

      if (!putResponse.ok) {
        throw new Error("Failed to update form");
      }

      console.log("Form updated successfully");

      setIsPopupVisible(true);
      setTimeout(() => setIsPopupVisible(false), 3000); // Hide popup after 3 seconds
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return <div>No user session found</div>;
  }

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
                <div className="flex flex-col w-full"></div>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Founded
                </label>
                <input
                  type="text"
                  value={founded}
                  onChange={(e) => setFounded(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Founded"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Location"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Website
                </label>
                <input
                  type="text"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Website"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Employees
                </label>
                <input
                  type="text"
                  value={employees}
                  onChange={(e) => setEmployees(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Employees"
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
          {isPopupVisible && (
            <div className="bg-green-200 border border-green-600 text-green-800 px-4 py-3 rounded relative">
              Form updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
