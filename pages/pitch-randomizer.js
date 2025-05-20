import Head from 'next/head';
import PitchRandomizer from '../src/pages/PitchRandomizer/PitchRandomizer';

export default function PitchRandomizerPage() {
  return (
    <>
      <Head>
        <title>Pitch Randomizer - GameDev Utils</title>
        <meta name="description" content="Randomize audio pitch for game development." />
      </Head>
      <PitchRandomizer />
    </>
  );
}
