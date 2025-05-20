import Head from 'next/head';
import Home from '../src/pages/Home/Home';

export default function IndexPage() {
  return (
    <>
      <Head>
        <title>GameDev Utils</title>
        <meta name="description" content="GameDev Utils - Tools for game developers" />
      </Head>
      <Home />
    </>
  );
}
