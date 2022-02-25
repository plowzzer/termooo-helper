import type { NextPage } from "next";
import { useState } from "react";

import simulate from '../utils/Simulation'
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [rightWord, setRightWord] = useState("");
  const [lettersNot, setLettersNot] = useState("");
  const [posibilities, setPossibilities] = useState([] as string[]);

  const handleSimulate = async () => {
    console.log(rightWord, lettersNot)
    const response:string[] = await simulate(rightWord, lettersNot)
    setPossibilities(response)
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Termooo Helper</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <h1 className={styles.title}>
          Welcome to <a href="https://term.ooo">Termooo</a> Helper
        </h1>

        <p className={styles.description}>
          Entre com a palavra <code className={styles.code}>TerMo</code> e
          retornamos com a sujestão
        </p>

        <div>
          <label htmlFor="word" className="font-semibold">
            Palavra
          </label>
          <input
            id="word"
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="<L> verdes <l> amarelos <_> escuro"
            onChange={(e) => {
              setRightWord(e.target.value);
            }}
            type="text"
            name="word"
          />
        </div>

        <div className="mt-6">
          <label htmlFor="not-in" className="font-semibold">
            Letras que não existem
          </label>
          <input
            id="not-in"
            className="placeholder:italic placeholder:text-slate-400 block bg-white w-full border border-slate-300 rounded-md px-4 py-3 shadow-sm focus:outline-none focus:border-sky-500 focus:ring-sky-500 focus:ring-1 sm:text-sm"
            placeholder="digite as letras que não existem"
            onChange={(e) => {
              setLettersNot(e.target.value);
            }}
            type="text"
            name="not-in"
          />
        </div>

        <div className="mt-6">
          <button
            type="button"
            className="bg-indigo-600 text-white font-medium py-3 px-4 rounded-md"
            onClick={handleSimulate}
          >
            Simular
          </button>
        </div>
        
        {posibilities && (
          <div>
            <p className="text-center">Foram encontradas {posibilities.length} palavras</p>
            <ul className="flex flex-wrap">
              {posibilities.map((posibility, index) => (
                <li key={`${posibility}-${index}`} className="flex m-2 py-3 px-4 text-white bg-blue-400 rounded-lg">
                  {posibility}
                </li>
              ))}
            </ul>
          </div>
        )}
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
