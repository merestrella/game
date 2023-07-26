import '../styles/globals.css'
import { Inter } from 'next/font/google'

export const inter = Inter({ subsets: ['latin'] })

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
