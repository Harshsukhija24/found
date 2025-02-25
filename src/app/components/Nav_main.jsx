// import Image from "next/image";
// import Link from "next/link";
// import React from "react";

// const Nav_main = () => {
//   return (
//     <nav className="flex items-center justify-between px-4 py-2 bg-white text-black shadow-md">
//       <div>
//         <Image
//           src="https://i.pinimg.com/564x/57/b3/c5/57b3c508a22f3b0845e59882762f32fb.jpg"
//           width={48}
//           height={48}
//           className="rounded-full"
//           alt="Logo"
//         />
//       </div>
//       <div className="flex space-x-4">
//         <Link href="/authentication/Registration_job">
//           <span className="text-black hover:text-blue-500 cursor-pointer">
//             For Job Seekers
//           </span>
//         </Link>
//         <Link href="/authentication/Registration_companies">
//           <span className="text-black hover:text-blue-500 cursor-pointer">
//             For Companies
//           </span>
//         </Link>
//       </div>
//       <div className="flex space-x-4">
//         <Link href="/authentication/Login">
//           <span className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer">
//             Log In
//           </span>
//         </Link>
//       </div>
//     </nav>
//   );
// };

// export default Nav_main;
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for the menu

const Nav_main = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white text-black shadow-md">
      <div>
        <Image
          src="https://i.pinimg.com/564x/57/b3/c5/57b3c508a22f3b0845e59882762f32fb.jpg"
          width={48}
          height={48}
          className="rounded-full"
          alt="Logo"
        />
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-4">
        <Link href="/authentication/Registration_job">
          <span className="text-black hover:text-blue-500 cursor-pointer">
            For Job Seekers
          </span>
        </Link>
        <Link href="/authentication/Registration_companies">
          <span className="text-black hover:text-blue-500 cursor-pointer">
            For Companies
          </span>
        </Link>
      </div>

      <div className="hidden md:flex space-x-4">
        <Link href="/authentication/Login">
          <span className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer">
            Log In
          </span>
        </Link>
      </div>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden text-black"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white shadow-md flex flex-col items-center space-y-4 py-4 md:hidden">
          <Link href="/authentication/Registration_job">
            <span
              className="text-black hover:text-blue-500 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              For Job Seekers
            </span>
          </Link>
          <Link href="/authentication/Registration_companies">
            <span
              className="text-black hover:text-blue-500 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              For Companies
            </span>
          </Link>
          <Link href="/authentication/Login">
            <span
              className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 cursor-pointer"
              onClick={() => setIsMenuOpen(false)}
            >
              Log In
            </span>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Nav_main;
