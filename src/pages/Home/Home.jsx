import React from "react";
import ToolCard from "./ToolCard";

import Footer from "../../components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <h1 className="text-4xl">GameDev Utils</h1>
      <h2 className="text-lg p-2">A collection of every day tools for game development</h2>
      <p className="text-sm p-2">Hi! I’m Rodrigo Soria, indie game developer and founder of Anawim Studios. After years of tackling the same game dev challenges (and tired of losing too many Python scripts), I built this space to gather the tools I use every day. I hope they make your game dev journey a little smoother and a lot more fun!</p>
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
        description="Assets I've worked with and recommend. Under construction"
        buttons={[
          { label: "Sample button", url: "/" },
          { label: "Sample button", url: "/" },
        ]}
      />
      <Footer />
      </div>
    </div>
  );
}