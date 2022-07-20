import type { AppProps } from "next/app";
import Link from "next/link";
import Head from "next/head";
import "@/styles/globals.css";
import { author, description, githubUsername, title,thisRepo } from "@/src/config";
import styles from '@/styles/Homepage.module.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description}/>
        <meta name="author" content={author}/>
      </Head>
      <nav className={styles.header}>
        <Link href="/">/home</Link> &bull;{' '}
        <Link href="/tags">Tags</Link> &bull;{' '}
        <a href={`https://www.github.com/${githubUsername}`}> {"github"} </a>
      </nav>

      <Component {...pageProps} />
      
      <footer className={styles.footer}>
        <div>
          <Link href="/about">About</Link> &bull;{' '}
          <Link href="/tags">Tags</Link> &bull;{' '}
          <a href={thisRepo} target="_blank" rel="noreferrer">
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}

export default MyApp;
