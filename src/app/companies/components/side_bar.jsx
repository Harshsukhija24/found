import Link from "next/link";

const Sidebar = () => {
  return (
    <aside className="bg-white fixed mt-10 text-black w-36 h-4/5 flex flex-col justify-between p-4">
      <div className="mt-9 ">
        <Link
          href="/companies/companyProfile/Overview"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Profile
        </Link>

        <Link
          href="/companies/Postjob"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Post a Job
        </Link>
        <Link
          href="/companies/PostedJob"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Posted Job
        </Link>
        <Link
          href="/companies/applicants"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Applicants
        </Link>
        <Link
          href="/companies/messages"
          className="block py-4 px-6 mb-4 hover:bg-sky-400"
        >
          Messages
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
