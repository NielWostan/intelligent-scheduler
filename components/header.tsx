import Link from "next/link";

export default function Header() {
  return (
    <div className="w-full h-1/5 border border-black flex flex-col items-center justify-between">
      <Link href="/" className="text-4xl border border-black mt-12">
        Intelligent Scheduler
      </Link>
      <div className="flex w-full border border-black justify-end">
        <Link
          href="/teams/add-team"
          className="border border-black p-2 w-auto px-6"
        >
          Add Team
        </Link>
        <Link href="/teams" className="border border-black p-2 w-auto px-6">
          Manage Teams
        </Link>
        <button className="border border-black p-2 w-auto px-6">
          Export Schedule
        </button>
      </div>
    </div>
  );
}
