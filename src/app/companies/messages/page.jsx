import React from "react";
import Sidebar from "../components/side_bar";
import Nav_bar from "../components/Nav_Bar";

const page = () => {
  return (
    <div>
      <div>
        <Nav_bar />
      </div>
      <div>
        <Sidebar />
      </div>
    </div>
  );
};

export default page;
