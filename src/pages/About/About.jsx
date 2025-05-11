import React from "react";
import ToolPageLayout from "../../components/ToolPageLayout";
import GameCard from "./GameCard";

const games = [
  {
    title: "Iconia Defenders",
    description: "Our first commercial game! A Minimalist strategy tower defense game inspired by the old-school classics like Warcraft 3's custom maps and Desktop TD. Blended with modern rogue-lite mechanics",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2747820/ss_9e472fb139d74d6ff3c7cf2bd9bfd0a2c17da4e9.1920x1080.jpg?t=1732127011",
    url: "https://store.steampowered.com/app/2747820/Iconia_Defenders/?utm_source=gameUtilsWeb"
  },
  {
    title: "Coming soon",
    description: "A new game is coming soon! Checkout the social media links below to be notified!",
    image: "https://placehold.co/300x300?text=Coming+Soon...",
    url: "https://yourgame2.com"
  }
];

export default function About() {
  return (
    <ToolPageLayout
      title="About Me"
      description={`Hey! I'm Rodrigo Soria, indie game developer and founder of Anawim Studios. With six years in software development and a lifelong love for game design, I create fun experiences. Working alongside my amazing wife, I also build tools and share knowledge to support the game dev community!`}
      leftContent={
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-xl font-bold mb-4">Games I've Made</h2>
            <div className="flex flex-col gap-8">
              {games.map((game, idx) => (
                <GameCard key={idx} {...game} />
              ))}
            </div>
          </section>
        </div>
      }
      quickLinks={["home"]}
    />
  );
}
