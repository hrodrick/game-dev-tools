import Head from 'next/head';
import InstantAudioPad from '../src/pages/InstantAudioPad/InstantAudioPad';

export default function InstantAudioPadPage() {
  return (
    <>
      <Head>
        <title>Instant Audio Pad - GameDev Utils</title>
        <meta name="description" content="Instant Audio Pad for game sound effects." />
      </Head>
      <InstantAudioPad />
    </>
  );
}
