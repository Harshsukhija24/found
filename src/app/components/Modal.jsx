"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Modal = ({ isOpen, onClose, company }) => {
  const router = useRouter();
  if (!isOpen || !company) {
    return null;
  }

  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
      <div className="w-2/5 max-w-2xl h-full  bg-white p-6 rounded-lg shadow-lg overflow-y-auto">
        <div className="flex justify-between mt-6 items-center mb-4">
          <div>
            {company.company.map((item, skuId) => (
              <div key={skuId}>
                <h2 className="text-2xl font-bold text-gray-800">
                  {item.companyName}
                </h2>
                <p className="text-gray-600">{item.bio}</p>
              </div>
            ))}
          </div>
          <button
            className="text-gray-600 hover:text-gray-900 focus:outline-none ml-4"
            onClick={onClose}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex mb-4 border-b pb-2 space-x-2">
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "overview"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("overview")}
          >
            Overview
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "people"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("people")}
          >
            People
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "culture"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("culture")}
          >
            Culture
          </button>
          <button
            className={`px-4 py-2 rounded-lg ${
              activeTab === "jobs"
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handleTabChange("jobs")}
          >
            Jobs
          </button>
        </div>
        <div className="overflow-y-auto max-h-full">
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
                  className="text-blue-500 underline mt-2 inline-block"
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
                    <div className="border p-3 mb-2 rounded-lg">
                      <h3 className="text-lg font-bold">Founder</h3>
                      <p>{people.founderName}</p>
                      <p>{people.founderLocation}</p>
                      <p>{people.founderPastExperience}</p>
                    </div>
                    <div className="border p-3 mb-2 rounded-lg">
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
                  className="text-blue-500 underline mt-2 inline-block"
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
