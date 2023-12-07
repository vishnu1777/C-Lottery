import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { ThirdwebProvider } from '@thirdweb-dev/react'
import { Toaster } from 'react-hot-toast'
import { Sepolia } from "@thirdweb-dev/chains";

export default function App({ Component, pageProps }: AppProps) {
  
  return (
    <ThirdwebProvider
    clientId='bde5a8794058899a9f39def2c12349e3'
    activeChain={Sepolia}>
  <Component {...pageProps} />
  <Toaster/>
  </ThirdwebProvider>
)}
