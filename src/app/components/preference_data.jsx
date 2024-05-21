"use client";
import React, { useEffect, useState } from "react";

const PreferencesData = () => {
  const [preferences, setPreferences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPreferences = async () => {
      try {
        const response = await fetch("/api/Profile/Preferences");
        if (!response.ok) {
          throw new Error("API not working");
        }
        const data = await response.json();
        setPreferences(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPreferences();
  }, []);

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
      <h1 className="text-3xl font-bold mb-6">Preferences</h1>
      <ul className="space-y-4">
        {preferences.map((item) => (
          <li key={item._id} className="p-4 border rounded-lg shadow">
            <h2 className="text-2xl font-semibold">Preferences</h2>

            <p className="mt-2">
              <strong>Job Type:</strong> {item.jobtype}
            </p>
            <p className="mt-2">
              <strong>Open to Job Types:</strong> {item.openToJobTypes}
            </p>
            <p className="mt-2">
              <strong>Desired Locations:</strong> {item.desiredLocations}
            </p>

            <p className="mt-2">
              <strong>Desired Salary:</strong> {item.desiredSalary}
            </p>
            <p className="mt-2">
              <strong>Company Sizes:</strong> {item.companySizes}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreferencesData;
