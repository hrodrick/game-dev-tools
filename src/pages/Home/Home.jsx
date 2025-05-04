import React from "react";
import ToolCard from "./ToolCard";
import WebIcon from "../../Icons/WebIcon";
import XIcon from "../../Icons/XIcon";
import YoutubeIcon from "../../Icons/YoutubeIcon";
import LinkedInIcon from "../../Icons/RedditIcon";
import ShareIcon from "../../Icons/ShareIcon";
import DiscordIcon from "../../Icons/DiscordIcon";
import BlueSkyIcon from "../../Icons/BlueSkyIcon";

const DiscordSocial = { name: "Discord", url: "https://discord.gg/NG5XscM6yt", icon: () => <DiscordIcon className="size-10 fill-neutral-content" /> }

const socials = [
  { name: "Bluesky", url: "https://bsky.app/profile/rodrigosoria.bsky.social", icon: () => <BlueSkyIcon className="size-10 fill-neutral-content" /> },
  { name: "X (ex Twitter)", url: "https://x.com/Hrodrick54", icon: () => <XIcon className="size-10 fill-neutral-content" /> },
  { name: "Reddit", url: "https://www.reddit.com/user/Hrodrick-dev/", icon: () => <LinkedInIcon className="size-10 fill-neutral-content" />  },
  { name: "Website", url: "https://anawimstudios.com/", icon: () => <WebIcon className="size-10 fill-neutral-content" /> },
]

import { useState, useRef } from "react";

export default function Home() {
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef(null);
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl">GameDev Utils</h1>
      <h2 className="text-lg p-2">A collection of every day tools for game development</h2>
      <p className="text-sm p-2">Hi! I’m Rodrigo Soria, indie game developer and founder of Anawim Studios. After years of tackling the same game dev challenges (and tired of losing too many Python scripts), I built this space to gather the tools I use every day. I hope they make your development journey a little smoother and a lot more fun!</p>
      <div className="flex flex-col gap-4">

      <ToolCard
        title="Sprite Sheets | Atlas | Tilesets"
        description="Combine multiple images into one, divide a sprite sheet or icon set into individual images, or quickly identify the cell ID on big sprite sheets or icon sets"
        buttons={[
          { label: "Combine images", url: "/combine" },
          { label: "Split an image", url: "/split" },
          { label: "Cell Numberer", url: "/cell-numberer" },
        ]}
      />
      <ToolCard
        title="Audio"
        description="Only one now, but I'm planning to add a couple more"
        buttons={[
          { label: "Pitch Randomizer", url: "/pitch-randomizer" },
        ]}
      />
      <ToolCard
        title="Math & Dimensions"
        description="Anything related to screen resolutions, aspect ratios, math in general, device sizes, etc."
        buttons={[
          { label: "Aspect Ratio Calculator", url: "/aspect-ratio-calculator" },
          { label: "Safe Area Calculator", url: "/safe-area-calculator" },
        ]}
      />

      <ToolCard
        title="Recommended Assets"
        description="Assets I've worked with and recommend. Under constructions"
        buttons={[
          { label: "Sample button", url: "/" },
          { label: "Sample button", url: "/" },
        ]}
      />
      <p className="text-xl p-0">Missing a tool? Have an idea? Join our Discord and Let me know!</p>
      <a className="btn btn-ghost w-24 self-center md:self-start" key={DiscordSocial.name} href={DiscordSocial.url} target="_blank" rel="noopener noreferrer">
        {DiscordSocial.icon()}
      </a>
      <p className="text-xl p-0">Or send me a message on your favorite social media!</p>
      <div className="grid grid-cols-2 md:w-120 md:grid-cols-4 gap-2}">
        {socials.map((social) => (
          <a className="btn btn-ghost w-24" key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
            {social.icon()}
          </a>
        ))}
      </div>
      <p className="text-xl p-0">Know someone who could use these tools? Share it! They will love you!</p>
      <button
        className="btn w-full h-16 md:w-64 relative"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopied(true);
          clearTimeout(copiedTimeoutRef.current);
          copiedTimeoutRef.current = setTimeout(() => setCopied(false), 2000);
        }}
      >
        <ShareIcon className="size-8 md:size-4 fill-neutral-content" />
        Click to copy the link
        {copied && (
          <span className="absolute left-1/2 -translate-x-1/2 top-full mt-1 text-green-500 text-sm bg-base-100 rounded px-2 shadow">
            Copied!
          </span>
        )}
      </button>
      </div>
    </div>
  );
}