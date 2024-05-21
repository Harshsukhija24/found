"use client";
import React, { useState } from "react";
import Sidebar from "@/app/components/Sidebar";
import Nav_Home from "@/app/components/Nav_Home";

const JobPreferencesPage = () => {
  const [nextJob, setNextJob] = useState("");
  const [motivate, setMotivate] = useState("");
  const [future, setFuture] = useState("");
  const [environment, setEnvironment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/Profile/Culture", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ nextJob, motivate, future, environment }),
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
      <div className="col-span-2">
        <Sidebar />
      </div>
      <div className="col-span-10 p-4">
        <h1 className="text-xl font-bold mb-4">Edit your Found Profile</h1>
        <Nav_Home />
        <h1 className="text-xl font-bold mb-4">Job Preferences</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block text-sm font-bold mb-2">
              Describe what you are looking for in your next job
            </label>
            <textarea
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
              onChange={(e) => setMotivate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="technical">Solving technical problems</option>
              <option value="product">Building products</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              Over the next five years, what career track do you want to follow?
            </label>
            <select
              onChange={(e) => setFuture(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="manager">Manager</option>
              <option value="Startup">Startup</option>
              <option value="individual">Individual contributor</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">
              What environment do you work better in?
            </label>
            <select
              onChange={(e) => setEnvironment(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="clearRole">
                Clear role and set of responsibilities. Consistent feedback from
                management.
              </option>
              <option value="wearingHats">
                Employees wear a lot of hats. Assignments often require
                employees to 'figure it out' on their own.
              </option>
            </select>
          </div>
          {/* Add more fields here */}
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

export default JobPreferencesPage;
