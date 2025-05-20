import '../index.css';
import Header from '../src/components/Header';

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="bg-base-100 w-full">
      <Header />
      <div className="flex flex-col items-center min-h-screen p-4">
        <div className="w-full max-w-4xl bg-base-100 p-6 rounded-lg shadow-md">
          <Component {...pageProps} />
        </div>
      </div>
    </div>
  );
}