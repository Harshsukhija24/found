import React, { useState } from "react";

const Modal_apply = ({ isopen, onClose, company }) => {
  const [activeTab, setActiveTab] = useState("Application");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!company) {
    return null;
  }

  return (
    <div className="  top-20 right-5 w-full max-w-lg h-auto flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="w-full bg-white p-8 rounded-lg shadow-md max-h-full  overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{company.company_name}</h2>
          <button className="text-gray-600" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex items-center mb-4">
          <h2 className="mr-2">{company.company_bio}</h2>
        </div>
        <div className="flex mb-4 border-b pb-2">
          <button
            className={`mr-2 px-4 py-2 ${
              activeTab === "Application"
                ? "bg-gray-300 border-none"
                : "bg-gray-100 border-none"
            }`}
            onClick={() => handleTabChange("Application")}
          >
            Application
          </button>

          <button
            className={`mr-2 px-4 py-2 ${
              activeTab === "Jobdescription"
                ? "bg-gray-300 border-none"
                : "bg-gray-100 border-none"
            }`}
            onClick={() => handleTabChange("Jobdescription")}
          >
            Job description
          </button>
          <button
            className={`px-4 py-2 ${
              activeTab === "companyinfo"
                ? "bg-gray-300 border-none"
                : "bg-gray-100 border-none"
            }`}
            onClick={() => handleTabChange("companyinfo")}
          >
            company info
          </button>
        </div>
        <div className="overflow-visible">
          {activeTab === "Application" && (
            <div>
              <h2 className="text-xl font-bold mb-2">{company.company_name}</h2>
            </div>
          )}
          {activeTab === "Jobdescription" && (
            <div>
              <h2 className="">{company.job_description}</h2>
              <p>
                Apply on this link:{" "}
                <a href={company.job_link}>{company.job_link}</a>
              </p>
              <p>
                ExperienceRequired:{" "}
                <h2 className="">{company.experience_required}</h2>
              </p>
              <p>
                Companydescription:
                <h2 className="">{company.description}</h2>
              </p>
              <p>Key Responsibilities:</p>
              <ul>
                {company.key_responsibilities.map(
                  (key_responsibilities, index) => (
                    <li key={index}>{key_responsibilities}</li>
                  )
                )}
              </ul>
              <p>Qualifications:</p>
              <ul>
                {company.qualifications.map((qualifications, index) => (
                  <li key={index}>{qualifications}</li>
                ))}
              </ul>
              <p>Benefits:</p>
              <ul>
                {company.benefits.map((benefit, index) => (
                  <li key={index}>{benefit}</li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === "companyinfo" && company && company.company_info && (
            <div>
              <p>Company Info:</p>
              <h2>Founded: {company.company_info.founded}</h2>
              <h2>Location: {company.company_info.location}</h2>
              <h2>Website: {company.company_info.website}</h2>
              <h2>Employees: {company.company_info.employees}</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal_apply;
