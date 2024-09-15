import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full h-1/5 bg-gray-100 shadow-md flex flex-col items-center justify-between py-4 z-40">
      {/* Title */}
      <Link href="/" className="text-4xl font-semibold text-blue-600 mt-4">
        Intelligent Scheduler
      </Link>

      {/* Navigation Links */}
      <div className="flex w-full max-w-lg space-x-4 mt-4 justify-center">
        <Link
          href="/teams/add-team"
          className="flex-grow bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition text-center"
        >
          Add Team
        </Link>
        <Link
          href="/teams"
          className="flex-grow bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition text-center"
        >
          Manage Teams
        </Link>
        <button className="flex-grow bg-blue-500 text-white p-2 rounded hover:bg-blue-700 transition text-center">
          Export Schedule
        </button>
      </div>
    </div>
  );
}
