"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/Sidebar";
import Modal from "../../components/Modal";
import Nav_Home from "@/app/components/Nav_Home";
import Nav from "../../components/Nav";

const Page = () => {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/candidates/Companies");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();

        if (Array.isArray(jsonData)) {
          setData(jsonData);
        } else if (jsonData && jsonData.data && Array.isArray(jsonData.data)) {
          setData(jsonData.data);
        } else if (
          jsonData &&
          jsonData.companies &&
          Array.isArray(jsonData.companies)
        ) {
          setData(jsonData.companies);
        } else {
          throw new Error("Invalid data format");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const openModal = (company) => {
    setSelectedCompany(company);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedCompany(null);
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="w-full">
        <Nav />

        <Nav_Home />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4 ">
          <Sidebar />
        </div>
        <div className="w-5/6 p-4 overflow-auto">
          <div className="container mx-auto">
            {data.length > 0 ? (
              data.map((company, index) => (
                <div
                  key={index}
                  onClick={() => openModal(company)}
                  className="bg-white shadow-md rounded-lg p-6 mb-6 cursor-pointer"
                >
                  <h2 className="text-2xl font-bold mb-2">
                    {company.company_name}
                  </h2>
                  <p className="text-gray-700 mb-2">{company.bio}</p>
                  <h3 className="text-lg font-semibold mb-2">Jobs:</h3>
                  {company.jobs.map((job, jobIndex) => (
                    <div
                      key={jobIndex}
                      className="bg-gray-100 p-4 rounded mb-2"
                    >
                      <p className="mb-1">
                        <span className="font-semibold">Job Description:</span>{" "}
                        {job.description}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Salary:</span>{" "}
                        {job.salary}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Location:</span>{" "}
                        {job.location}
                      </p>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              <p className="text-center text-gray-700">No data available.</p>
            )}
            {isModalOpen && (
              <Modal
                isOpen={isModalOpen}
                onClose={closeModal}
                company={selectedCompany}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
