import { useState, useRef } from "react";
import WebIcon from "../Icons/WebIcon";
import XIcon from "../Icons/XIcon";
import LinkedInIcon from "../Icons/RedditIcon";
import ShareIcon from "../Icons/ShareIcon";
import DiscordIcon from "../Icons/DiscordIcon";
import BlueSkyIcon from "../Icons/BlueSkyIcon";

const DiscordSocial = { name: "Discord", url: "https://discord.gg/NG5XscM6yt", icon: () => <DiscordIcon className="size-10 fill-neutral-content" /> }

const socials = [
  { name: "Bluesky", url: "https://bsky.app/profile/rodrigosoria.bsky.social", icon: () => <BlueSkyIcon className="size-10 fill-neutral-content" /> },
  { name: "X (ex Twitter)", url: "https://x.com/Hrodrick54", icon: () => <XIcon className="size-10 fill-neutral-content" /> },
  { name: "Reddit", url: "https://www.reddit.com/user/Hrodrick-dev/", icon: () => <LinkedInIcon className="size-10 fill-neutral-content" />  },
  { name: "Website", url: "https://anawimstudios.com/", icon: () => <WebIcon className="size-10 fill-neutral-content" /> },
]

export default function Footer() {
  const [copied, setCopied] = useState(false);
  const copiedTimeoutRef = useRef(null);
    return (
        <footer className="flex flex-col gap-4">
            <div className="divider mb-0" />
            <p className="text-sm p-0">Missing a tool? Have an idea? Join our Discord and Let me know!</p>
            <a className="btn btn-ghost w-24 self-center md:self-start" key={DiscordSocial.name} href={DiscordSocial.url} target="_blank" rel="noopener noreferrer">
                {DiscordSocial.icon()}
            </a>
            <p className="text-sm p-0">Or send me a message on your favorite social media!</p>
            <div className="grid grid-cols-2 md:w-120 md:grid-cols-4 gap-2 self-center md:self-start">
                {socials.map((social) => (
                    <a className="btn btn-ghost w-24" key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                        {social.icon()}
                    </a>
                ))}
            </div>
            <p className="text-sm p-0">Know someone who could use these tools? Share it! They will love you!</p>
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
        </footer>
    )
}
