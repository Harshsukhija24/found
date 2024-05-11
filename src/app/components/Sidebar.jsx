import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-white text-black  w-36  h-3/5 flex flex-col justify-between">
      <div className="mt-8">
        <Link href="/Home" className="block py-6 px-6 hover:bg-sky-400">
          Home
        </Link>
        <Link href="/Profile" className="block py-6 px-6 hover:bg-sky-400">
          Profile
        </Link>
        <Link href="/Job" className="block py-6 px-6 hover:bg-sky-400">
          Job
        </Link>
        <Link href="/Applied" className="block py-6 px-6 hover:bg-sky-400">
          Applied
        </Link>
        <Link href="/Messages" className="block py-6 px-6 hover:bg-sky-400">
          Messages
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
