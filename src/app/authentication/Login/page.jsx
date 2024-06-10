"use client";
import Nav_main from "../../components/Nav_main";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("jobseeker"); // Default to job seeker
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await signIn("credentials", {
        email,
        password,
        userType,
        redirect: false,
      });

      if (response?.error) {
        setError("Invalid email or password.");
        console.log(response.error);
        return;
      }

      if (userType === "jobseeker") {
        router.push("/candidates/Job");
      } else if (userType === "company") {
        router.push("/companies/PostedJob"); // Change this to the company's dashboard route
      }
    } catch (error) {
      console.log("Error:", error);
      setError("An unexpected error occurred.");
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
          <h1 className="text-center text-2xl font-bold mb-4">Welcome back!</h1>
          {error && <p className="text-red-500">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label htmlFor="userType" className="mb-1">
                I am a:
              </label>
              <select
                id="userType"
                className="px-4 py-2 rounded-md focus:outline-none focus:border-blue-500"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="jobseeker">Job Seeker</option>
                <option value="company">Company</option>
              </select>
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
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
