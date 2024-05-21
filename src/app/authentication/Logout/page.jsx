// SignOut.js
"use client";
import { SessionProvider, useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignOut() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/authentication/Login"); // Changed "/Login" to "/login" for consistency
    }
  }, [session, router]);

  const handleSignOut = async () => {
    await signOut();
    router.push("/authentication/Login"); // Changed "/Login" to "/login" for consistency
  };

  return (
    <SessionProvider session={session}>
      {" "}
      {/* Wrap your component with SessionProvider */}
      <div className="flex items-center justify-center min-h-screen bg-white text-black">
        {session ? (
          <div className="text-center">
            <p className="text-xl mb-4">Hello, {session.user.name}!</p>
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
    </SessionProvider>
  );
}
