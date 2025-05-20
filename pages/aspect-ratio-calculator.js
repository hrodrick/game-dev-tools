import Head from 'next/head';
import AspectRatioCalculator from '../src/pages/AspectRatioCalculator/AspectRatioCalculator';

export default function AspectRatioCalculatorPage() {
  return (
    <>
      <Head>
        <title>Aspect Ratio Calculator - GameDev Utils</title>
        <meta name="description" content="Calculate aspect ratios for game development." />
      </Head>
      <AspectRatioCalculator />
    </>
  );
}
