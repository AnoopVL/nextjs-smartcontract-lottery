import "../styles/globals.css"
import { MoralisProvider } from "react-moralis"

export default function App({ Component, pageProps }) {
  return (
    // initializeOnMount is the optionality to jump into servers to add some more features to our website
    <MoralisProvider initializeOnMount={false}>
      <Component {...pageProps} />
    </MoralisProvider>
  )
}
