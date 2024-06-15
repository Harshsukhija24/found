// Profiles.js
"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const Profiles = ({ params: userId }) => {
  const { data: session, status } = useSession();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (status === "authenticated" && session?.user) {
        const userId = session.user.userId;
        try {
          const response = await fetch(`/api/Profile/Profile/${userId}`);
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await response.json();
          if (data.length > 0) {
            setProfile(data[0]);
          } else {
            setProfile(null);
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [status, session]);

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

  if (!profile) {
    return <div>No profile found</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 ">
        <h2 className="text-2xl font-semibold">
          <strong>Name:</strong> {profile.name}
        </h2>
        <p className="mt-2">
          <strong>Bio:</strong> {profile.bio}
        </p>
        <p className="mt-2">
          <strong>Education:</strong> {profile.education}
        </p>
        <p className="mt-2">
          <strong>Skills:</strong> {profile.skills}
        </p>
        <p className="mt-2">
          <strong>Role:</strong> {profile.role}
        </p>
        {profile.github && (
          <a
            href={profile.github}
            className="text-blue-500 hover:underline mt-2 block"
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default Profiles;
