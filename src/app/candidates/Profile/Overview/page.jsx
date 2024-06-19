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
          const profileResponse = await fetch(`/api/Profile/Profile/${userId}`);
          if (!profileResponse.ok) throw new Error("Failed to fetch profile");
          const profileData = await profileResponse.json();
          setProfile(profileData.length > 0 ? profileData[0] : null);

          const preferencesResponse = await fetch(
            `/api/Profile/Preferences/${userId}`
          );
          if (!preferencesResponse.ok)
            throw new Error("Failed to fetch preferences");
          const preferencesData = await preferencesResponse.json();
          setPreferences(
            preferencesData.length > 0 ? preferencesData[0] : null
          );

          const cultureResponse = await fetch(`/api/Profile/Culture/${userId}`);
          if (!cultureResponse.ok) throw new Error("Failed to fetch culture");
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

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
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
        <main className="w-5/6 p-4  mt-11 overflow-auto">
          <Nav_Home />
          <div className="mt-10">
            <div className="p-4 bg-white rounded shadow-md">
              <h2 className="text-2xl font-bold mb-4">
                this is how your profile while be shown to recutiers
              </h2>
              <div className="border-b-2 border-black">
                <p>
                  <strong>Name:</strong> {profile?.name || "No name"}
                </p>
                <p>
                  <strong>Bio:</strong> {profile?.bio || "No bio"}
                </p>
                <p>
                  <strong>Education:</strong>{" "}
                  {profile?.education || "No education"}
                </p>
                <p>
                  <strong>Skills:</strong> {profile?.skills || "No skills"}
                </p>
                <p>
                  <strong>Role:</strong> {profile?.role || "No role"}
                </p>
                {profile?.github && (
                  <p>
                    <strong>GitHub:</strong> {profile.github}
                  </p>
                )}
              </div>
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
                    <strong>Desired Salary:</strong> {preferences.desiredSalary}
                  </p>
                  <p>
                    <strong>Company Sizes:</strong> {preferences.companySizes}
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
                    <strong>NextJob:</strong> {culture.nextJob}
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
                <div className="text-center">No culture data available.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserProfile;
