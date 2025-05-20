import Head from 'next/head';
import SafeAreaCalculator from '../src/pages/SafeAreaCalculator/SafeAreaCalculator';

export default function SafeAreaCalculatorPage() {
  return (
    <>
      <Head>
        <title>Safe Area Calculator - GameDev Utils</title>
        <meta name="description" content="Calculate safe areas for game UI design." />
      </Head>
      <SafeAreaCalculator />
    </>
  );
}
