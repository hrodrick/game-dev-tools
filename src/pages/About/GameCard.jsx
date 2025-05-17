import React from "react";

/**
 * GameCard component
 * Props:
 * - game: object
 */
export default function GameCard({ game }) {
  return (
    <div className="w-full max-w-4xl bg-base-200 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 border border-base-300 hover:bg-base-300 transition-colors">
      <div className="relative w-85 h-48 flex-shrink-0">
        <img src={game.image} alt={game.title} className="w-full h-full object-cover rounded-lg border bg-base-100" loading="lazy" />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <h3 className="text-2xl font-bold">{game.title}</h3>
        <p className="text-base text-neutral-content flex-1">{game.description}</p>
        {game.url && ( <a href={game.url} target="_blank" rel="noopener noreferrer" className={game.btnStyle}>{game.btnText}</a>)}
      </div>
    </div>
  );
}
