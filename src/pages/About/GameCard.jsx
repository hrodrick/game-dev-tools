import React from "react";

/**
 * GameCard component
 * Props:
 * - title: string
 * - description: string
 * - image: string (URL)
 * - url: string (optional)
 */
export default function GameCard({ title, description, image, url }) {
  return (
    <div className="w-full max-w-4xl bg-base-200 rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6 border border-base-300 hover:bg-base-300 transition-colors">
      <div className="relative w-85 h-48 flex-shrink-0">
        <img src={image} alt={title} className="w-full h-full object-cover rounded-lg border bg-base-100" loading="lazy" />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-base text-neutral-content flex-1">{description}</p>
        {url && ( <a href={url} target="_blank" rel="noopener noreferrer" className="btn btn-success w-fit mt-auto">Learn More</a>)}
      </div>
    </div>
  );
}
