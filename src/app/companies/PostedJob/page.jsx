import React from "react";
import Nav_bar from "../components/Nav_Bar";
import Sidebar from "../components/side_bar";

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
