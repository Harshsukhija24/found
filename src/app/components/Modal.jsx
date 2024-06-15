"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Modal = ({ isOpen, onClose, company }) => {
  const router = useRouter();
  if (!isOpen || !company) {
    return null;
  }

  const [followed, setFollowed] = useState(company.followed);
  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFollow = async () => {
    try {
      const response = await fetch("/api/candidates/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: company.id }),
      });
      if (!response.ok) {
        setFollowed(!followed);
      } else {
        console.error("Failed to follow/unfollow company");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center  justify-end bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-md max-h-full overflow-y-auto">
        <div className="flex justify-between items-start mb-4">
          <div>
            {company.company.map((item, skuId) => (
              <div key={skuId}>
                <h2 className="text-2xl font-bold">{item.companyName}</h2>
                <p className="text-gray-600">{item.bio}</p>
              </div>
            ))}
          </div>
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none ml-4"
            onClick={onClose}
          >
            X
          </button>
        </div>
        <div className="flex items-center mb-4">
          <button
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-full shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            onClick={handleFollow}
          >
            {followed ? "Unfollow" : "Follow"}
          </button>
        </div>
        <div className="flex mb-4 border-b pb-2 space-x-2">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "overview" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "people" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("people")}
          >
            People
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "culture" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("culture")}
          >
            Culture
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "jobs" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("jobs")}
          >
            Jobs
          </button>
        </div>
        <div className="overflow-y-auto max-h-96">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Overview</h2>
              <p className="mb-4">{company.overview}</p>
              <div>
                <h3 className="font-semibold">Jobs:</h3>
                <p>{company.JobDescription}</p>
                <p>{company.JobLocation}</p>
                <p>{company.SalaryRange}</p>
                <button
                  onClick={() =>
                    router.push(`/candidates/Job/${company.skuId}`)
                  }
                  className="text-blue-500 underline"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
          {activeTab === "people" && (
            <div>
              <h2 className="text-xl font-bold mb-2">People</h2>
              <div>
                {company.team.map((people, index) => (
                  <div key={index} className="mb-4">
                    <div className="border p-3 mb-2">
                      <h3 className="text-lg font-bold">Founder</h3>
                      <p>{people.founderName}</p>
                      <p>{people.founderLocation}</p>
                      <p>{people.founderPastExperience}</p>
                    </div>
                    <div className="border p-3 mb-2">
                      <h3 className="text-lg font-bold">Co-founder</h3>
                      <p>{people.coFounderName}</p>
                      <p>{people.coFounderLocation}</p>
                      <p>{people.coFounderPastExperience}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "culture" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Culture</h2>
              <p className="mb-4">{company.culture}</p>
              <h3 className="font-semibold">Benefits:</h3>
              <ul className="list-disc list-inside">
                {company.company.map((item, index) => (
                  <div key={index}>
                    <li>{item.benefit}</li>
                    <li>{item.culture}</li>
                  </div>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "jobs" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Jobs</h2>
              <div>
                <p>{company.JobDescription}</p>
                <p>{company.JobLocation}</p>
                <p>{company.SalaryRange}</p>
                <button
                  onClick={() =>
                    router.push(`/candidates/Job/${company.skuId}`)
                  }
                  className="text-blue-500 underline"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
