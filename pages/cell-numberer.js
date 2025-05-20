import Head from 'next/head';
import SpriteSheetNumberer from '../src/pages/SpriteSheetNumberer/SpriteSheetNumberer';

export default function CellNumbererPage() {
  return (
    <>
      <Head>
        <title>Sprite Sheet Numberer - GameDev Utils</title>
        <meta name="description" content="Add numbers to your sprite sheet cells for easy reference." />
      </Head>
      <SpriteSheetNumberer />
    </>
  );
}
