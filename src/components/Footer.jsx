import WebIcon from "../Icons/WebIcon";
import XIcon from "../Icons/XIcon";
import LinkedInIcon from "../Icons/RedditIcon";
import ShareIcon from "../Icons/ShareIcon";
import DiscordIcon from "../Icons/DiscordIcon";
import BlueSkyIcon from "../Icons/BlueSkyIcon";
import CopiedTooltip, { useCopyWithTooltip } from "./CopiedTooltip";


const DiscordSocial = { name: "Discord", url: "https://discord.gg/NG5XscM6yt", icon: () => <DiscordIcon className="size-10 fill-neutral-content" /> }

const socials = [
  { name: "Bluesky", url: "https://bsky.app/profile/rodrigosoria.bsky.social", icon: () => <BlueSkyIcon className="size-10 fill-neutral-content" /> },
  { name: "X (ex Twitter)", url: "https://x.com/Hrodrick54", icon: () => <XIcon className="size-10 fill-neutral-content" /> },
  { name: "Reddit", url: "https://www.reddit.com/user/Hrodrick-dev/", icon: () => <LinkedInIcon className="size-10 fill-neutral-content" />  },
  { name: "Website", url: "https://anawimstudios.com/", icon: () => <WebIcon className="size-10 fill-neutral-content" /> },
]

export default function Footer() {
    const [CopiedText, copyWithTooltip] = useCopyWithTooltip();
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
            <div className="relative inline-block self-center md:self-start">
                <button className="btn h-16 md:w-64" onClick={() => copyWithTooltip(window.location.href)}>
                    <ShareIcon className="size-8 md:size-4 fill-neutral-content" />
                    Click to copy the link
                </button>
                <CopiedTooltip show={CopiedText === window.location.href} />
            </div>
            <div className="flex flex-col gap-4 relative self-center md:self-start">
                <p className="text-sm p-0">If you would like to financially support the project, feel free to use the following button:</p>
                <a href='https://ko-fi.com/rosodev?utm_source=gameDevUtilsWeb' target='_blank'>
                    <button className="btn btn-content-neutral w-64 h-16">
                        <img className="h-5" src='/assets/icons/ko-fi.webp' alt='Buy Me a Coffee at ko-fi.com' />
                        Buy me a coffee
                    </button>
                </a>
            </div>
            <p className="text-sm p-0">Did you reach this far? Wow! Thanks for reading! I truly appreciate it! I hope these tools are helpful for you and your projects!</p>
        </footer>
    )
}
