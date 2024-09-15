import Content from "@/components/content";
import Header from "@/components/header";
import { initialPopulation } from "@/scripts/initial-population-mongodb";

export default async function Home() {
  // initialPopulation();

  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="flex flex-col h-4/5 w-full lg:flex-row">
        <Content />
      </div>
    </div>
  );
}
