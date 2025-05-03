import React from "react";

export default function AdPlaceholder({ position }) {
  return (
    <div className="card bg-base-300 min-h-24 md:min-h-96 shadow-sm">
      <div className="card-body">
      Ad Placeholder ({position})
      </div>
    </div>
  );
}
