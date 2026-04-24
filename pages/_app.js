import Head from 'next/head'
import '../styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>LiveOnChain</title>

        {/* PWA SETTINGS */}
        <meta name="theme-color" content="#00f5a0" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="LiveOnChain" />

        {/* ICON + MANIFEST */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </Head>

      <Component {...pageProps} />
    </>
  )
}