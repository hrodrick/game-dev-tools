import Head from 'next/head';
import ToolPageLayout from '../src/components/ToolPageLayout';

export default function ToolsPage() {
  return (
    <>
      <Head>
        <title>Tools - GameDev Utils</title>
        <meta name="description" content="Tools for game developers" />
      </Head>
      <ToolPageLayout />
    </>
  );
}
