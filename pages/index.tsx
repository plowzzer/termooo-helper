import type { NextPage } from "next";
import { useState } from "react";

import simulate from "../utils/Simulation";
import Head from "next/head";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const [loading, setLoading] = useState(false);
  const [rightWord, setRightWord] = useState("");
  const [rightWordError, setRightWordError] = useState("");
  const [lettersNot, setLettersNot] = useState("");
  const [posibilities, setPossibilities] = useState([] as string[]);

  const handleSimulateForm = async (e: any) => {
    e.preventDefault();

    try {
      setLoading(true);

      setRightWordError("");

      if (rightWord.length !== 5) {
        setRightWordError("Você deve adicionar uma palavra de 5 letras");
        return;
      }

      const response: string[] = await simulate(rightWord, lettersNot);
      setPossibilities(response);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
          <a href="https://term.ooo">Termooo</a> Helper
        </h1>
        <div className={styles.version}>
          <small>v1.0.7</small>
        </div>

        <form className="w-full" onSubmit={handleSimulateForm}>
          <div className="mx-auto w-full content-center grid">
            <label htmlFor="word" className={styles.label}>
              Palavra
              <small>{` <A> verdes <a> amarelos <_> escuro`}</small>
            </label>
            <input
              id="word"
              className={`${styles.input} ${styles.inputRight}`}
              onChange={(e) => {
                setRightWord(e.target.value);
              }}
              maxLength={5}
              minLength={5}
              type="text"
              name="word"
            />
            {rightWordError && (
              <p className="text-center text-red-600">{rightWordError}</p>
            )}
          </div>

          <div className="mt-6 mx-auto w-full content-center grid">
            <label htmlFor="not-in" className={styles.label}>
              Letras
              <small>{` digite as letras que não existem`}</small>
            </label>
            <input
              id="not-in"
              className={`${styles.input} ${styles.inputNon}`}
              onChange={(e) => {
                setLettersNot(e.target.value);
              }}
              type="text"
              name="not-in"
            />
          </div>

          <div className="mt-6 mx-auto w-full content-center grid">
            <input
              type="submit"
              className={styles.button}
              value={loading ? "Carregando..." : "Simular"}
              disabled={loading}
            />
          </div>
        </form>

        {posibilities.length > 0 && (
          <div className="mt-10">
            <p className="text-center mb-4">
              Foram encontradas {posibilities.length} possibilidades
            </p>
            <ul className={styles.results}>
              {posibilities.map((posibility, index) => (
                <li key={`${posibility}-${index}`} className={styles.result}>
                  {posibility}
                </li>
              ))}
            </ul>
            <p className="text-center mt-10">
              <small>
                Obs.: Foi removido a acentuação de todas as palavras
              </small>
            </p>
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
