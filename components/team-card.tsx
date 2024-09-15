import Link from "next/link";

function getStringAfterPipe(inputString: string) {
  const indexOfPipe = inputString.indexOf("|");

  if (indexOfPipe === -1) {
    return inputString;
  }

  return inputString.substring(indexOfPipe + 1).trim();
}

function createSlug(text: any) {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove whitespace from both ends
    .replace(/[^\w\s-]/g, "") // Remove special characters except for hyphens and spaces
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-"); // Ensure there's only one hyphen between words
}

export default function TeamCard({ item }: any) {
  return (
    <div className="flex border-t border-gray-300 even:bg-gray-50 hover:bg-gray-100 transition duration-200 ease-in-out">
      {/* Increased width for team name */}
      <div className="w-1/4 p-4 border-r border-gray-300">{item.team_name}</div>
      <div className="w-1/5 p-4 border-r border-gray-300">
        {getStringAfterPipe(item.division)}
      </div>
      <div className="w-1/5 p-4 border-r border-gray-300">
        {item.day_constraint_1}
      </div>
      <div className="w-1/5 p-4 border-r border-gray-300">
        {item.day_constraint_2}
      </div>
      <div className="w-1/5 p-4 border-r border-gray-300">
        {item.time_preference}
      </div>
      {/* Reduced width for the Actions */}
      <Link
        href={`/teams/${createSlug(item.team_name)}`}
        className="w-1/6 p-4 text-blue-500 hover:text-blue-700 transition duration-200 ease-in-out"
      >
        Edit
      </Link>
    </div>
  );
}
