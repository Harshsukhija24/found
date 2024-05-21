// pages/index.js
"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Home = () => {
  const [selectedContentIndex, setSelectedContentIndex] =
    useState("open to work");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const contents = [
    "open to work",
    "ready to work",
    "open to offer",
    "closed to offer",
  ];

  const handleSelectChange = (e) => {
    const newIndex = parseInt(e.target.value);
    setSelectedContentIndex(newIndex);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/Job">
              <Image
                src="https://i.pinimg.com/564x/09/13/79/0913791df5a8a7090c37b77a98277653.jpg"
                width={80}
                height={80}
                className="hover:shadow-lg transition duration-300 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-0 hover:translate-x-2 hover:scale-110"
              />
            </Link>
          </div>
          <div className="flex space-x-4">
            <Link href="/authentication/Logout">
              <span className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer">
                logout
              </span>
            </Link>
          </div>
          <div className="flex space-x-4 items-center">
            <form>
              <select
                className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
                onChange={handleSelectChange}
              >
                {contents.map((content, index) => (
                  <option key={index} value={index}>
                    {content}
                  </option>
                ))}
              </select>
            </form>
            <div className="ml-4 relative">
              <button
                onClick={toggleDropdown}
                onBlur={closeDropdown}
                className="flex items-center focus:outline-none"
              >
                <Image
                  src="https://i.pinimg.com/564x/7e/0d/0c/7e0d0c81b2350f630e3d2bd58c2ca888.jpg"
                  width={40}
                  height={40}
                  className="bg-none"
                />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg  flex flex-col">
                  <div className="right-0 mt-2 w-48 bg-white   flex flex-col">
                    <h6>personal</h6>
                    <Link href="/edit-profile">Edit Profile</Link>
                    <Link href="/about">About</Link>
                  </div>
                  <div className="right-0 mt-2 w-48 bg-white flex flex-col">
                    <h6>support</h6>
                    <Link href="/help">Help</Link>
                    <Link href="/logout">Logout</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Home;
