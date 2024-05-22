import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-white fixed text-black w-36 h-4/5 flex flex-col justify-between p-4">
      <div className="mt-9 ">
        <Link
          href="/candidates/Home"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Home
        </Link>
        <Link
          href="/candidates/Profile"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Profile
        </Link>
        <Link
          href="/candidates/Job"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Job
        </Link>
        <Link
          href="/candidates/Applied"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Applied
        </Link>
        <Link
          href="/candidates/Messages"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Messages
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
