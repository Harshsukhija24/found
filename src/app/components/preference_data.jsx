// PreferencesData.js
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PreferencesData = ({ params: userID }) => {
  const [preferences, setPreferences] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchPreferences = async () => {
      if (status === "authenticated" && session?.user) {
        const userId = session.user.userId;
        try {
          const response = await fetch(`/api/Profile/Preferences/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch preferences");
          }
          const data = await response.json();
          if (data.length > 0) {
            setPreferences(data[0]);
          } else {
            setPreferences(null);
          }
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchPreferences();
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-16 w-16"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  if (!preferences) {
    return <div className="text-center mt-4">No preferences set yet.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 ">
        <h2 className="text-2xl font-semibold">Preferences</h2>
        <p className="mt-2">
          <strong>Job Type:</strong> {preferences.jobtype}
        </p>
        <p className="mt-2">
          <strong>Open to Job Types:</strong> {preferences.openToJobTypes}
        </p>
        <p className="mt-2">
          <strong>Desired Locations:</strong> {preferences.desiredLocations}
        </p>
        <p className="mt-2">
          <strong>Desired Salary:</strong> {preferences.desiredSalary}
        </p>
        <p className="mt-2">
          <strong>Company Sizes:</strong> {preferences.companySizes}
        </p>
      </div>
    </div>
  );
};

export default PreferencesData;
