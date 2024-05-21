import React from "react";
import Sidebar from "../../components/Sidebar";
import Nav_Home from "../../components/Nav_Home";
import Nav from "../../components/Nav";

const Page = () => {
  return (
    <div className="grid grid-cols-12 h-screen">
      <Nav />
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
      </div>
    </div>
  );
};

export default Page;
