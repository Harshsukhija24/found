"use client";
import Nav_main from "@/app/components/Nav_main";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
const Page = () => {
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!firstname || !lastName || !email || !password) {
        throw new Error("All fields are necessary.");
      }

      const resUserExists = await fetch("/api/UserExits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (!resUserExists.ok) {
        throw new Error("Error checking user existence");
      }

      const { user } = await resUserExists.json();

      if (user) {
        throw new Error("User already exists.");
      }

      const res = await fetch("/api/Register/User", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: firstname,
          lastName,
          email,
          password,
        }),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      e.target.reset();
      router.push("/authentication/Login");
    } catch (error) {
      console.error("Registration failed:", error.message);
    }
  };

  return (
    <>
      <div>
        <Nav_main />
      </div>
      <div
        className="min-h-screen bg-cover bg-center flex items-center justify-evenly"
        style={{
          backgroundImage:
            'url("https://i.pinimg.com/474x/ca/d7/6d/cad76d75091745f0636572ff0cc027ad.jpg")',
        }}
      >
        <div className="max-w-md w-full p-8">
          <h1 className="text-center text-2xl font-bold mb-4">
            Create a New Account!
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex space-x-4">
              <div className="flex flex-col w-1/2">
                <label htmlFor="firstname" className="mb-1">
                  First Name
                </label>
                <input
                  id="firstname"
                  placeholder="Enter Your First Name"
                  type="text"
                  className="px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-1/2">
                <label htmlFor="lastName" className="mb-1">
                  Last Name
                </label>
                <input
                  id="lastName"
                  placeholder="Enter Your Last Name"
                  type="text"
                  className="px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="email" className="mb-1">
                Email
              </label>
              <input
                id="email"
                placeholder="Enter your email"
                type="text"
                className="px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="mb-1">
                Password
              </label>
              <input
                id="password"
                placeholder="Enter your password"
                type="password"
                className="px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Page;
