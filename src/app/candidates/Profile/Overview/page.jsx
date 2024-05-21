import Nav_Home from "@/app/components/Nav_Home";
import Sidebar from "@/app/components/Sidebar";
import React from "react";
import Profile_data from "../../../components/Profile_data";
import CultureData from "@/app/components/culture_data";
import PreferencesData from "@/app/components/preference_data";

const page = () => {
  return (
    <div>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-2 text-white">
          <Sidebar />
        </div>
        <div className="col-span-10 flex flex-col">
          <div className=" p-4">
            <h1 className="text-xl  mb-0 font-bold">Edit your Found Profile</h1>
          </div>
          <div className="flex-grow  ">
            <Nav_Home />
          </div>
          <Profile_data />
          <CultureData />
          <PreferencesData />
        </div>
      </div>
    </div>
  );
};

export default page;
