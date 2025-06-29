import React from "react";
import { Link } from "react-router-dom";

/**
 * @typedef {Object} ToolCardButton
 * @property {string} label - The button text
 * @property {string} url - The URL to open when clicked
 */

/**
 * @typedef {Object} ToolCardProps
 * @property {string} title - Card title
 * @property {string} description - Card description
 * @property {ToolCardButton[]} buttons - List of buttons
 */

/**
 * ToolCard component
 * @param {ToolCardProps} props
 */
const ToolCard = ({ title, description, buttons }) => (
  <div className="card bg-base-200 w-full shadow-sm">
    <div className="card-body">
      <h2 className="card-title">{title}</h2>
      <p className="pb-2">{description}</p>
      <div className="card-actions grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {buttons.map((btn, idx) => (
          <Link
            key={btn.label + idx}
            to={btn.url}
            className="btn btn-neutral h-24 md:h-12"
          >
            {btn.label}
          </Link>
        ))}
      </div>
    </div>
  </div>
);

export default ToolCard;
