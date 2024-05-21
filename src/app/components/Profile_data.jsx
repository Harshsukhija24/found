"use client";
import React, { useEffect, useState } from "react";

const Profiles = () => {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const response = await fetch("/api/Profile/Profile");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setProfiles(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfiles();
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
      <h1 className="text-3xl font-bold mb-6">Profiles</h1>
      <ul className="space-y-4">
        {profiles.map((profile) => (
          <li key={profile._id} className="p-4 border rounded-lg shadow">
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="mt-2">{profile.bio}</p>
            <p className="mt-2">
              <strong>Education:</strong> {profile.education}
            </p>
            <p className="mt-2">
              <strong>Skills:</strong> {profile.skills}
            </p>
            <p className="mt-2">
              <strong>Role:</strong> {profile.role}
            </p>
            <a
              href={profile.github}
              className="text-blue-500 hover:underline mt-2 block"
            >
              GitHub
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profiles;
