import Head from 'next/head';
import { SubscribreButton } from '../components/SubscribeButton';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head> <title>Home | ig.news</title> </Head>
      
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👏 Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get access to all the publocations <br/>
            <span>for $9.99 month</span>
          </p>
          <SubscribreButton />
        </section>
        <img src="/images/avatar.svg" alt="girl coding"/>
      </main>
   </>
  )
}
