import { PropsWithChildren, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { contractsState } from '../data/contracts';
import { fetchContracts } from '../data/fetch-logic';
import { BsFillCalculatorFill, BsFillFileTextFill } from 'react-icons/bs';
import Head from 'next/head';
import { NavButton } from './nav-button';

export default function BasePage({ children }: PropsWithChildren) {
  const setContracts = useSetRecoilState(contractsState);

  useEffect(() => {
    (async () => {
      const data = await fetchContracts();
      if (!data) return;
      setContracts(data);
    })();
  }, []);

  return (
    <>
      <Head>
        <title>Cost Calculation Tool</title>
      </Head>
      <main className="app h-screen w-screen text-gray-700 font-sans">
        <div className="w-full h-full flex flex-col">
          <nav className="basis-1/12 bg-white shadow-xl z-20 flex items-center justify-center space-x-4 text-base font-semibold">
            <NavButton path="/contracts" text="Manage Contracts">
              <BsFillFileTextFill className="text-lg" />
            </NavButton>
            <NavButton path="/usage" text="Calculate Costs">
              <BsFillCalculatorFill className="text-lg" />
            </NavButton>
          </nav>
          <div className="basis-11/12 bg-gradient-to-b from-gray-300 via-gray-100 to-white p-4 overflow-y-scroll">
            {children}
          </div>
        </div>
      </main>
    </>
  );
}
