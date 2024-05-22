import { useState } from "react";

const Modal = ({ isOpen, onClose, company }) => {
  if (!isOpen || !company) {
    return null;
  }

  const [activeTab, setActiveTab] = useState("overview");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="fixed inset-0 flex items-center  h-auto justify-end bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{company.company_name}</h2>
          <button className="text-gray-600" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex items-center mb-4">
          <h2 className="mr-2">{company.bio}</h2>
          <button className="bg-gradient-to-r mt-1 from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-3 py-1 rounded-full shadow-md transform transition-transform duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
            Follow
          </button>
        </div>
        <div className="flex mb-4 border-b pb-2">
          <button
            className={`mr-2 px-4 py-2 ${
              activeTab === "overview" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("overview")}
          >
            Overview
          </button>
          <button
            className={`mr-2 px-4 py-2 ${
              activeTab === "people" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("people")}
          >
            People
          </button>
          <button
            className={`mr-2 px-4 py-2 ${
              activeTab === "culture" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("culture")}
          >
            Culture
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "jobs" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("jobs")}
          >
            Jobs
          </button>
        </div>
        <div className="overflow-y-auto max-h-[400px]">
          {activeTab === "overview" && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                {company.company_name} Overview
              </h2>
              <p className="mb-4">Overview: {company.overview}</p>
              <div>
                Jobs:
                {company.jobs.map((job, id) => (
                  <div key={id} className="border p-4 mb-2">
                    <p>{job.description}</p>
                    <p>{job.location}</p>
                    <p>{job.salary}</p>
                    <button className="text-blue-500">Apply</button>
                  </div>
                ))}
              </div>
            </div>
          )}
          {activeTab === "people" && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                {company.company_name} People
              </h2>
              <p className="mb-4">People:</p>
              {company.peoples.map((people, index) => (
                <div key={index} className="mb-2">
                  <div className="border p-3 mb-2">
                    <h3 className="text-lg font-bold">Founder</h3>
                    <p>{people.founder.name}</p>
                    <p>{people.founder.location}</p>
                    <p>{people.founder.past_experience}</p>
                  </div>
                  <div className="border p-3 mb-2">
                    <h3 className="text-lg font-bold">Co-founder</h3>
                    <p>{people.co_founder.name}</p>
                    <p>{people.co_founder.location}</p>
                    <p>{people.co_founder.past_experience}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === "culture" && (
            <div>
              <h2 className="text-xl font-bold mb-2">
                {company.company_name} Culture
              </h2>
              <p className="mb-4">Culture: {company.culture}</p>
              <p>Benefits:</p>
              <ul>
                {company.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "jobs" && (
            <div>
              <h2 className="text-xl font-bold mb-2">Jobs</h2>
              {company.jobs.map((job, id) => (
                <div key={id} className="border p-4 mb-2">
                  <h3>{job.description}</h3>
                  <p>{job.location}</p>
                  <p>{job.salary}</p>
                  <button className="text-blue-500">Apply</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
