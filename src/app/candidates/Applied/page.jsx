"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal_apply";
import Nav from "../../components/Nav";
import Sidebar from "../../components/Sidebar";
//import { useRouter } from "next/navigation";

const Page = () => {
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/candidates/Applied");
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
    <div className="flex">
      <Nav />
      <div className="w-1/6 py-2 px-4">
        <Sidebar />
      </div>
      <div className="w-5/6 mt-20 p-4">
        {/* Page content */}
        {data.length > 0 ? (
          data.map((company, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded p-4 mb-4"
              onClick={() => openModal(company)}
            >
              <h2 className="text-xl font-bold">{company.company_name}</h2>
              <p className="text-gray-600">{company.description}</p>
              <p className="text-gray-600">{company.location}</p>
              <p className="text-gray-600">{company.salary}</p>
            </div>
          ))
        ) : (
          <p>No data available.</p>
        )}
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          company={selectedCompany}
        />
      </div>
    </div>
  );
};

export default Page;
