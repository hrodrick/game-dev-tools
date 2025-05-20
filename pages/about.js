import Head from 'next/head';
import About from '../src/pages/About/About';

export default function AboutPage() {
  return (
    <>
      <Head>
        <title>About - GameDev Utils</title>
        <meta name="description" content="About GameDev Utils" />
      </Head>
      <About />
    </>
  );
}
