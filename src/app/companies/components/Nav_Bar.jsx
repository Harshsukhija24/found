"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setSelectedActiveIndex } from "@/app/redux/ActiveSlice"; // Import your action
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const selectedActiveIndex = useSelector(
    (state) => state.active.selectedActiveIndex
  );
  const contents = useSelector((state) => state.active.active); // Accessing the `active` array
  const dispatch = useDispatch();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleSelectChange = (e) => {
    const newIndex = parseInt(e.target.value, 10);
    dispatch(setSelectedActiveIndex(newIndex));
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-2">
        <div className="flex justify-between items-center">
          <div>
            <Link href="/companies/PostedJob">
              <Image
                src="https://i.pinimg.com/564x/09/13/79/0913791df5a8a7090c37b77a98277653.jpg"
                width={80}
                height={80}
                className="hover:shadow-lg transition duration-300 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:-translate-y-0 hover:translate-x-2 hover:scale-110"
              />
            </Link>
          </div>

          <div className="flex space-x-4 items-center">
            <form>
              <select
                value={selectedActiveIndex} // Set value to selected index
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
            <div className="ml-4 relative" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
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
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg flex flex-col">
                  <div className="flex flex-col p-2">
                    <h6 className="font-semibold">Personal</h6>
                    <Link href="/edit-profile" className="mt-1">
                      Edit Profile
                    </Link>
                    <Link href="/about" className="mt-1">
                      About
                    </Link>
                  </div>
                  <div className="flex flex-col p-2">
                    <h6 className="font-semibold">Support</h6>
                    <Link href="/help" className="mt-1">
                      Help
                    </Link>
                    <Link href="/authentication/Logout" className="mt-1">
                      Logout
                    </Link>
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
