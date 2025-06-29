import React from "react";
import ToolPageLayout from "../../components/ToolPageLayout";
import GameCard from "./GameCard";
import { getAssetPath } from "../../Utils/assetPath";

const games = [
  {
    title: "Brickotori",
    description: "A cozy brick building sandbox game! Coming soon! Join the newsletter to be notified about free beta testings, demos, and updates!",
    image: getAssetPath("/assets/games/brickotori-logo.png"),
    url: "https://anawimstudios.eo.page/brickotori?utm_source=game-dev-tools",
    btnText: "Join the newsletter!",
    btnStyle: "btn btn-neutral"
  },{
    title: "Iconia Defenders",
    description: "Our first commercial game! A Minimalist strategy tower defense game inspired by the old-school classics like Warcraft 3's custom maps and Desktop TD, but blended with modern rogue-lite mechanics & progression",
    image: "https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2747820/ss_9e472fb139d74d6ff3c7cf2bd9bfd0a2c17da4e9.1920x1080.jpg?t=1732127011",
    url: "https://store.steampowered.com/app/2747820/Iconia_Defenders/?utm_source=game-dev-tools",
    btnText: "Get it on Steam!",
    btnStyle: "btn btn-neutral"
  },
  {
    title: "CRS - Choose Reward System",
    description: <p>An easy to use tool to quickly implement a reward selection system in your game, like Hades' booms, or Vampire's survivors level rewards. <br />I use it on Iconia Defenders! Source code included!</p>,
    image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/14adc5c4-743c-47c3-898e-4e785dbaa1e3.webp",
    url: "https://assetstore.unity.com/packages/tools/game-toolkits/crs-choose-reward-system-276478?utm_source=game-dev-tools",
    btnText: "Get it on Unity's Asset Store!",
    btnStyle: "btn btn-neutral"
  }
];

export default function About() {
  return (
    <ToolPageLayout
      title="About Me"
      description={`Hey! I'm Rodrigo Soria, indie game developer and founder of Anawim Studios. With more than six years of experience in software development and a lifelong love for game design, I create fun experiences. Working alongside my amazing wife, I also like to build tools and share knowledge to support the game dev community!`}
      leftContent={
        <div className="flex flex-col gap-8">
          <section>
            <h2 className="text-xl font-bold mb-4">The Game Dev Tools initiative</h2>
            <p className="text-base whitespace-pre-line">As a game developer, I kept running into the same problem: needing a simple tool, googling around, and landing on cluttered websites filled with popups, full-screen ads, mandatory sign-up forms, and endless cookie walls. Just to get one small thing done. It was distracting, frustrating, and a waste of time.<br /> <br />
            <b className="italic">Game Dev Tools</b> is my answer to that. It's a clean, ad-free, and open-source space with the tools I wish I always had. It's a growing collection of quick, simple, and actually helpful utilities and resources built to save time, reduce friction, and keep you focused on what really matters: making great games.<br /> <br />
            <div className="divider"></div>
            <h2 className="text-xl font-bold mb-4">Support the project</h2>
            If you'd like to contribute ideas, share feedback, or just connect with other devs, <a href="https://discord.gg/NG5XscM6yt?utm_source=game-dev-tools" className="link">join us on Discord</a>. We're building a friendly community of creators helping each other out. You can also check out the <a href="https://github.com/hrodrick/game-dev-tools?utm_source=game-dev-tools" className="link">Github repository</a> to contribute to the project or report any issues you may find.<br />
            <br />
            Creating and maintaining this website takes a lot of time, and I'm doing it all for free. If you'd like to support the project, you can buy one of my games or paid tools listed below, or just send a donation through <a href="https://ko-fi.com/rosodev?utm_source=game-dev-tools" className="link">this Ko-fi link</a>. Every little bit helps keep this space growing and ad-free!</p>
          </section>
          <section className="flex flex-col gap-4">
            <h2 className="text-xl font-bold">Commercial Games & Tools I've made</h2>
            <p className="text-base">This is a collection of commercial games and tools I've created. With more to come!<br/>
              If you would like to support me, a purchase would be much appreciated, and you get something nice in exchange! :)</p>
            <div className="flex flex-col gap-8">
              {games.map((game, idx) => (
                <GameCard key={idx} game={game}/>
              ))}
            </div>
          </section>
        </div>
      }
      quickLinks={["recommendedAssets", "home"]}
    />
  );
}
