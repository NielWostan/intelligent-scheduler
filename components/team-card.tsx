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
    <div className="flex border-t border-black even:bg-gray-100">
      <div className="w-1/5 p-4 border-r border-black">{item.team_name}</div>
      <div className="w-1/5 p-4 border-r border-black">
        {getStringAfterPipe(item.division)}
      </div>
      <div className="w-1/5 p-4 border-r border-black">
        {item.day_constraint_1}
      </div>
      <div className="w-1/5 p-4 border-r border-black">
        {item.day_constraint_2}
      </div>
      <div className="w-1/5 p-4 border-r border-black">
        {item.time_preference}
      </div>
      <Link href={`/teams/${item.id}`} className="w-1/5 p-4 border-black">
        Edit
      </Link>
    </div>
  );
}
