import Head from 'next/head';
import ResolutionsByRatio from '../src/pages/ResolutionsByRatio/ResolutionsByRatio';

export default function ResolutionsByRatioPage() {
  return (
    <>
      <Head>
        <title>Resolutions by Ratio - GameDev Utils</title>
        <meta name="description" content="Find resolutions by aspect ratio for your game assets." />
      </Head>
      <ResolutionsByRatio />
    </>
  );
}
