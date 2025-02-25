"use client";
import React, { useEffect, useState } from "react";
import Modal from "../../components/Modal_apply";
import Nav from "../../components/Nav";
import Sidebar from "../../components/SidebarCanidates";
import { useSession } from "next-auth/react";

const Page = ({ params: { userId } }) => {
  const [data, setData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, status } = useSession();
  console.log("session", session);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (status === "authenticated" && session?.user?.userId) {
          const response = await fetch(
            `/api/candidates/Applied/${session.user.userId}`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          const jsonData = await response.json();
          setData(jsonData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [session, status]);

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
        <div className="w-5/6 p-2 mt-16  overflow-auto">
          {/* Page content */}
          {data.length > 0 ? (
            data.map((item, index) => {
              const companyData = item.companyData;
              const companyInfo = companyData?.company?.[0];
              const info = companyData?.info?.[0];

              if (!companyInfo) {
                return null; // Skip rendering if company info is missing
              }

              return (
                <div
                  key={index}
                  className="bg-white shadow-md border-b-2 border-black rounded p-4 mb-4"
                  onClick={() => openModal(item)}
                >
                  <h2 className="text-xl font-bold">
                    {companyInfo.companyName}
                  </h2>
                  <p className="text-gray-600">{companyInfo.bio}</p>
                  {info && <p className="text-gray-600">{info.location}</p>}
                  <p className="text-gray-600">{companyData.JobDescription}</p>
                  <p className="text-gray-600">{companyData.SalaryRange}</p>
                </div>
              );
            })
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
    </div>
  );
};

export default Page;
