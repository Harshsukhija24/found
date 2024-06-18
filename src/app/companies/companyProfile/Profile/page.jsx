"use client";

import React, { useState, useEffect } from "react";
import Nav_bar from "../../components/Nav_Bar";
import Sidebar from "../../components/side_bar";
import ProfileNav from "../../components/ProfileNav";
import { useSession } from "next-auth/react";

const Page = ({ params: { userId } }) => {
  const [companyName, setCompanyName] = useState("");
  const [bio, setBio] = useState("");
  const [overview, setOverview] = useState("");
  const [culture, setCulture] = useState("");
  const [benefit, setBenefit] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false); // Flag for update mode

  const { data: session, status } = useSession();

  useEffect(() => {
    if (!session) return;

    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/companies/Profile/Company/${session.user.userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.length > 0) {
          const companyData = data[0];
          setCompanyName(companyData.companyName);
          setBio(companyData.bio);
          setOverview(companyData.overview);
          setCulture(companyData.culture);
          setBenefit(companyData.benefit);
          setIsUpdate(true); // Set update flag if data exists
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !session.user) {
      console.error("User session is not available");
      return;
    }

    const userId = session.user.userId;
    const companyData = {
      userId,
      companyName,
      bio,
      overview,
      culture,
      benefit,
    };

    try {
      const response = await fetch("/api/companies/Profile/Company", {
        method: isUpdate ? "PUT" : "POST", // Use PUT for updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(companyData),
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
    } catch (err) {
      console.error("Error:", err);
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
        <div className="w-5/6 p-4 overflow-auto">
          <ProfileNav />
          <form
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded-lg space-y-6"
          >
            <div className="flex flex-col space-y-6">
              <div className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0">
                <div className="flex flex-col w-full">
                  <label className="block text-gray-700 font-bold mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    placeholder="Company Name"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Bio
                </label>
                <input
                  type="text"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Bio"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Overview
                </label>
                <textarea
                  value={overview}
                  onChange={(e) => setOverview(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Overview"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Culture
                </label>
                <textarea
                  value={culture}
                  onChange={(e) => setCulture(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Culture"
                />
              </div>
              <div className="flex flex-col">
                <label className="block text-gray-700 font-bold mb-1">
                  Benefits
                </label>
                <textarea
                  value={benefit}
                  onChange={(e) => setBenefit(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Benefits"
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
