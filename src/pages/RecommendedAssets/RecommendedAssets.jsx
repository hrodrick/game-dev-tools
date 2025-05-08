import React from "react";
import ToolPageLayout from "../../components/ToolPageLayout";

// Example: categories with assets. Add or edit as needed.
const categories = [
  {
    title: "Animation and Juiciness",
    description: "Skyrocket your game's quality with these assets.",
    assets: [
      {
        title: "Feel",
        description: "A must have. One of the best tools to add juiciness to your project, not only animations, but screen shakes, sound management, vibrations, and more!",
        image: "https://assetstore.unity.com/packages/tools/particles-effects/feel-183370",
        url: "https://assetstore.unity.com/packages/tools/particles-effects/feel-183370"
      },
      {
        title: "All in 1 Sprite Shader",
        description: "Another must for 2D games! It is a shader to add tons of effects to your 2D sprites",
        image: "https://assetstore.unity.com/packages/tools/gui/ui-particle-image-235001",
        url: "https://assetstore.unity.com/packages/tools/gui/ui-particle-image-235001"
      },
      {
        title: "UI Particle Image",
        description: "A particle system for UGUI, essential to create any kind of fun effects directly on your game's UI",
        image: "https://assetstore.unity.com/packages/tools/gui/ui-particle-image-235001",
        url: "https://assetstore.unity.com/packages/tools/gui/ui-particle-image-235001"
      },
      {
        title: "Dotween",
        description: "A powerful & free animation system for Unity, Smoothly animate values (colors, vectors, positions, whatever) with ease in plain c#!",
        image: "https://assetstore.unity.com/packages/tools/animation/dotween-hotween-v2-27676",
        url: "https://assetstore.unity.com/packages/tools/animation/dotween-hotween-v2-27676"
      },
      {
        title: "Text Animator",
        description: "Another must for any kind of game. Animate & stylize text, characters, etc. Directly with string tags!",
        image: "https://assetstore.unity.com/packages/tools/gui/text-animator-for-unity-254677",
        url: "https://assetstore.unity.com/packages/tools/gui/text-animator-for-unity-254677"
      },
      {
        title: "Super Text Mesh",
        description: "If Text Animator is not enough, Super Text Mesh allows to extend the possibilities of your texts. But beware! It is an alternative version of TextMeshPro",
        image: "https://assetstore.unity.com/packages/tools/gui/super-text-mesh-57995",
        url: "https://assetstore.unity.com/packages/tools/gui/super-text-mesh-57995"
      }
    ]
  },
  {
    title: "Game Mechanics",
    description: "Don't reinvent the wheel, use these assets to help you implement game mechanics!",
    assets: [
      {
        title: "Linework",
        description: "Quick and Easy outlines for any kind of game and shape. I'm using it for my upcoming game!",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/75e34433-c624-44d9-befd-eef4bed4c406.webp",
        url: "https://assetstore.unity.com/packages/vfx/shaders/linework-outlines-and-edge-detection-294140"
      },
      {
        title: "A* Pathfinding Project Pro",
        description: "A must have for any game with NPCs or units moving around a map. Works in 2D and 3D!",
        image: "https://assetstore.unity.com/packages/tools/navigation/a-pathfinding-project-pro-126426",
        url: "https://assetstore.unity.com/packages/tools/navigation/a-pathfinding-project-pro-126426"
      },
      {
        title: "CRS - Choose Reward System",
        description: "Ey, I made this one! A simple tool to implement a reward selection system in your game, think of Hades' booms. Code included!",
        image: "https://assetstore.unity.com/packages/tools/game-toolkits/crs-choose-reward-system-276478",
        url: "https://assetstore.unity.com/packages/tools/game-toolkits/crs-choose-reward-system-276478"
      },
      {
        title: "Easy Grid Builder Pro",
        description: "Quickly make a build system based on grids. I give it a 4 stars, since it is quite hard to customize for special use cases, but still recommended!",
        image: "https://assetstore.unity.com/packages/tools/game-toolkits/easy-grid-builder-pro-239234",
        url: "https://assetstore.unity.com/packages/tools/game-toolkits/easy-grid-builder-pro-239234"
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
        url: "https://kenney.nl/assets"
      },
      {
        title: "Vector Game Icons",
        description: "A huge collection of 4000+ beautiful free game icons made in vector format, ideal for any genre.",
        image: "/assets/recommendedTools/Game-icons-net.png",
        url: "https://game-icons.net/"
      },
      {
        title: "Polygon Arsenal",
        description: "A collection of low-poly effects (and some not so low). Great asset for quick all-purpose particle effects. Long text asld haisaoshdoaps asdh ashdla uoasd kashd iasud ",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/1dbb8c76-c8ec-4609-b733-1c5eced3c18f.webp",
        url: "https://assetstore.unity.com/packages/vfx/particles/polygon-arsenal-109286"
      },
      {
        title: "Lana's Casual RPG VFX",
        description: "If you are going for a more 'stylized' look, these effects are perfect, don't let the title deceive you!",
        image: "https://assetstorev1-prd-cdn.unity3d.com/key-image/db26fb1c-6b0c-43f4-8bc7-e4d6f1d8e638.webp",
        url: "https://assetstore.unity.com/packages/vfx/particles/casual-rpg-vfx-239285"
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
      className="w-44 h-64 flex flex-col bg-base-200 rounded-lg p-3 shadow hover:bg-base-300 transition-colors border border-base-300"
    >
      {asset.image && (
        <img src={asset.image} alt={asset.title}
          className="w-full h-24 object-contain aspect-square rounded bg-base-100 border"
          loading="lazy"
        />
      )}
      <h3 className="text-center text-base font-semibold h-12 flex items-center justify-center mt-2 mb-1">
        {asset.title}
      </h3>
      <p className="h-24 flex-1 text-xs text-neutral-content line-clamp-3">
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
      description="A curated list of quality game assets to help you build your next game."
      leftContent={
        <div className="flex flex-col gap-4">
          {categories.map((cat, idx) => (
            <section key={idx} className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <h2 className="text-xl font-bold">{cat.title}</h2>
                <p className="text-sm text-neutral-content">{cat.description}</p>
              </div>
              <div className="flex flex-wrap gap-4">
                {cat.assets.map((asset, j) => (
                  <AssetCard key={j} asset={asset} />
                ))}
              </div>
            </section>
          ))}
        </div>
      }
    />
  );
}
