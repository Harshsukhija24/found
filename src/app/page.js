import React from "react";
import Nav_main from "./components/Nav_main";
import Image from "next/image";

const Page = () => {
  return (
    <div className="flex flex-col h-screen">
      <Nav_main />
      <div className="flex-grow flex justify-center items-center">
        <div className="relative w-full ">
          <Image
            src="https://i.pinimg.com/736x/7f/7e/3b/7f7e3ba755112b07cd989cc1d76fdccb.jpg"
            width={600}
            height={600}
            className="w-full h-full rounded-lg"
          />
          {/* Buttons 

          <div className="absolute bottom-40   left-1/2 transform -translate-x-1/2 flex  space-x-96 ">
            <button className="px-4 py-2  bg-blue-400 text-white rounded">
              Button 1
            </button>
            <button className="px-4 py-2 bg-blue-400 text-white rounded">
              Button 2
            </button>
          </div>
  */}
        </div>
      </div>
    </div>
  );
};

export default Page;
