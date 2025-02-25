"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "@/app/components/SidebarCanidates";
import Nav_Home from "@/app/components/Nav_Home";
import { useSession } from "next-auth/react";
import Nav from "../../../components/Nav";

const USWorkAuthorizationPage = () => {
  const [relocation, setRelocation] = useState("");
  const [authorized, setAuthorized] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [openToJobTypes, setOpenToJobTypes] = useState([]);
  const [desiredLocations, setDesiredLocations] = useState("");
  const [openToRemoteWork, setOpenToRemoteWork] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [companySizes, setCompanySizes] = useState([]);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [isExistingProfile, setIsExistingProfile] = useState(false);

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
          if (data) {
            const preferences = data[0];
            setRelocation(preferences.relocation || "");
            setAuthorized(preferences.authorized || "");
            setJobtype(preferences.jobtype || "");
            setOpenToJobTypes(preferences.openToJobTypes || []);
            setDesiredLocations(preferences.desiredLocations || "");
            setOpenToRemoteWork(preferences.openToRemoteWork || "");
            setDesiredSalary(preferences.desiredSalary || "");
            setCompanySizes(preferences.companySizes || []);
          }
        } catch (error) {
          console.error("Error fetching preferences:", error);
        }
      }
    };

    fetchPreferences();
  }, [session, status]);

  const handleCheckboxChange = (e, currentState, setterFunction) => {
    const { value, checked } = e.target;

    let updatedState;
    if (checked) {
      updatedState = [...currentState, value];
    } else {
      updatedState = currentState.filter((item) => item !== value);
    }

    setterFunction(updatedState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      console.log("Unauthorized");
      return;
    }

    const preferences = {
      userId,
      relocation,
      authorized,
      jobtype,
      openToJobTypes,
      desiredLocations,
      openToRemoteWork,
      desiredSalary,
      companySizes,
    };

    try {
      const method = isExistingProfile ? "PUT" : "POST";
      const response = await fetch("/api/Profile/Preferences", {
        method,
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to ${method === "POST" ? "create" : "update"} preferences`
        );
      }

      console.log(
        `Preferences ${method === "POST" ? "created" : "updated"} successfully`
      );

      // Update culture preferences using PUT method

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

  const userId = session.user.userId;
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
          <h1 className="text-2xl font-bold mb-4">Edit your Found Profile</h1>
          <h2 className="text-xl font-bold mb-4">Work Authorization</h2>
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            {/* Radio buttons for relocation */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Do you or will you require sponsorship for relocation?
              </label>
              <div className="flex items-center">
                <input
                  onChange={(e) => setRelocation(e.target.value)}
                  type="radio"
                  id="visaYes"
                  name="visa"
                  value="yes"
                  className="mr-2"
                  checked={relocation === "yes"}
                />
                <label htmlFor="visaYes">Yes</label>
                <input
                  onChange={(e) => setRelocation(e.target.value)}
                  type="radio"
                  id="visaNo"
                  name="visa"
                  value="no"
                  className="ml-8 mr-2"
                  checked={relocation === "no"}
                />
                <label htmlFor="visaNo">No</label>
              </div>
            </div>
            {/* Radio buttons for authorized to work */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Are you legally authorized to work in India?
              </label>
              <div className="flex items-center">
                <input
                  onChange={(e) => setAuthorized(e.target.value)}
                  type="radio"
                  id="authorizedYes"
                  name="authorized"
                  value="yes"
                  className="mr-2"
                  checked={authorized === "yes"}
                />
                <label htmlFor="authorizedYes">Yes</label>
                <input
                  onChange={(e) => setAuthorized(e.target.value)}
                  type="radio"
                  id="authorizedNo"
                  name="authorized"
                  value="no"
                  className="ml-8 mr-2"
                  checked={authorized === "no"}
                />
                <label htmlFor="authorizedNo">No</label>
              </div>
            </div>
            {/* Select field for job type */}
            <div>
              <label className="block text-sm font-bold mb-2">
                What type of job are you interested in?
              </label>
              <select
                onChange={(e) => setJobtype(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={jobtype}
              >
                <option value="fullTime">Full-time Employee</option>
                <option value="contractor">Contractor</option>
                <option value="intern">Intern</option>
                <option value="coFounder">Co-founder</option>
              </select>
            </div>
            {/* Checkbox group for open to job types */}
            <div className="col-span-2">
              <label className="block text-sm font-bold mb-2">
                Also open to the following job types:
              </label>
              <div className="flex items-center">
                <input
                  onChange={(e) =>
                    handleCheckboxChange(e, openToJobTypes, setOpenToJobTypes)
                  }
                  type="checkbox"
                  id="contractor"
                  name="jobTypes"
                  value="contractor"
                  className="mr-2"
                  checked={openToJobTypes.includes("contractor")}
                />
                <label htmlFor="contractor">Contractor</label>
                <input
                  onChange={(e) =>
                    handleCheckboxChange(e, openToJobTypes, setOpenToJobTypes)
                  }
                  type="checkbox"
                  id="intern"
                  name="jobTypes"
                  value="intern"
                  className="ml-8 mr-2"
                  checked={openToJobTypes.includes("intern")}
                />
                <label htmlFor="intern">Intern</label>
                <input
                  onChange={(e) =>
                    handleCheckboxChange(e, openToJobTypes, setOpenToJobTypes)
                  }
                  type="checkbox"
                  id="coFounder"
                  name="jobTypes"
                  value="coFounder"
                  className="ml-8 mr-2"
                  checked={openToJobTypes.includes("coFounder")}
                />
                <label htmlFor="coFounder">Co-founder</label>
              </div>
            </div>
            {/* Textarea for desired locations */}
            <div>
              <label className="block text-sm font-bold mb-2">
                What locations do you want to work in?
              </label>
              <textarea
                onChange={(e) => setDesiredLocations(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px
                3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                value={desiredLocations}
                placeholder="Enter locations"
              ></textarea>
            </div>
            {/* Radio buttons for open to remote work */}
            <div>
              <label className="block text-sm font-bold mb-2">
                Open to working remotely
              </label>
              <div className="flex items-center">
                <input
                  onChange={(e) => setOpenToRemoteWork(e.target.value)}
                  type="radio"
                  id="remoteYes"
                  name="remote"
                  value="yes"
                  className="mr-2"
                  checked={openToRemoteWork === "yes"}
                />
                <label htmlFor="remoteYes">Yes</label>
                <input
                  onChange={(e) => setOpenToRemoteWork(e.target.value)}
                  type="radio"
                  id="remoteNo"
                  name="remote"
                  value="no"
                  className="ml-8 mr-2"
                  checked={openToRemoteWork === "no"}
                />
                <label htmlFor="remoteNo">No</label>
              </div>
            </div>
            {/* Input field for desired salary */}
            <div>
              <label className="block text-sm font-bold mb-2">
                What is your desired salary?
              </label>
              <input
                onChange={(e) => setDesiredSalary(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                value={desiredSalary}
                placeholder="Desired salary"
              />
            </div>
            {/* Checkbox group for company sizes */}
            <div className="col-span-2">
              <label className="block text-sm font-bold mb-2">
                Would you like to work at companies of these sizes?
              </label>
              <div className="flex flex-col">
                <div className="flex items-center">
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(e, companySizes, setCompanySizes)
                    }
                    type="checkbox"
                    id="sizeSeed"
                    name="companySize"
                    value="seed"
                    className="mr-2"
                    checked={companySizes.includes("seed")}
                  />
                  <label htmlFor="sizeSeed">Seed (1 - 10 employees)</label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(e, companySizes, setCompanySizes)
                    }
                    type="checkbox"
                    id="sizeEarly"
                    name="companySize"
                    value="early"
                    className="mr-2"
                    checked={companySizes.includes("early")}
                  />
                  <label htmlFor="sizeEarly">Early (11 - 50 employees)</label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(e, companySizes, setCompanySizes)
                    }
                    type="checkbox"
                    id="sizeMid"
                    name="companySize"
                    value="mid"
                    className="mr-2"
                    checked={companySizes.includes("mid")}
                  />
                  <label htmlFor="sizeMid">Mid-size (51 - 200 employees)</label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(e, companySizes, setCompanySizes)
                    }
                    type="checkbox"
                    id="sizeLarge"
                    name="companySize"
                    value="large"
                    className="mr-2"
                    checked={companySizes.includes("large")}
                  />
                  <label htmlFor="sizeLarge">Large (201 - 500 employees)</label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(e, companySizes, setCompanySizes)
                    }
                    type="checkbox"
                    id="sizeVeryLarge"
                    name="companySize"
                    value="veryLarge"
                    className="mr-2"
                    checked={companySizes.includes("veryLarge")}
                  />
                  <label htmlFor="sizeVeryLarge">
                    Very Large (501 - 1000 employees)
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    onChange={(e) =>
                      handleCheckboxChange(e, companySizes, setCompanySizes)
                    }
                    type="checkbox"
                    id="sizeMassive"
                    name="companySize"
                    value="massive"
                    className="mr-2"
                    checked={companySizes.includes("massive")}
                  />
                  <label htmlFor="sizeMassive">Massive (1001+ employees)</label>
                </div>
              </div>
            </div>
            {/* Submit button */}
            <div className="col-span-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
          {/* Popup notification */}
          {isPopupVisible && (
            <div className="absolute bottom-0 right-0 mb-4 mr-4 bg-green-200 text-green-800 py-2 px-4 rounded">
              Preferences updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default USWorkAuthorizationPage;
