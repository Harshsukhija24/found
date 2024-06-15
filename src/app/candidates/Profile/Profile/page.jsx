"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Nav_Home from "@/app/components/Nav_Home";
import Sidebar from "@/app/components/Sidebar";

const Page = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [twitter, setTwitter] = useState("");
  const [company, setCompany] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [education, setEducation] = useState("");
  const [skills, setSkills] = useState("");
  const [achievement, setAchievement] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      if (status === "authenticated" && session?.user) {
        const userId = session.user.userId;
        try {
          const response = await fetch(`/api/Profile/Profile/${userId}`);
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }

          const data = await response.json();
          console.log("Fetched data:", data);

          if (data.length > 0) {
            const userProfile = data[0];
            setName(userProfile.name || "");
            setLocation(userProfile.location || "");
            setRole(userProfile.role || "");
            setBio(userProfile.bio || "");
            setWebsite(userProfile.website || "");
            setLinkedin(userProfile.linkedin || "");
            setGithub(userProfile.github || "");
            setTwitter(userProfile.twitter || "");
            setCompany(userProfile.company || "");
            setTitle(userProfile.title || "");
            setDescription(userProfile.description || "");
            setEducation(userProfile.education || "");
            setSkills(userProfile.skills || "");
            setAchievement(userProfile.achievement || "");
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };

    fetchData();
  }, [session, status]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session) {
      console.log("Unauthorized");
      return;
    }

    const userId = session.user.userId;
    const userProfile = {
      userId,
      name,
      location,
      role,
      bio,
      website,
      linkedin,
      github,
      twitter,
      company,
      title,
      description,
      education,
      skills,
      achievement,
    };

    try {
      const response = await fetch("/api/Profile/Profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      });

      if (!response.ok) {
        throw new Error(`Failed to save profile: ${response.statusText}`);
      }

      const putResponse = await fetch("/api/Profile/Profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userProfile),
      });

      if (!putResponse.ok) {
        throw new Error("Failed to update profile");
      }

      console.log("Profile updated successfully");
      setIsPopupVisible(true);
      setTimeout(() => setIsPopupVisible(false), 3000); // Hide popup after 3 seconds
    } catch (err) {
      console.error("Error:", err);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (!session || !session.user) {
    return <div>No user session found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="flex">
        <div className="w-1/5 text-white">
          <Sidebar />
        </div>
        <div className="w-4/5 p-4">
          <h1 className="text-xl font-bold mb-4">Edit your Found Profile</h1>
          <Nav_Home />
          <form onSubmit={handleSubmit}>
            {/* Form fields */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-bold mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="location"
                >
                  Where are you based
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="location"
                  type="text"
                  placeholder="Your Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            {/* More form fields */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label className="block text-sm font-bold mb-2" htmlFor="role">
                  Select your primary role
                </label>
                <select
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="">Select Role</option>
                  <option value="frontend">Frontend Developer</option>
                  <option value="backend">Backend Developer</option>
                  <option value="fullstack">Full Stack Developer</option>
                  <option value="devops">DevOps Engineer</option>
                  <option value="data">Data Scientist</option>
                  <option value="uiux">UI/UX Designer</option>
                </select>
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-bold mb-2" htmlFor="bio">
                  Your Bio
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="bio"
                  rows="4"
                  placeholder="Your Bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
            </div>
            {/* Website and LinkedIn */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="website"
                >
                  Website
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="website"
                  type="text"
                  placeholder="Your Website"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="linkedin"
                >
                  LinkedIn
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="linkedin"
                  type="text"
                  placeholder="Your LinkedIn Profile"
                  value={linkedin}
                  onChange={(e) => setLinkedin(e.target.value)}
                />
              </div>
            </div>
            {/* GitHub and Twitter */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="github"
                >
                  GitHub
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="github"
                  type="text"
                  placeholder="Your GitHub Profile"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="twitter"
                >
                  Twitter
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="twitter"
                  type="text"
                  placeholder="Your Twitter Profile"
                  value={twitter}
                  onChange={(e) => setTwitter(e.target.value)}
                />
              </div>
            </div>
            {/* Company and Title */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="company"
                >
                  Company
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="company"
                  type="text"
                  placeholder="Your Company"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="w-1/2 pl-2">
                <label className="block text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="title"
                  type="text"
                  placeholder="Your Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>
            {/* Description and Education */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="description"
                >
                  Description
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="description"
                  rows="4"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="education"
                >
                  Education
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="education"
                  type="text"
                  placeholder="Your Education"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                />
              </div>
            </div>
            {/* Skills and Achievement */}
            <div className="flex mb-4">
              <div className="w-1/2 pr-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="skills"
                >
                  Skills
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="skills"
                  type="text"
                  placeholder="Skills"
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                ></input>
              </div>
              <div className="w-1/2 pl-2">
                <label
                  className="block text-sm font-bold mb-2"
                  htmlFor="achievement"
                >
                  Achievement
                </label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="achievement"
                  rows="4"
                  placeholder="Achievement"
                  value={achievement}
                  onChange={(e) => setAchievement(e.target.value)}
                />
              </div>
            </div>
            {/* Save Button */}
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
          {isPopupVisible && (
            <div className="fixed bottom-0 right-0 mb-4 mr-4 p-4 bg-green-500 text-white rounded shadow-lg">
              Profile updated successfully!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;
