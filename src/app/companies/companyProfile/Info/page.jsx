"use client";

import React, { useState, useEffect } from "react";
import Nav_bar from "../../components/Nav_Bar";
import Sidebar from "../../components/SidebarCompany";
import ProfileNav from "../../components/ProfileNav";
import { useSession } from "next-auth/react";

const Page = () => {
  const [founded, setFounded] = useState("");
  const [location, setLocation] = useState("");
  const [website, setWebsite] = useState("");
  const [employees, setEmployees] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false); // State for showing success message
  const { data: session, status } = useSession();
  const [isUpdate, setIsUpdate] = useState(false); // Flag for update mode
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
          setIsUpdate(true); // Set update flag if data exists
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
      const response = await fetch("/api/companies/Profile/Info", {
        method: isUpdate ? "PUT" : "POST", // Use PUT for updates and POST for new entries
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
        throw new Error(
          isUpdate ? "Failed to update form" : "Failed to submit form"
        );
      }

      console.log(
        isUpdate ? "Form updated successfully" : "Form submitted successfully"
      );

      setIsPopupVisible(true);
      setTimeout(() => setIsPopupVisible(false), 3000); // Hide popup after 3 seconds
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!session || !session.user) {
    return <div>No user session found</div>;
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
                  Founded in which year
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
            <div className="fixed bottom-4 right-4 bg-green-500 text-white p-4 rounded-md shadow-lg">
              Data saved successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
