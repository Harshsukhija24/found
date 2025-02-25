"use client";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("Session data:", session); // Log session data for debugging
    if (status === "loading") {
      return; // Do nothing while loading
    }
    if (!session) {
      router.push("/authentication/Login"); // Navigate to login if no session
    }
  }, [session, status, router]);

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push("/authentication/Login");
  };

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-white text-black">
      {session ? (
        <div className="text-center">
          <p className="text-xl mb-4">
            Hello, {session.user?.firstName || "User"}!
          </p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
