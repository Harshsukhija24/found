import React from "react";
import Link from "next/link";

const ProfileNav = () => {
  return (
    <div className="flex justify-center items-center mt-12 p-2 border-b-2 border-black">
      <div className="flex space-x-4">
        <Link href="/companies/companyProfile/Overview">
          <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200">
            Overview
          </div>
        </Link>
        <Link href="/companies/companyProfile/Profile">
          <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200">
            Company
          </div>
        </Link>
        <Link href="/companies/companyProfile/founder">
          <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200">
            Team
          </div>
        </Link>
        <Link href="/companies/companyProfile/Info">
          <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-gray-200">
            Info
          </div>
        </Link>
      </div>
    </div>
  );
};

export default ProfileNav;
