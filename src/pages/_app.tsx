import { AppProps } from 'next/app'
import Head from 'next/head'

import { Header } from '../components/Header'
import { SessionProvider as NextAuthProvider } from 'next-auth/react'

import GlobalStyles from './styles/global'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthProvider session={pageProps.session}>
      <Head>
        <title>ig.news</title>
      </Head>
      <Header />
      <GlobalStyles />
      <Component {...pageProps} />
    </NextAuthProvider>
  )
}

export default MyApp
