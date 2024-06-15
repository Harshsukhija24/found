// CultureData.js
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const TeamData = ({ params: userId }) => {
  const [Team, setTeam] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchCulture = async () => {
      if (status === "authenticated" && session?.user) {
        const userId = session.user.userId;
        console.log(session, "session");
        console.log("user", userId);
        try {
          const response = await fetch(
            `/api/companies/Profile/Team/${userId}`,
            {
              method: "GET",
            }
          );

          if (!response.ok) {
            throw new Error(
              `Failed to fetch company data: ${response.statusText}`
            );
          }
          const data = await response.json();
          if (data && data.length > 0) {
            setTeam(data[0]);
          } else {
            throw new Error("Empty response or invalid data format");
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchCulture();
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-500 text-center mt-4">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {Team ? (
        <div className="p-6 bg-white shadow-md rounded-lg">
          <h2 className="text-3xl font-bold mb-4"></h2>
          <p className="mt-2 text-gray-700">
            <strong>founderName:</strong>
            {Team.founderName}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>founderLocation:</strong>
            {Team.founderLocation}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>FounderPastExperience:</strong>
            {Team.founderPastExperience}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>cofounderName:</strong>
            {Team.coFounderName}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>cofounderLocation:</strong>
            {Team.coFounderLocation}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>coFounderPastExperience:</strong>
            {Team.coFounderPastExperience}
          </p>
        </div>
      ) : (
        <div className="text-center mt-4 text-gray-700">
          No culture data available.
        </div>
      )}
    </div>
  );
};

export default TeamData;
