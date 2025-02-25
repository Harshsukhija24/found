"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Sidebar from "@/app/components/SidebarCanidates";
import Nav_Home from "@/app/components/Nav_Home";
import Nav from "../../../components/Nav";

const JobPreferencesPage = () => {
  const [nextJob, setNextJob] = useState("");
  const [motivate, setMotivate] = useState("");
  const [future, setFuture] = useState("");
  const [environment, setEnvironment] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [preferencesExist, setPreferencesExist] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchPreferences = async () => {
      if (status === "authenticated" && session?.user) {
        const userId = session.user.userId;

        try {
          const response = await fetch(`/api/Profile/Culture/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch preferences");
          }

          const data = await response.json();
          if (data && data.length > 0) {
            const dataa = data[0];
            setNextJob(dataa.nextJob || "");
            setMotivate(dataa.motivate || "");
            setFuture(dataa.future || "");
            setEnvironment(dataa.environment || "");
            setPreferencesExist(true);
          } else {
            setPreferencesExist(false);
          }
        } catch (error) {
          console.error("Error fetching preferences:", error);
        }
      }
    };

    fetchPreferences();
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      console.log("Unauthorized");
      return;
    }

    const userId = session.user.userId;
    const preferences = {
      userId,
      nextJob,
      motivate,
      future,
      environment,
    };

    try {
      const method = preferencesExist ? "PUT" : "POST";
      const response = await fetch("/api/Profile/Culture", {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${method === "POST" ? "save" : "update"} preferences`
        );
      }

      console.log("Culture updated successfully");
      setIsPopupVisible(true);
      setTimeout(() => setIsPopupVisible(false), 3000); // Hide popup after 3 seconds
    } catch (err) {
      console.error("Error:", err);
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
        <Nav />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>
        <div className="w-5/6 p-4  overflow-auto">
          <Nav_Home />
          <h1 className="text-xl font-bold mb-4">Edit your Found Profile</h1>

          <h1 className="text-xl font-bold mb-4">Job Preferences</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-bold mb-2">
                Describe what you are looking for in your next job
              </label>
              <textarea
                value={nextJob}
                onChange={(e) => setNextJob(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                placeholder="Enter description"
              ></textarea>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                What motivates you more?
              </label>
              <select
                value={motivate}
                onChange={(e) => setMotivate(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select an option</option>
                <option value="technical">Solving technical problems</option>
                <option value="product">Building products</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                Over the next five years, what career track do you want to
                follow?
              </label>
              <select
                value={future}
                onChange={(e) => setFuture(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select an option</option>
                <option value="manager">Manager</option>
                <option value="startup">Startup</option>
                <option value="individual">Individual contributor</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">
                What environment do you work better in?
              </label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select an option</option>
                <option value="clearRole">
                  Clear role and set of responsibilities. Consistent feedback
                  from management.
                </option>
                <option value="wearingHats">
                  Employees wear a lot of hats. Assignments often require
                  employees to "figure it out" on their own.
                </option>
              </select>
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
          {isPopupVisible && (
            <div className="fixed bottom-0 right-0 mb-4 mr-4 p-4 bg-green-500 text-white rounded shadow-lg">
              Culture updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JobPreferencesPage;
