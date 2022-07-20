/* eslint-disable @next/next/no-img-element */
import Image from 'next/image'
import { githubUsername } from '../config'
import styles from './Bio.module.css'

interface BioProps {
  className?: string
}

export default function Bio(props: BioProps) {
  let photoURL = `https://www.github.com/${githubUsername}.png`

  return (
    <div
      className={styles.Bio}>
      <img src={photoURL} alt="Me" className={styles.BioImage}/>
      <p>
        Blog is themed after Gatsby's blog starter and Dan Abramov's{' '}
        <a href="https://overreacted.io/">overreacted.io</a>.<br />
        Made with{' '}
        <a href="https://nextjs.org">Next.js</a>{' '}
        and <a href="https://mdxjs.com/">MDX</a>.
      </p>
    </div>
  )
}
