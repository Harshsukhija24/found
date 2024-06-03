import React from "react";
import Sidebar from "../../components/side_bar";
import Nav_bar from "../../components/Nav_Bar";
import ProfileNav from "../../components/ProfileNav";

const page = () => {
  return (
    <div>
      <div>
        <Nav_bar />
      </div>
      <div>
        <Sidebar />
      </div>
      <div>
        <ProfileNav />
      </div>
    </div>
  );
};

export default page;
