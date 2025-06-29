import React from "react";
import { Link } from "react-router-dom";
import ToolCard from "./ToolCard";

import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col gap-4">
      <header className="flex flex-col gap-2">
        <h1 className="text-4xl">Game Dev Tools</h1>
        <h2 className="text-lg p-2">A collection of every day tools for game development</h2>
        <p className="text-sm p-2">Hi! I'm Rodrigo Soria, indie game developer and founder of Anawim Studios. After years of tackling the same game dev challenges (and tired of losing too many Python scripts), I built this space to gather the tools I use every day. I hope they make your game dev journey a little smoother and a lot more fun! <br /> Want to know more or collaborate? Check out the <Link to="/about" className="link">about page</Link>! </p>
      </header>
      <ToolCard
        title="Sprite Sheets | Atlas | Tilesets"
        description="Combine multiple images into one, divide a sprite sheet or icon set into individual images, or quickly identify the cell ID on big sprite sheets or icon sets"
        buttons={[
          { label: "Combine images", url: "/combine" },
          { label: "Split an image", url: "/split" },
          { label: "Cell Identifier", url: "/cell-numberer" },
        ]}
      />
      <ToolCard
        title="Audio"
        description="Tired of double-clicking audio files to play them? Waiting too much for the media player to load? Just try these tools and you'll never go back!"
        buttons={[
          { label: "Pitch Randomizer", url: "/pitch-randomizer" },
          { label: "Instant Audio Pad", url: "/instant-audio-pad" },
        ]}
      />
      <ToolCard
        title="Math & Dimensions"
        description="Anything related to screen resolutions, aspect ratios, math in general, device sizes, etc."
        buttons={[
          { label: "Aspect Ratio Calculator", url: "/aspect-ratio-calculator" },
          { label: "Safe Area Calculator", url: "/safe-area-calculator" },
          { label: "Common Resolutions & Aspect Ratios", url: "/resolutions-by-ratio" },
        ]}
      />
      <ToolCard
        title="Recommendations"
        description="Assets I personally worked with and recommend for game development. Many of them I use daily. Also, check out the About site :)"
        buttons={[
          { label: "Recommended Assets", url: "/recommended-assets" },
          { label: "About", url: "/about" },
        ]}
      />
      <Footer />
    </div>
  );
}