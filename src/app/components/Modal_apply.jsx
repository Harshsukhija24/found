import React, { useState } from "react";

const ModalApply = ({ isOpen, onClose, company }) => {
  const [activeTab, setActiveTab] = useState("Application");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!isOpen || !company) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{company.company_name}</h2>
          <button className="text-gray-600" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex items-center mb-4">
          <h2 className="mr-2">{company.bio}</h2>
        </div>
        <div className="flex mb-4 border-b pb-2">
          <button
            className={`mr-2 px-4 py-2 ${
              activeTab === "Application" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("Application")}
          >
            Application
          </button>

          <button
            className={`mr-2 px-4 py-2 ${
              activeTab === "Jobdescription" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("Jobdescription")}
          >
            Job Description
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "companyinfo" ? "bg-gray-300" : "bg-gray-100"
            }`}
            onClick={() => handleTabChange("companyinfo")}
          >
            Company Info
          </button>
        </div>
        <div className="overflow-y-auto max-h-[400px]">
          <div className="h-[400px]">
            {activeTab === "Application" && (
              <div className="h-full">
                <h2 className="text-xl font-bold mb-2">
                  {company.company_name}
                </h2>
                <h2>cover letter</h2>
                {company.coverLetter}
              </div>
            )}
            {activeTab === "Jobdescription" && (
              <div className="h-full">
                <h2>{company.job_description}</h2>
                <p>
                  Apply on this link:{" "}
                  <a href={company.job_link}>{company.job_link}</a>
                </p>
                <p>Experience Required: {company.experience_required}</p>
                <p>Company Description: {company.description}</p>
                <p>Key Responsibilities:</p>
                <ul>
                  {company.key_responsibilities?.map(
                    (key_responsibility, index) => (
                      <li key={index}>{key_responsibility}</li>
                    )
                  )}
                </ul>
                <p>Qualifications:</p>
                <ul>
                  {company.qualifications?.map((qualification, index) => (
                    <li key={index}>{qualification}</li>
                  ))}
                </ul>
                <p>Benefits:</p>
                <ul>
                  {company.benefits?.map((benefit, index) => (
                    <li key={index}>{benefit}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTab === "companyinfo" && company.company_info && (
              <div className="h-full">
                <p>Company Info:</p>
                <h2>Founded: {company.company_info.founded}</h2>
                <h2>Location: {company.company_info.location}</h2>
                <h2>
                  Website:{" "}
                  <a href={company.company_info.website}>
                    {company.company_info.website}
                  </a>
                </h2>
                <h2>Employees: {company.company_info.employees}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalApply;
