// CultureData.js
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const CultureData = ({ params: userId }) => {
  const [company, setCompany] = useState(null);
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
            `/api/companies/Profile/Company/${userId}`,
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
            setCompany(data[0]);
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
    <div className=" mx-auto p-4">
      {company ? (
        <div className="p-6 ">
          <h2 className="text-3xl font-bold mb-4">
            <strong>Name:</strong>
            {company.companyName}
          </h2>
          <p className="mt-2 text-gray-700">
            <strong>Motivate:</strong> {company.bio}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Future:</strong> {company.overview}
          </p>
          <p className="mt-2 text-gray-700">
            <strong>Environment:</strong> {company.culture}
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

export default CultureData;
