import Head from 'next/head';
import RecommendedAssets from '../src/pages/RecommendedAssets/RecommendedAssets';

export default function RecommendedAssetsPage() {
  return (
    <>
      <Head>
        <title>Recommended Assets - GameDev Utils</title>
        <meta name="description" content="Recommended assets for game development." />
      </Head>
      <RecommendedAssets />
    </>
  );
}
