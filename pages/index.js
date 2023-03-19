import Head from "next/head"
import Image from "next/image"
import { Inter } from "next/font/google"
import styles from "@/styles/Home.module.css"
import ManualHeader from "@/components/ManualHeader"
import { useMoralis } from "react-moralis"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <>
      <div>
        <Head>
          <title>ViCHAr Raffle</title>
          <meta name="description" content="Smart COntract lottery" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* <link rel="icon" href="/favicon.ico" /> */}
          <link rel="icon" href="/newLogo.png" />
        </Head>
        <ManualHeader />
        Bonjour
      </div>
    </>
  )
}
