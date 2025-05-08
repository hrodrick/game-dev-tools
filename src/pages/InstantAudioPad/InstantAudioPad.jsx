import React, { useRef, useState } from "react";
import ToolPageLayout from "../../components/ToolPageLayout";
import MultiDropZone from "../../components/MultiDropZone";
import MultiDropAddsNotice from "../../components/MultiDropAddsNotice";

const DEFAULT_PITCH = 1.0;
const MIN_PITCH = 0.0;
const MAX_PITCH = 5.0;
const DEFAULT_DELAY = 0.2;
const MAX_LAST_PLAYED_AUDIOS = 5;

export default function InstantAudioPad() {
  const [audioFiles, setAudioFiles] = useState([]); // { file, url, name }
  const [minPitch, setMinPitch] = useState(DEFAULT_PITCH.toString());
  const [maxPitch, setMaxPitch] = useState(DEFAULT_PITCH.toString());
  const [delay, setDelay] = useState(DEFAULT_DELAY.toString()); // seconds
  const [playingIndex, setPlayingIndex] = useState(null);
  const [sequencePlaying, setSequencePlaying] = useState(false);
  const [lastPlayed, setLastPlayed] = useState([]); // array of names
  const audioContextRef = useRef(null);
  const sourcesRef = useRef([]); // For stopping all
  const stopSequenceRef = useRef(false);

  const handleFilesSelected = (files) => {
    const arr = Array.from(files)
      .filter(file => file.type.startsWith("audio/"))
      .map((file) => ({
        file,
        url: URL.createObjectURL(file),
        name: file.name,
      }));
    setAudioFiles(prev => [...prev, ...arr]);
  };


  const handleClearAll = () => {
    setAudioFiles([]);
    stopAll();
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
        parseFloat(minPitch) === parseFloat(maxPitch)
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
        await new Promise((res) => setTimeout(res, parseFloat(delay) * 1000));
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
          <MultiDropAddsNotice handleClearAll={handleClearAll} disabled={audioFiles.length === 0} />
          <div className="flex flex-wrap gap-4 place-content-center">
            {audioFiles.map((fileObj, i) => (
              <button
                key={fileObj.url}
                className={`w-16 h-16 md:w-24 md:h-24 p-2 flex items-center justify-center rounded-lg font-bold border-1 border-neutral-content shadow-md transition-colors duration-150 ${
                  playingIndex === i ? "bg-primary text-primary-content" : "bg-neutral text-neutral-content hover:bg-primary-content"
                }`}
                onClick={() => handleButtonClick(fileObj, i)}
                disabled={sequencePlaying}
              >
                <p className="mask overflow-hidden size-full text-xs text-center content-center break-all ">{fileObj.name}</p>
              </button>
            ))}
          </div>
        </div>
      }
      fieldsetContent={
        <div className="flex flex-col gap-2">
          <label className="label">Min Pitch</label>
          <input className="input" type="number" step="0.01" min={MIN_PITCH} max={MAX_PITCH} value={minPitch}
            onChange={e => setMinPitch(e.target.value)}
          />
          <label className="label mt-2">Max Pitch</label>
          <input className="input" type="number" step="0.01" min={MIN_PITCH} max={MAX_PITCH} value={maxPitch}
            onChange={e => setMaxPitch(e.target.value)}
          />
          <label className="label mt-2">Delay between sounds (seconds)</label>
          <input className="input" type="number" step="0.01" min={0} value={delay}
            onChange={e => setDelay(e.target.value)}
          />
          <button
            className="btn btn-neutral mt-2"
            onClick={playAllSequence}
            disabled={audioFiles.length === 0 || sequencePlaying}
          >
            Play all sounds in sequence
          </button>
          <button
            className="btn btn-error mt-2 "
            onClick={stopAll}
            disabled={!sequencePlaying && playingIndex === null}
          >
            Stop sequence
          </button>
          <div className="mt-2 flex flex-col gap-2">
            <div className="label">Last 5 played sounds:</div>
            <div className="w-54 md:w-64 overflow-x-scroll scroll-smooth flex flex-col gap-1 pb-2">
              {lastPlayed.map((name, idx) => (
                <label key={idx} className="text-xs w-full text-neutral-content whitespace-nowrap mask">{name}</label>
              ))}
            </div>
          </div>
        </div>
      }
      quickLinks={["pitchRandomizer"]}
    />
  );
}
