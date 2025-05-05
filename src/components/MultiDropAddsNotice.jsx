import React from "react";

export default function MultiDropAddsNotice({ handleClearAll, disabled }) {
    return (
      <div className="flex flex-col lg:flex-row items-center place-content-between gap-2 w-full">
        <p className="text-xs text-neutral-content">Uploading new files will add them to the current list. <br /> Click the Clear All button to remove all audios.</p>
        <button
          className="btn btn-outline btn-error"
          onClick={handleClearAll}
          disabled={disabled}
          title="Clear all loaded audios"
        >
          Clear all audios
        </button>
      </div>
    );
};
