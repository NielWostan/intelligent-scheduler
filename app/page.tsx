import ChatBox from "@/components/chat-box";
import Games from "@/components/games";
import Header from "@/components/header";
import Schedule from "@/components/schedule";

export default async function Home() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-row h-full w-full">
        <Games />
        <div className="flex flex-col h-full w-1/2">
          <Schedule />
          <ChatBox />
        </div>
      </div>
    </div>
  );
}
