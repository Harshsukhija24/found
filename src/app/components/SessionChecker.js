// components/SessionChecker.js
import { useSession, signIn, signOut } from "next-auth/react";

export default function SessionChecker() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return (
      <>
        <p>You are not signed in</p>
        <button onClick={() => signIn()}>Sign in</button>
      </>
    );
  }

  return (
    <>
      <p>Signed in as {session.user.email}</p>
      <button onClick={() => signOut()}>Sign out</button>
    </>
  );
}
