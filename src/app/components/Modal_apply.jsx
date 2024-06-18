import React, { useState } from "react";

const ModalApply = ({ isOpen, onClose, company }) => {
  const [activeTab, setActiveTab] = useState("Application");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!isOpen || !company) {
    return null;
  }

  const companyData = company.companyData;
  const companyInfo = companyData.company[0];
  const info = companyData.info[0];
  const coverLetter = company.coverLetter;
  const jobDescription = companyData.JobDescription;
  const jobLink = companyData.JobLink;
  const experienceRequired = companyData.ExperienceRequired;
  const keyResponsibilities = companyData.KeyResponsibilities;
  const qualifications = companyData.Qualifications;
  const salaryRange = companyData.SalaryRange;

  return (
    <div className="fixed inset-0 flex items-center justify-end bg-black bg-opacity-50 z-50">
      <div className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md max-h-full overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{companyInfo.companyName}</h2>
          <button className="text-gray-600" onClick={onClose}>
            X
          </button>
        </div>
        <div className="flex items-center mb-4">
          <h2 className="mr-2">{companyInfo.bio}</h2>
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
                  {companyInfo.companyName}
                </h2>
                <div className="border-2 border-black">
                  <h2>Cover Letter</h2>
                  <p>{coverLetter}</p>
                </div>
              </div>
            )}
            {activeTab === "Jobdescription" && (
              <div className="h-full">
                <h2>Job Description</h2>
                <p>{jobDescription}</p>
                <p>
                  Apply on this link: <a href={jobLink}>{jobLink}</a>
                </p>
                <p>Experience Required: {experienceRequired}</p>
                <p>Key Responsibilities:</p>
                <p>{keyResponsibilities}</p>
                <p>Qualifications:</p>
                <p>{qualifications}</p>
                <p>Salary Range: {salaryRange}</p>
              </div>
            )}
            {activeTab === "companyinfo" && info && (
              <div className="h-full">
                <p>Company Info:</p>
                <h2>Founded: {info.founded}</h2>
                <h2>Location: {info.location}</h2>
                <h2>
                  Website: <a href={info.website}>{info.website}</a>
                </h2>
                <h2>Employees: {info.employees}</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalApply;
