import React, { useRef, useState } from "react";
import ToolPageLayout from "../../components/ToolPageLayout";
import MultiDropZone from "../../components/MultiDropZone";

const DEFAULT_PITCH = 1.0;
const MIN_PITCH = 0.0;
const MAX_PITCH = 5.0;
const DEFAULT_DELAY = 0.2;
const MAX_LAST_PLAYED_AUDIOS = 5;

export default function InstantAudioPad() {
  const [audioFiles, setAudioFiles] = useState([]); // { file, url, name }
  const [minPitch, setMinPitch] = useState(DEFAULT_PITCH);
  const [maxPitch, setMaxPitch] = useState(DEFAULT_PITCH);
  const [delay, setDelay] = useState(DEFAULT_DELAY); // seconds
  const [playingIndex, setPlayingIndex] = useState(null);
  const [sequencePlaying, setSequencePlaying] = useState(false);
  const [lastPlayed, setLastPlayed] = useState([]); // array of names
  const audioContextRef = useRef(null);
  const sourcesRef = useRef([]); // For stopping all
  const stopSequenceRef = useRef(false);

  const handleFilesSelected = (files) => {
    const arr = Array.from(files).map((file) => ({
      file,
      url: URL.createObjectURL(file),
      name: file.name,
    }));
    setAudioFiles(arr);
  };

  const playAudio = async (fileObj, index) => {
    setPlayingIndex(index);
    try {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      const context = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = context;
      const arrayBuffer = await fileObj.file.arrayBuffer();
      const buffer = await context.decodeAudioData(arrayBuffer);
      const source = context.createBufferSource();
      source.buffer = buffer;
      // Random pitch between min and max
      const pitch =
        minPitch === maxPitch
          ? parseFloat(minPitch)
          : Math.random() * (parseFloat(maxPitch) - parseFloat(minPitch)) + parseFloat(minPitch);
      source.playbackRate.value = pitch;
      source.connect(context.destination);
      sourcesRef.current = [source];
      source.start(0);
      setLastPlayed((prev) => [fileObj.name, ...prev].slice(0, MAX_LAST_PLAYED_AUDIOS));
      await new Promise((resolve) => {
        source.onended = resolve;
      });
    } finally {
      setPlayingIndex(null);
    }
  };

  const handleButtonClick = (fileObj, index) => {
    stopAll();
    playAudio(fileObj, index);
  };

  const playAllSequence = async () => {
    setSequencePlaying(true);
    stopSequenceRef.current = false;
    for (let i = 0; i < audioFiles.length; i++) {
      if (stopSequenceRef.current) break;
      await playAudio(audioFiles[i], i);
      if (stopSequenceRef.current) break;
      if (i < audioFiles.length - 1) {
        await new Promise((res) => setTimeout(res, delay * 1000));
      }
    }
    setSequencePlaying(false);
    setPlayingIndex(null);
  };

  const stopAll = () => {
    stopSequenceRef.current = true;
    setSequencePlaying(false);
    setPlayingIndex(null);
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    sourcesRef.current.forEach((src) => {
      try { src.stop(); } catch {}
    });
    sourcesRef.current = [];
  };

  return (
    <ToolPageLayout
      title="Instant Audio Pad"
      description="Upload multiple audio files and play them instantly or in sequence with randomized pitch."
      leftContent={
        <div className="flex flex-col gap-4">
          <MultiDropZone
            onFilesSelected={files => handleFilesSelected(files)}
            multiple={true}
            accept="audio/*"
            label="Drag & drop audio files here"
          />
          <div className="flex flex-wrap gap-4">
            {audioFiles.map((fileObj, i) => (
              <button
                key={fileObj.url}
                className={`w-24 h-24 p-2 flex items-center justify-center rounded-lg font-bold border-1 border-neutral-content shadow-md transition-colors duration-150 ${
                  playingIndex === i ? "bg-primary text-primary-content" : "bg-neutral text-neutral-content hover:bg-base-300"
                }`}
                onClick={() => handleButtonClick(fileObj, i)}
                disabled={sequencePlaying}
              >
                {fileObj.name}
              </button>
            ))}
          </div>
        </div>
      }
      fieldsetContent={
        <>
          <label className="label">Min Pitch</label>
          <input className="input" type="number" step="0.01" min={MIN_PITCH} max={MAX_PITCH} value={minPitch} 
            onChange={e => setMinPitch(Number(e.target.value))}
          />
          <label className="label">Max Pitch</label>
          <input className="input" type="number" step="0.01" min={MIN_PITCH} max={MAX_PITCH} value={maxPitch} 
            onChange={e => setMaxPitch(Number(e.target.value))}
          />
          <label className="label">Delay between sounds (seconds)</label>
          <input className="input" type="number" step="0.01" min={0} value={delay} 
            onChange={e => setDelay(Number(e.target.value))}
          />
          <button
            className="btn btn-neutral mt-2"
            onClick={playAllSequence}
            disabled={audioFiles.length === 0 || sequencePlaying}
          >
            Play all sounds in sequence
          </button>
          <button
            className="btn btn-error mt-2"
            onClick={stopAll}
            disabled={!sequencePlaying && playingIndex === null}
          >
            Stop sequence
          </button>
          <div className="mt-4">
            <div className="label">Last 5 played sounds:</div>
            {lastPlayed.map((name, idx) => (
              <div key={idx} className="text-sm text-neutral-content">{name}</div>
            ))}
          </div>
        </>
      }
    />
  );
}
