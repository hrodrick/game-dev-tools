import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div class="flex flex-col md:flex-row">
      <h1>GameDev Utils</h1>
      <div class="flex flex-col gap-4">
        <Link to="/combine">
          <button class="btn">Sprite Sheet Combiner</button>
        </Link>
        <Link to="/split">
          <button class="btn btn-primary">Sprite Sheet Splitter</button>
        </Link>
        <Link to="/pitch-randomizer">
          <button class="btn w-64 rounded-full">Pitch Randomizer</button>
        </Link>
      </div>
    </div>
  );
}