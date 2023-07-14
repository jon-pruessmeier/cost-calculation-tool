import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import Link from 'next/link';
import {BsFillCalculatorFill, BsFillFileTextFill} from 'react-icons/Bs'
import { RecoilRoot } from 'recoil';


function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <RecoilRoot>
      <Head>
        <title>Cost Calculation Tool</title>
      </Head>
      <main className="app h-screen w-screen text-gray-700 font-sans">
      <div className='w-full h-full flex flex-col'>
        <nav className='h-20 bg-white shadow-xl z-20 flex items-center justify-center space-x-4 text-base font-semibold'>
          <button className='h-full py-3 px-4  active:bg-zinc-100 hover:bg-zinc-100'><Link href='/contracts' className='flex flex-col justify-center items-center'>
            <BsFillFileTextFill className='text-lg'/>
          Manage Contracts
          </Link>
          </button>
          <button className='h-full py-3 px-4  active:bg-zinc-100 hover:bg-zinc-100'><Link href='/usage'  className='flex flex-col justify-center items-center'> <BsFillCalculatorFill className='text-lg'/> Calculate your costs</Link></button>
        </nav>
        <div className='grow bg-gradient-to-b from-gray-300 via-gray-100 to-white p-4'>
 <Component {...pageProps} />
        </div>
        
    </div>
        
      </main>
    </RecoilRoot>
  );
}

export default CustomApp;
