import React, { useRef, useState } from "react";
import MultiDropZone from "../../components/MultiDropZone";
import ToolPageLayout from "../../components/ToolPageLayout";

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
    <ToolPageLayout
      title="Pitch Randomizer"
      description={
        <>
          <h2>Tired of waiting for the media player to load your audio file? Use this tool to quickly play a sound file! And even more, find the perfect pitch range for it right here!</h2>
          <p>Want to upload multiple files at once? Check out the <a href="/instant-audio-pad" className="link">Instant Audio Pad tool</a>!</p>
        </>
      }
      leftContent={
        <div className="flex flex-col gap-4">
          <MultiDropZone
            onFilesSelected={files => handleFileChange({ target: { files } })}
            multiple={false}
            accept="audio/*"
            label="Drag & drop audio file here"
          />
          {audioFile && (<div className="text-md text-neutral-content"> <b>File:</b> {audioFile.name}</div>)}
        </div>
      }
      fieldsetContent={
        <div className="flex flex-col gap-2">
          <label>Min Pitch</label>
          <input className="input" type="number" step="0.01" value={minPitch} onChange={handleChange("minPitch")}/>
          <label>Max Pitch</label>
          <input className="input" type="number" step="0.01" value={maxPitch} onChange={handleChange("maxPitch")}/>
          <button onClick={handlePlay} disabled={!audioFile} className="btn btn-neutral">Play sound</button>
          {error && <div className="text-error text-sm">{error}</div>}
          {lastPitch !== null && (<div className="text-sm">Pitch used: {lastPitch.toFixed(3)}</div>)}
        </div>
      }
    />
  );
}
