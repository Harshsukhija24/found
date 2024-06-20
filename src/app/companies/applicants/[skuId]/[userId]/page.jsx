"use client";
import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/side_bar";
import Nav from "../../../components/Nav_Bar";

const Page = ({ params: { skuId, userId } }) => {
  const [userData, setUserData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user summary data
        const response = await fetch(
          `/api/candidates/Summary/${skuId}/${userId}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch summary data: ${response.statusText}`
          );
        }
        const data = await response.json();
        console.log("Fetched userData:", data);
        if (data.length > 0) {
          setUserData(data[0]); // Assuming only one user data object is returned
        } else {
          throw new Error("No summary data found");
        }

        // Fetch applied data
        const responseSummary = await fetch(`/api/candidates/Applied/${skuId}`);
        if (!responseSummary.ok) {
          throw new Error(
            `Failed to fetch applied data: ${responseSummary.statusText}`
          );
        }
        const dataSummary = await responseSummary.json();
        console.log("Fetched summaryData:", dataSummary);
        if (dataSummary.length > 0) {
          setSummaryData(dataSummary[0]);
        } else {
          throw new Error("No applied data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      }
    };

    if (skuId && userId) {
      fetchData();
    } else {
      setError("No SKU ID or User ID provided");
    }
  }, [skuId, userId]);

  const handleAccept = async () => {
    if (!userData || !summaryData) {
      console.error("No user data or summary data to accept");
      return;
    }

    try {
      const response = await fetch("/api/Messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userData, summaryData }),
      });

      if (!response.ok) {
        throw new Error(`Failed to accept user: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("User accepted:", result);
      // Additional functionality can be added here if needed
    } catch (error) {
      console.error("Error accepting user:", error);
      setError(error.message);
    }
  };

  if (error) {
    return <div className="text-red-500 font-semibold">{error}</div>;
  }

  if (!userData || !summaryData) {
    return <div className="text-gray-500">Loading...</div>;
  }

  return (
    <div className="flex flex-col mt-6">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>
        <div className="bg-white p-6 w-full mt-24 rounded-lg shadow-lg">
          <div>
            <div className="mb-6">
              <strong className="text-xl font-bold">Cover Letter:</strong>{" "}
              <span className="text-gray-700">
                {userData.coverLetter || "Not provided"}
              </span>
            </div>
            <div className="mb-6">
              <strong className="text-xl font-bold">Profile:</strong>
              <ul className="space-y-4">
                {userData.profile && userData.profile.length > 0 ? (
                  userData.profile.map((item, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow hover:bg-gray-100 cursor-pointer transition"
                      onClick={() =>
                        console.log(`Clicked on SKU ID: ${userData.skuId}`)
                      }
                    >
                      <div>
                        <strong className="text-lg font-semibold">Name:</strong>{" "}
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Location:
                        </strong>{" "}
                        <span className="text-gray-700">{item.location}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">Role:</strong>{" "}
                        <span className="text-gray-700">{item.role}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">Bio:</strong>{" "}
                        <span className="text-gray-700">{item.bio}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Website:
                        </strong>{" "}
                        <a
                          href={item.website}
                          className="text-blue-500 hover:underline"
                        >
                          {item.website}
                        </a>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          LinkedIn:
                        </strong>{" "}
                        <a
                          href={item.linkedin}
                          className="text-blue-500 hover:underline"
                        >
                          {item.linkedin}
                        </a>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          GitHub:
                        </strong>{" "}
                        <a
                          href={item.github}
                          className="text-blue-500 hover:underline"
                        >
                          {item.github}
                        </a>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Twitter:
                        </strong>{" "}
                        <a
                          href={item.twitter}
                          className="text-blue-500 hover:underline"
                        >
                          {item.twitter}
                        </a>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Company:
                        </strong>{" "}
                        <span className="text-gray-700">{item.company}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Title:
                        </strong>{" "}
                        <span className="text-gray-700">{item.title}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Description:
                        </strong>{" "}
                        <span className="text-gray-700">
                          {item.description}
                        </span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Education:
                        </strong>{" "}
                        <span className="text-gray-700">{item.education}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Skills:
                        </strong>{" "}
                        <span className="text-gray-700">{item.skills}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Achievement:
                        </strong>{" "}
                        <span className="text-gray-700">
                          {item.achievement}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No profile data available</li>
                )}
              </ul>
            </div>
            <div className="mb-6">
              <strong className="text-xl font-bold">Preference:</strong>
              <ul className="space-y-4">
                {userData.preference && userData.preference.length > 0 ? (
                  userData.preference.map((pref, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow"
                    >
                      <div>
                        <strong className="text-lg font-semibold">
                          Relocation:
                        </strong>{" "}
                        <span className="text-gray-700">{pref.relocation}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Authorized:
                        </strong>{" "}
                        <span className="text-gray-700">{pref.authorized}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Job Type:
                        </strong>{" "}
                        <span className="text-gray-700">{pref.jobtype}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Open to Job Types:
                        </strong>{" "}
                        <span className="text-gray-700">
                          {pref.openToJobTypes.join(", ")}
                        </span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Desired Locations:
                        </strong>{" "}
                        <span className="text-gray-700">
                          {pref.desiredLocations}
                        </span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Open to Remote Work:
                        </strong>{" "}
                        <span className="text-gray-700">
                          {pref.openToRemoteWork}
                        </span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Desired Salary:
                        </strong>{" "}
                        <span className="text-gray-700">
                          {pref.desiredSalary}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">
                    No preference data available
                  </li>
                )}
              </ul>
            </div>
            <div>
              <strong className="text-xl font-bold">Culture:</strong>
              <ul className="space-y-4">
                {userData.culture && userData.culture.length > 0 ? (
                  userData.culture.map((cult, index) => (
                    <li
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg shadow"
                    >
                      <div>
                        <strong className="text-lg font-semibold">
                          Next Job:
                        </strong>{" "}
                        <span className="text-gray-700">{cult.nextJob}</span>
                      </div>
                      <div>
                        <strong className className="text-lg font-semibold">
                          Motivate:
                        </strong>{" "}
                        <span className="text-gray-700">{cult.motivate}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Future:
                        </strong>{" "}
                        <span className="text-gray-700">{cult.future}</span>
                      </div>
                      <div>
                        <strong className="text-lg font-semibold">
                          Environment:
                        </strong>{" "}
                        <span className="text-gray-700">
                          {cult.environment}
                        </span>
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="text-gray-500">No culture data available</li>
                )}
              </ul>
            </div>
          </div>
          <button
            onClick={handleAccept}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default Page;
