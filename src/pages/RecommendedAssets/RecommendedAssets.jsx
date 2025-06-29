import React from "react";
import ToolPageLayout from "../../components/ToolPageLayout";
import { getAssetPath } from "../../Utils/assetPath";

const categories = [
  {
    title: "Animation and Juiciness",
    description: "Skyrocket your game's quality with these assets!",
    assets: [
      {
        title: "Feel",
        description: "A must have. Quickly Add juiciness to your project, from animations to screen shakes, sound, and more!",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/afb05bd7-5677-40eb-a37f-4a8c07a3ab4b.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/tools/particles-effects/feel-183370"
      },
      {
        title: "All in 1 Sprite Shader",
        description: "Another must for 2D games! It is an easy to use shader to add tons of effects to your 2D sprites",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/6fa0379d-47f7-4fff-af5d-cb9864a6478e.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/vfx/shaders/all-in-1-sprite-shader-156513"
      },
      {
        title: "UI Particle Image",
        description: "A particle system for UGUI, essential to create any kind of fun effects directly on your game's UI",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/a132e444-8444-431f-aa3b-7373241e69ef.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/tools/gui/ui-particle-image-235001"
      },
      {
        title: "Dotween",
        description: "A powerful & free C# animation system for Unity, Smoothly animate values, colors, positions, etc.",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/d28cf7c5-1e07-4494-81e3-bc3ca7539da6.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/tools/animation/dotween-hotween-v2-27676",
        tags: ["free"]
      },
      {
        title: "Text Animator",
        description: "Another must for any kind of game. Animate & stylize text, characters, etc. Just by adding tags to your text!",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/bba3ab88-ed97-45a4-be0d-9b4b1e6552d7.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/tools/gui/text-animator-for-unity-254677"
      },
      {
        title: "Super Text Mesh",
        description: "If you want to have curved text or texts that deforms in weird ways, then this is your asset. An alternative to TMP",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/4978be9f-7c86-4262-8818-2d1d56194618.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/tools/gui/super-text-mesh-57995"
      }
    ]
  },
  {
    title: "Game Mechanics",
    description: "Don't reinvent the wheel, use these assets and tools to kickstart your game!",
    assets: [
      {
        title: "Linework",
        description: "Quick and Easy outlines for any kind of game and shape. I'm using it for my upcoming game!",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/75e34433-c624-44d9-befd-eef4bed4c406.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/vfx/shaders/linework-outlines-and-edge-detection-294140"
      },
      {
        title: "A* Pathfinding Project Pro",
        description: "A must have for any game with NPCs or units moving around a map. Works in both 2D and 3D!",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/a5c0fc6f-8b98-432f-872c-92182f31b1a0.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/tools/behavior-ai/a-pathfinding-project-pro-87744"
      },
      {
        title: "CRS - Choose Reward System",
        description: "Ey, I made this one! Quickly implement a reward selection system in your game, like Hades' booms.",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/14adc5c4-743c-47c3-898e-4e785dbaa1e3.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/tools/game-toolkits/crs-choose-reward-system-276478"
      },
      {
        title: "Easy Grid Builder Pro",
        description: "Quickly make a build system based on grids! Works in 2D and 3D, and allows to build vertical grids too!",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/3477039d-318c-4027-951e-b7bdf88519e6.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/tools/game-toolkits/easy-grid-builder-pro-239234"
      }
    ]
  },
  {
    title: "Game assets",
    description: "2D and 3D assets, including characters, tiles, icons, and any kind of objects.",
    assets: [
      {
        title: "Kenney Game Assets",
        description: "A huge collection of free 2D and 3D assets, perfect for prototyping and even commercial games!",
        image: "https://kenney.nl/data/img/logo@2.png",
        url: "https://kenney.nl/assets?utm_source=game-dev-tools",
        tags: ["free"]
      },
      {
        title: "Vector Game Icons",
        description: "A huge collection of 4000+ beautiful free game icons made in vector format, ideal for any genre.",
        image: getAssetPath("/assets/recommendedTools/Game-icons-net.png"),
        url: "https://game-icons.net?utm_source=game-dev-tools",
        tags: ["free"]
      },
      {
        title: "Polygon Arsenal",
        description: "A collection of low-poly effects (and some not so low). Great asset for quick all-purpose particle effects. Long text asld haisaoshdoaps asdh ashdla uoasd kashd iasud ",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/1dbb8c76-c8ec-4609-b733-1c5eced3c18f.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/vfx/particles/polygon-arsenal-109286"
      },
      {
        title: "Lana's Casual RPG VFX",
        description: "If you are going for a more 'stylized' look, these effects are perfect, don't let the title deceive you!",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/db26fb1c-6b0c-43f4-8bc7-e4d6f1d8e638.webp",
        url: "https://prf.hn/click/camref:1101l58cFR/destination:https://assetstore.unity.com/packages/vfx/particles/casual-rpg-vfx-239285"
      }
    ]
  }
];

function AssetCard({ asset }) {
  return (
    <a
      href={asset.url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-44 h-68 flex flex-col bg-base-200 rounded-lg p-3 shadow hover:bg-base-300 transition-colors border border-base-300"
    >
      <div className="relative w-full h-24">
        {asset.image && (
          <img src={asset.image} alt={asset.title}
            className="w-full h-24 object-contain aspect-square rounded bg-base-100 border"
            loading="lazy"
          />
        )}
        {Array.isArray(asset.tags) && asset.tags.length > 0 && (
          <div className="absolute top-1 right-1 flex flex-col gap-1 z-10">
            {asset.tags.map((tag, idx) => (
              <span key={tag + idx} className={`px-2 py-0.5 rounded text-xs font-bold shadow-md ${tag === 'free' ? 'bg-success text-success-content' : 'bg-success text-success-content'}`}>
                {tag === 'free' ? 'Free' : tag}
              </span>
            ))}
          </div>
        )}
      </div>
      <h3 className="text-center text-base font-semibold h-12 flex items-center justify-center mt-2 mb-1">
        {asset.title}
      </h3>
      <p className="h-24 flex-1 text-xs text-neutral-content line-clamp-4">
        {asset.description}
      </p>
      <div className="text-center text-xs text-primary mt-auto pt-2">Visit site</div>
    </a>
  );
}

export default function RecommendedAssets() {
  return (
    <ToolPageLayout
      title="Recommended Game Assets"
      description="Boost your game's quality with these hand-picked 2D and 3D assets that I use in my own projects.
                    High-quality, time-saving, and proven to help you build amazing games
                    
                    I'll keep this list updated with the best assets and tools I use, so stay tuned!"
      leftContent={
        <div className="flex flex-col gap-4">
          {categories.map((cat, idx) => (
            <section key={idx} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">{cat.title}</h2>
                <p className="text-sm text-neutral-content">{cat.description}</p>
              </div>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                {cat.assets.map((asset, j) => (
                  <AssetCard key={j} asset={asset} />
                ))}
              </div>
            </section>
          ))}
          <div>
            <p className="text-sm text-neutral-content">Note: As a Unity Affiliate, by buying the assets from these links you will be helping me to keep this website alive through affiliate commissions. It has 0 additional cost for you, and I really appreciate your support!</p>
          </div>
        </div>
      }
      quickLinks={["about", "home"]}
    />
  );
}
