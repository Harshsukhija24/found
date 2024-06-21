// pages/Page.js
"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarCanidates";
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
        const response = await fetch("/api/candidates/AppliedData");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const jsonData = await response.json();
        setData(jsonData);
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
    <div className="flex flex-col mt-6 h-screen">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>
        <div className="w-5/6 p-4   mt-11 overflow-auto">
          <div className="container mx-auto">
            {data.length > 0 ? (
              data.map((company, index) => (
                <div
                  key={index} // Assuming `index` is unique for each company, adjust if needed
                  onClick={() => openModal(company)}
                  className="bg-white shadow-md border-b-2 border-black  p-6 mb-6 cursor-pointer"
                >
                  {company.company.map((item, skuId) => (
                    <div key={skuId} className="bg-gray-100 p-4 rounded mb-2">
                      <p className="mb-1">
                        <span className="font-semibold">Company Name:</span>{" "}
                        {item.companyName}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Bio:</span> {item.bio}
                      </p>
                      <h3 className="text-lg font-semibold mb-2">Jobs:</h3>
                      <p className="mb-1">
                        <span className="font-semibold">Job Description:</span>{" "}
                        {company.JobDescription}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Salary:</span>{" "}
                        {company.SalaryRange}
                      </p>
                      <p className="mb-1">
                        <span className="font-semibold">Location:</span>{" "}
                        {company.JobLocation}
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
