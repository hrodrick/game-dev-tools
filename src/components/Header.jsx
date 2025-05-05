import React from "react";

const dropdownStyle = "menu dropdown-content p-2 bg-base-200 shadow-sm rounded-tl-none rounded-tr-none";

const arrowDown = <svg
  xmlns="http://www.w3.org/2000/svg" 
  fill="none" viewBox="0 0 24 24" 
  strokeWidth={1.5} stroke="currentColor" 
  className="size-4 self-center">
  <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
</svg>

export default function Header() {
  return (
    <header>
      <div className="navbar bg-base-200 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><a href="/">Home</a></li>
            <li>
              <details>
              <summary>Sprite sheets</summary>
              <ul className="p-2">
                <li><a href="/combine">Combiner</a></li>
                <li><a href="/split">Splitter</a></li>
                <li><a href="/cell-numberer">Cell numberer</a></li>
              </ul>
              </details>
            </li>
            <li>
            <details>
            <summary>Audio</summary>
              <ul className="p-2">
                <li><a href="/pitch-randomizer">Pitch randomizer</a></li>
                <li><a href="/instant-audio-pad">Instant Audio Pad</a></li>
              </ul>
            </details>
            </li>
            <li>
            <details>
            <summary>Math & Dimensions</summary>
              <ul className="p-2">
              <li><a href="/aspect-ratio-calculator">Common resolutions & ratios</a></li>
                  <li><a href="/aspect-ratio-calculator">Aspect ratio calculator</a></li>
                  <li><a href="/safe-area-calculator">Safe area calculator</a></li>
              </ul>
            </details>
            </li>
          </ul>
        </div>
        <a className="btn btn-ghost text-xl">Game Dev Utils</a>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
              <div tabIndex={0} role="button" className="btn btn-ghost rounded-field">
                <a href="/">Home</a>
              </div>
          </li>
          <li className="dropdown">
          <div tabIndex={1} role="button" className="btn btn-ghost rounded-field">
            Sprite sheets
            <div className="">{arrowDown}</div>
            </div>
              <ul 
                tabIndex={1}
                className={dropdownStyle}>
                <li><a href="/combine">Combiner</a></li>
                <li><a href="/split">Splitter</a></li>
                <li><a href="/cell-numberer">Cell numberer</a></li>
              </ul>
          </li>
          <li className="dropdown">
          <div tabIndex={2} role="button" className="btn btn-ghost rounded-field">
            Audio
            <div className="">{arrowDown}</div>
            </div>
              <ul 
                tabIndex={2}
                className={dropdownStyle}>
                <li><a href="/pitch-randomizer">Pitch randomizer</a></li>
                <li><a href="/instant-audio-pad">Instant Audio Pad</a></li>
              </ul>
          </li>
          <li className="dropdown">
          <div tabIndex={3} role="button" className="btn btn-ghost rounded-field">  
            Math & Dimensions
            <div className="">{arrowDown}</div>
            </div>
              <ul 
                tabIndex={3}
                className={dropdownStyle}>
              <li><a href="/aspect-ratio-calculator">Common resolutions & ratios</a></li>
                  <li><a href="/aspect-ratio-calculator">Aspect ratio calculator</a></li>
                  <li><a href="/safe-area-calculator">Safe area calculator</a></li>
              </ul>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-ghost">About</a>
      </div>
      </div>
    </header>
  );
}
