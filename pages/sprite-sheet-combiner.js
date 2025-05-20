import Head from 'next/head';
import SpriteSheetCombiner from '../src/pages/SpriteSheetCombiner/SpriteSheetCombiner';

export default function SpriteSheetCombinerPage() {
  return (
    <>
      <Head>
        <title>Sprite Sheet Combiner - GameDev Utils</title>
        <meta name="description" content="Combine sprite sheets easily for your game development needs." />
      </Head>
      <SpriteSheetCombiner />
    </>
  );
}
