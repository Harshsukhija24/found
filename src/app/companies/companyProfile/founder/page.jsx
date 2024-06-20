"use client";

import React, { useState, useEffect } from "react";
import Nav_bar from "../../components/Nav_Bar";
import Sidebar from "../../components/side_bar";
import ProfileNav from "../../components/ProfileNav";
import { useSession } from "next-auth/react";

const Profile = () => {
  const [founderName, setFounderName] = useState("");
  const [founderLocation, setFounderLocation] = useState("");
  const [founderPastExperience, setFounderPastExperience] = useState("");
  const [coFounderName, setCoFounderName] = useState("");
  const [coFounderLocation, setCoFounderLocation] = useState("");
  const [coFounderPastExperience, setCoFounderPastExperience] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isExistingProfile, setIsExistingProfile] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `/api/companies/Profile/Team/${session.user.userId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch profile data");
        }
        const data = await response.json();
        console.log("Fetched data:", data);

        if (data.length > 0) {
          const profile = data[0];
          setFounderName(profile.founderName || "");
          setFounderLocation(profile.founderLocation || "");
          setFounderPastExperience(profile.founderPastExperience || "");
          setCoFounderName(profile.coFounderName || "");
          setCoFounderLocation(profile.coFounderLocation || "");
          setCoFounderPastExperience(profile.coFounderPastExperience || "");
          setIsExistingProfile(true);
        } else {
          setIsExistingProfile(false);
        }
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };

    if (session) {
      fetchData();
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = isExistingProfile ? "PUT" : "POST";
      const response = await fetch("/api/companies/Profile/Team", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user.userId,
          founderName,
          founderLocation,
          founderPastExperience,
          coFounderName,
          coFounderLocation,
          coFounderPastExperience,
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${method === "POST" ? "submit" : "update"} form`
        );
      }

      console.log(
        `Form ${method === "POST" ? "submitted" : "updated"} successfully`
      );

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
            <div className="flex space-x-6">
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Founder Name
                </label>
                <input
                  type="text"
                  value={founderName}
                  onChange={(e) => setFounderName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Co-Founder Name
                </label>
                <input
                  type="text"
                  value={coFounderName}
                  onChange={(e) => setCoFounderName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Founder Location
                </label>
                <input
                  type="text"
                  value={founderLocation}
                  onChange={(e) => setFounderLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Co-Founder Location
                </label>
                <input
                  type="text"
                  value={coFounderLocation}
                  onChange={(e) => setCoFounderLocation(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex space-x-6">
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Founder Past Experience
                </label>
                <input
                  type="text"
                  value={founderPastExperience}
                  onChange={(e) => setFounderPastExperience(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label className="block text-gray-700 font-bold mb-1">
                  Co-Founder Past Experience
                </label>
                <input
                  type="text"
                  value={coFounderPastExperience}
                  onChange={(e) => setCoFounderPastExperience(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
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

export default Profile;
