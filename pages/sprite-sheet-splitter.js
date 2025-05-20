import Head from 'next/head';
import SpriteSheetSplitter from '../src/pages/SpriteSheetSplitter/SpriteSheetSplitter';

export default function SpriteSheetSplitterPage() {
  return (
    <>
      <Head>
        <title>Sprite Sheet Splitter - GameDev Utils</title>
        <meta name="description" content="Split sprite sheets easily for your game development needs." />
      </Head>
      <SpriteSheetSplitter />
    </>
  );
}
