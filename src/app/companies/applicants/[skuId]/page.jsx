"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "../../components/SidebarCompany"; // Adjusted import
import Nav from "../../components/Nav_Bar"; // Adjusted import
import { useRouter } from "next/navigation";

const Page = ({ params: { skuId } }) => {
  const [userData, setUserData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`/api/candidates/Summary/${skuId}`);
      const data = await response.json();
      setUserData(data);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col mt-6">
      <div className="w-full">
        <Nav />
      </div>
      <div className="flex flex-1">
        <div className="w-1/6 py-4 px-4">
          <Sidebar />
        </div>

        <div className="bg-white p-4 w-2/3 mt-20 rounded-lg shadow-md">
          <ul>
            {userData.length > 0 ? (
              userData.map((user) =>
                user.profile && user.profile.length > 0 ? (
                  <li
                    key={user.skuId}
                    onClick={() =>
                      router.push(
                        `/companies/applicants/${user.skuId}/${user.profile[0].userId}`
                      )
                    }
                  >
                    {user.profile.map((item, profileIndex) => (
                      <div
                        key={profileIndex}
                        className="border-2 border-black mb-2 p-2"
                      >
                        <strong>Name:</strong> {item.name}
                        <br />
                        <strong>Bio:</strong> {item.bio}
                        <br />
                        <strong>Skills:</strong> {item.skills}
                        <br />
                        <p>
                          <strong>Cover Letter:</strong>{" "}
                          {user.coverLetter || "Not provided"}
                        </p>
                      </div>
                    ))}
                  </li>
                ) : (
                  <li key={user.skuId}></li>
                )
              )
            ) : (
              <li>No data available</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;
