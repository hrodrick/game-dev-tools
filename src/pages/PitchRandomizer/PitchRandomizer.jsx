import React, { useRef, useState } from "react";

const DEFAULT_PITCH = 1.0;
const MIN_PITCH = -3;
const MAX_PITCH = 3.0;

export default function PitchRandomizer() {
  const [dragActive, setDragActive] = useState(false);
  const uploadInputRef = useRef(null);

  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [minPitch, setMinPitch] = useState(DEFAULT_PITCH);
  const [maxPitch, setMaxPitch] = useState(DEFAULT_PITCH);
  const [error, setError] = useState("");
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
    <div
      style={{
        maxWidth: 480,
        margin: "40px auto",
        padding: 24,
        background: "#fff",
        borderRadius: 12,
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      }}
    >
      <h2>Pitch Randomizer</h2>
      <p>
        Upload a sound file, set min/max pitch, and play with a randomized pitch
        between those values.
      </p>
      <div style={{ marginBottom: 16 }}>
        <label>
          <b>Upload Sound File:</b>
        </label>
        <div
          onDrop={async (e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
            if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
              const fakeEvent = { target: { files: e.dataTransfer.files } };
              await handleFileChange(fakeEvent);
            }
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(true);
          }}
          onDragLeave={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDragActive(false);
          }}
          style={{
            border: dragActive ? "2px solid #0070f3" : "2px dashed #bbb",
            borderRadius: 8,
            padding: 24,
            textAlign: "center",
            background: dragActive ? "#e6f0fa" : "#fafbfc",
            marginTop: 8,
            marginBottom: 0,
            cursor: "pointer",
            transition: "border 0.2s, background 0.2s",
            color: "#333",
          }}
          tabIndex={0}
          aria-label="Upload or drag and drop audio file"
        >
          <input
            type="file"
            accept="audio/*"
            onChange={handleFileChange}
            style={{ display: "none" }}
            ref={(inputRef) => (uploadInputRef.current = inputRef)}
          />
          <span style={{ fontSize: 16 }}>
            Drag & drop your audio file here
            <br />
            <span style={{ color: "#888", fontSize: 13 }}>
              or click to select a file
            </span>
          </span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 16 }}>
        <label>
          Min Pitch
          <input
            type="number"
            step="0.01"
            value={minPitch}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setMinPitch("");
              } else {
                const num = parseFloat(val);
                if (!isNaN(num)) {
                  setMinPitch(Math.max(MIN_PITCH, Math.min(MAX_PITCH, num)));
                }
              }
            }}
            style={{ width: 80, marginLeft: 8 }}
          />
        </label>
        <label>
          Max Pitch
          <input
            type="number"
            step="0.01"
            value={maxPitch}
            onChange={(e) => {
              const val = e.target.value;
              if (val === "") {
                setMaxPitch("");
              } else {
                const num = parseFloat(val);
                if (!isNaN(num)) {
                  setMaxPitch(Math.max(MIN_PITCH, Math.min(MAX_PITCH, num)));
                }
              }
            }}
            style={{ width: 80, marginLeft: 8 }}
          />
        </label>
      </div>
      <button
        onClick={handlePlay}
        disabled={!audioFile}
        style={{
          padding: "8px 24px",
          fontWeight: 600,
          borderRadius: 6,
          background: "#0070f3",
          color: "#fff",
          border: "none",
          cursor: audioFile ? "pointer" : "not-allowed",
        }}
      >
        Play
      </button>
      {error && <div style={{ color: "red", marginTop: 16 }}>{error}</div>}
      {lastPitch !== null && (
        <div style={{ marginTop: 16, color: "#0070f3", fontWeight: 500 }}>
          Pitch used: {lastPitch.toFixed(3)}
        </div>
      )}
      {audioFile && (
        <div style={{ marginTop: 16, color: "#555" }}>
          <b>File:</b> {audioFile.name}
        </div>
      )}
    </div>
  );
}
