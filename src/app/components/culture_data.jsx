"use client";
import React, { useEffect, useState } from "react";

const CultureData = () => {
  const [culture, setCulture] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCulture = async () => {
      try {
        const response = await fetch("/api/Profile/Culture");
        if (!response.ok) {
          throw new Error("API not working");
        }
        const data = await response.json();
        setCulture(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCulture();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center mt-4">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Culture</h1>
      <ul className="space-y-4">
        {culture.map((item) => (
          <li key={item._id} className="p-4 border rounded-lg shadow">
            <h2 className="text-2xl font-semibold">{item.nextJob}</h2>
            <p className="mt-2">
              <strong>Motivate:</strong> {item.motivate}
            </p>
            <p className="mt-2">
              <strong>Future:</strong> {item.future}
            </p>
            <p className="mt-2">
              <strong>Environment:</strong> {item.environment}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CultureData;
