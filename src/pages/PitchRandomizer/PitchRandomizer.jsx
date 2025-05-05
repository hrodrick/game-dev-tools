import React, { useRef, useState } from "react";
import MultiDropZone from "../../components/MultiDropZone";
import Footer from "../../components/Footer";

const DEFAULT_PITCH = 1.0;
const MIN_PITCH = -3;
const MAX_PITCH = 3.0;

export default function PitchRandomizer() {
  const [audioFile, setAudioFile] = useState(null);
  const [minPitch, setMinPitch] = useState(DEFAULT_PITCH);
  const [maxPitch, setMaxPitch] = useState(DEFAULT_PITCH);
  const [error, setError] = useState("");
  const [audioUrl, setAudioUrl] = useState(null);
  const [lastPitch, setLastPitch] = useState(null);
  const audioBufferRef = useRef(null);
  const audioContextRef = useRef(null);

  const handleFileChange = async (e) => {
    setError("");
    const file = e.target.files[0];
    if (!file) return;
    setAudioFile(file);
    setAudioUrl(URL.createObjectURL(file));
    // Decode audio for playback
    try {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      const context = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = context;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = await context.decodeAudioData(arrayBuffer);
      audioBufferRef.current = buffer;
    } catch (err) {
      setError("Could not decode audio file. Please try a different format.");
      audioBufferRef.current = null;
    }
  };

  const handleChange = (pitchType) => (e) => {
    const val = e.target.value;
    if (val === "") {
      if (pitchType === "minPitch") {
        setMinPitch("");
      } else {
        setMaxPitch("");
      }
    } else {
      const num = parseFloat(val);
      if (!isNaN(num)) {
        if (pitchType === "minPitch") {
          setMinPitch(Math.max(MIN_PITCH, Math.min(MAX_PITCH, num)));
        } else {
          setMaxPitch(Math.max(MIN_PITCH, Math.min(MAX_PITCH, num)));
        }
      }
    } 
  };

  const handlePlay = () => {
    setError("");
    if (!audioBufferRef.current) {
      setError("Please upload a valid audio file first.");
      return;
    }
    if (minPitch > maxPitch) {
      setError("Min pitch cannot be greater than max pitch.");
      return;
    }
    const context =
      audioContextRef.current ||
      new (window.AudioContext || window.webkitAudioContext)();
    audioContextRef.current = context;
    const source = context.createBufferSource();
    source.buffer = audioBufferRef.current;
    // Random pitch between min and max
    const pitch =
      minPitch === maxPitch
        ? parseFloat(minPitch)
        : Math.random() * (parseFloat(maxPitch) - parseFloat(minPitch)) +
          parseFloat(minPitch);
    setLastPitch(pitch);
    source.playbackRate.value = pitch;
    source.connect(context.destination);
    source.start(0);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-xl font-bold">Pitch Randomizer</h1>
      <h2>Upload a sound file, set min/max pitch, and play it with a randomized pitch between those values.</h2>
      <MultiDropZone
        onFilesSelected={files => handleFileChange({ target: { files } })}
        multiple={false}
        accept="audio/*"
        label="Drag & drop audio file here"
      />
      {audioFile && (<div className="text-sm"> <b>File:</b> {audioFile.name}</div>)}
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border gap-4 p-4 md:min-w-64">
        <legend className="fieldset-legend">Settings</legend>
        <div className="flex flex-col gap-2">
          <label>Min Pitch</label>
          <input className="input" type="number" step="0.01" value={minPitch} onChange={handleChange("minPitch")}/>
          <label>Max Pitch</label>
          <input className="input" type="number" step="0.01" value={maxPitch} onChange={handleChange("maxPitch")}/>
        </div>
      </fieldset>
      <button onClick={handlePlay} disabled={!audioFile} className="btn btn-neutral">Play</button>
      {error && <div className="text-error text-sm">{error}</div>}
      {lastPitch !== null && (<div className="text-sm">Pitch used: {lastPitch.toFixed(3)}</div>)}
      <Footer />
    </div>
  );
}
