// CultureData.js
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const CultureData = ({ params: userId }) => {
  const [culture, setCulture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchCulture = async () => {
      if (status === "authenticated" && session?.user) {
        const userId = session.user.userId;
        try {
          const response = await fetch(`/api/Profile/Culture/${userId}`);
          if (!response.ok) {
            throw new Error("API not working");
          }
          const data = await response.json();
          if (data.length > 0) {
            setCulture(data[0]);
          } else {
            setCulture(null);
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
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {culture ? (
        <div className="p-4 ">
          <h2 className="text-2xl font-semibold">{culture.nextJob}</h2>
          <p className="mt-2">
            <strong>Motivate:</strong> {culture.motivate}
          </p>
          <p className="mt-2">
            <strong>Future:</strong> {culture.future}
          </p>
          <p className="mt-2">
            <strong>Environment:</strong> {culture.environment}
          </p>
        </div>
      ) : (
        <div className="text-center mt-4">No culture data available.</div>
      )}
    </div>
  );
};

export default CultureData;
