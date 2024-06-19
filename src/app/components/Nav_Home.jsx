import Link from "next/link";
import React from "react";

const Nav_Home = () => {
  return (
    <div className="flex justify-center items-center mt-12 p-2 border-b-2 border-black">
      <div className="flex space-x-4">
        <Link href="/candidates/Profile/Overview">
          <div className="px-3 py-2 rounded-lg">Overview</div>
        </Link>
        <Link href="/candidates/Profile/Profile">
          <div className="px-3 py-2 rounded-lg">Profile</div>
        </Link>

        <Link href="/candidates/Profile/Preference ">
          <div className="px-3 py-2 rounded-lg">Preferences</div>
        </Link>
        <Link href="/candidates/Profile/Culture">
          <div className="px-3 py-2 rounded-lg">Culture</div>
        </Link>
      </div>
    </div>
  );
};

export default Nav_Home;
