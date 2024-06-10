"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Nav_Home from "@/app/components/Nav_Home";
import { useSession } from "next-auth/react";

const USWorkAuthorizationPage = () => {
  const [relocation, setRelocation] = useState("");
  const [authorized, setAuthorized] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [openToJobTypes, setOpenToJobTypes] = useState([]);
  const [desiredLocations, setDesiredLocations] = useState("");
  const [openToRemoteWork, setOpenToRemoteWork] = useState("");
  const [desiredSalary, setDesiredSalary] = useState("");
  const [companySizes, setCompanySizes] = useState([]);

  const { data: session, status } = useSession();

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return <div>No user session found</div>;
  }

  const userId = session.user.userId;

  // Log session to check its structure
  console.log("Session data:", session);
  console.log(userId);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      console.log("Unauthorized");
      return;
    }
    try {
      const response = await fetch("/api/Profile/Preferences", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
          relocation,
          authorized,
          jobtype,
          openToJobTypes,
          desiredLocations,
          openToRemoteWork,
          desiredSalary,
          companySizes,
        }),
      });
      if (!response) {
        throw new Error("failed");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4">
      {/* Sidebar container */}
      <div className="col-span-2">
        <Sidebar />
      </div>
      {/* Main container */}
      <div className="col-span-10 p-4">
        <h1 className="text-xl font-bold mb-4">Edit your Found Profile</h1>
        <Nav_Home />
        <h1 className="text-xl font-bold mb-4"> Work Authorization </h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-bold mb-2">
              Do you or will you require sponsorship for a reloaction ?
            </label>
            <div className="flex items-center">
              <input
                onClick={(e) => setRelocation(e.target.value)}
                type="radio"
                id="visaYes"
                name="visa"
                value="yes"
                className="mr-2"
              />
              <label htmlFor="visaYes">Yes</label>
              <input
                onClick={(e) => setRelocation(e.target.value)}
                type="radio"
                id="visaNo"
                name="visa"
                value="no"
                className="ml-8 mr-2"
              />
              <label htmlFor="visaNo">No</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              Are you legally authorized to work in the India?
            </label>
            <div className="flex items-center">
              <input
                onClick={(e) => setAuthorized(e.target.value)}
                type="radio"
                id="authorizedYes"
                name="authorized"
                value="yes"
                className="mr-2"
              />
              <label htmlFor="authorizedYes">Yes</label>
              <input
                onClick={(e) => setAuthorized(e.target.value)}
                type="radio"
                id="authorizedNo"
                name="authorized"
                value="no"
                className="ml-8 mr-2"
              />
              <label htmlFor="authorizedNo">No</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              What type of job are you interested in?
            </label>
            <select
              onChange={(e) => setJobtype(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="fullTime">Full-time Employee</option>
              <option value="contractor">Contractor</option>
              <option value="intern">Intern</option>
              <option value="coFounder">Co-founder</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              Also open to the following job types:
            </label>
            <div className="flex items-center">
              <input
                onChange={(e) =>
                  setOpenToJobTypes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="contractor"
                name="jobTypes"
                value="contractor"
                className="mr-2"
              />
              <label htmlFor="contractor">Contractor</label>
              <input
                onChange={(e) =>
                  setOpenToJobTypes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="intern"
                name="jobTypes"
                value="intern"
                className="ml-8 mr-2"
              />
              <label htmlFor="intern">Intern</label>
              <input
                onChange={(e) =>
                  setOpenToJobTypes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="coFounder"
                name="jobTypes"
                value="coFounder"
                className="ml-8 mr-2"
              />
              <label htmlFor="coFounder">Co-founder</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              What locations do you want to work in?
            </label>
            <textarea
              onChange={(e) => setDesiredLocations(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              rows="4"
              placeholder="Enter locations"
            ></textarea>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              Open to working remotely
            </label>
            <div className="flex items-center">
              <input
                onClick={(e) => setOpenToRemoteWork(e.target.value)}
                type="radio"
                id="remoteYes"
                name="remote"
                value="yes"
                className="mr-2"
              />
              <label htmlFor="remoteYes">Yes</label>
              <input
                onClick={(e) => setOpenToRemoteWork(e.target.value)}
                type="radio"
                id="remoteNo"
                name="remote"
                value="no"
                className="ml-8 mr-2"
              />
              <label htmlFor="remoteNo">No</label>
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              What is your desired salary?
            </label>
            <input
              onChange={(e) => setDesiredSalary(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Desired salary"
            />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              Would you like to work at companies of these sizes?
            </label>
            <div className="flex items-center">
              <input
                onChange={(e) =>
                  setCompanySizes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="sizeSeed"
                name="companySize"
                value="seed"
                className="mr-2"
              />
              <label htmlFor="sizeSeed">Seed (1 - 10 employees)</label>
            </div>
            <div className="flex items-center">
              <input
                onChange={(e) =>
                  setCompanySizes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="sizeEarly"
                name="companySize"
                value="early"
                className="mr-2"
              />
              <label htmlFor="sizeEarly">Early (11 - 50 employees)</label>
            </div>
            <div className="flex items-center">
              <input
                onChange={(e) =>
                  setCompanySizes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="sizeMid"
                name="companySize"
                value="mid"
                className="mr-2"
              />
              <label htmlFor="sizeMid">Mid-size (51 - 200 employees)</label>
            </div>
            <div className="flex items-center">
              <input
                onChange={(e) =>
                  setCompanySizes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="sizeLarge"
                name="companySize"
                value="large"
                className="mr-2"
              />
              <label htmlFor="sizeLarge">Large (201 - 500 employees)</label>
            </div>
            <div className="flex items-center">
              <input
                onChange={(e) =>
                  setCompanySizes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="sizeVeryLarge"
                name="companySize"
                value="veryLarge"
                className="mr-2"
              />
              <label htmlFor="sizeVeryLarge">
                Very Large (501 - 1000 employees)
              </label>
            </div>
            <div className="flex items-center">
              <input
                onChange={(e) =>
                  setCompanySizes((prev) =>
                    e.target.checked
                      ? [...prev, e.target.value]
                      : prev.filter((val) => val !== e.target.value)
                  )
                }
                type="checkbox"
                id="sizeMassive"
                name="companySize"
                value="massive"
                className="mr-2"
              />
              <label htmlFor="sizeMassive">Massive (1001+ employees)</label>
            </div>
          </div>
          <div className="col-span-2">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default USWorkAuthorizationPage;
