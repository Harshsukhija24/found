"use client";
import Sidebar from "@/app/components/Sidebar";
import Nav from "../../../components/Nav";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Nav_Home from "@/app/components/Nav_Home";
import Resume_data from "@/app/components/Resume_data";

const UserProfile = () => {
  const { data: session, status } = useSession();

  const [profile, setProfile] = useState(null);
  const [preferences, setPreferences] = useState(null);
  const [culture, setCulture] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.user) {
        const userId = session.user.userId;
        try {
          // Fetch profile data
          const profileResponse = await fetch(`/api/Profile/Profile/${userId}`);
          if (!profileResponse.ok) {
            if (profileResponse.status === 404) {
              throw new Error("Profile not found");
            } else {
              throw new Error(
                `Failed to fetch profile (${profileResponse.status})`
              );
            }
          }
          const profileData = await profileResponse.json();
          setProfile(profileData.length > 0 ? profileData[0] : null);

          // Fetch preferences data
          const preferencesResponse = await fetch(
            `/api/Profile/Preferences/${userId}`
          );
          if (!preferencesResponse.ok) {
            throw new Error(
              `Failed to fetch preferences (${preferencesResponse.status})`
            );
          }
          const preferencesData = await preferencesResponse.json();
          setPreferences(
            preferencesData.length > 0 ? preferencesData[0] : null
          );

          // Fetch culture data
          const cultureResponse = await fetch(`/api/Profile/Culture/${userId}`);
          if (!cultureResponse.ok) {
            throw new Error(
              `Failed to fetch culture (${cultureResponse.status})`
            );
          }
          const cultureData = await cultureResponse.json();
          setCulture(cultureData.length > 0 ? cultureData[0] : null);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [session, status]);

  if (loading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col mt-6 h-screen">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>
        <main className="w-5/6 p-4  overflow-auto">
          <Nav_Home />
          <div className="mt-10">
            {error ? (
              <div className="text-red-500 text-center mt-4">
                Error: {error}
              </div>
            ) : (
              <>
                <div className="p-4 bg-white rounded shadow-md">
                  <h2 className="text-2xl font-bold mb-4">
                    This is how your profile will be shown to recruiters
                  </h2>
                  {profile ? (
                    <div className="border-b-2 border-black">
                      <p>
                        <strong>Name:</strong> {profile.name || "No name"}
                      </p>
                      <p>
                        <strong>Bio:</strong> {profile.bio || "No bio"}
                      </p>
                      <p>
                        <strong>Education:</strong>{" "}
                        {profile.education || "No education"}
                      </p>
                      <p>
                        <strong>Skills:</strong> {profile.skills || "No skills"}
                      </p>
                      <p>
                        <strong>Role:</strong> {profile.role || "No role"}
                      </p>
                      {profile.github && (
                        <p>
                          <strong>GitHub:</strong> {profile.github}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">Profile not found.</div>
                  )}
                </div>
                <div className="p-4 border-b-2 border-black bg-white rounded shadow-md">
                  {preferences ? (
                    <>
                      <p>
                        <strong>Job Type:</strong> {preferences.jobtype}
                      </p>
                      <p>
                        <strong>Open to Job Types:</strong>{" "}
                        {preferences.openToJobTypes}
                      </p>
                      <p>
                        <strong>Desired Locations:</strong>{" "}
                        {preferences.desiredLocations}
                      </p>
                      <p>
                        <strong>Desired Salary:</strong>{" "}
                        {preferences.desiredSalary}
                      </p>
                      <p>
                        <strong>Company Sizes:</strong>{" "}
                        {preferences.companySizes}
                      </p>
                    </>
                  ) : (
                    <div className="text-center">No preferences set yet.</div>
                  )}
                </div>

                <div className="p-4 bg-white border-b-2 border-black rounded shadow-md">
                  {culture ? (
                    <>
                      <p>
                        <strong>Next Job:</strong> {culture.nextJob}
                      </p>
                      <p>
                        <strong>Motivate:</strong> {culture.motivate}
                      </p>
                      <p>
                        <strong>Future:</strong> {culture.future}
                      </p>
                      <p>
                        <strong>Environment:</strong> {culture.environment}
                      </p>
                    </>
                  ) : (
                    <div className="text-center">
                      No culture data available.
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
