import { useEffect } from "react"
import { useMoralis } from "react-moralis"

export default function ManualHeader() {
  const {
    enableWeb3,
    account,
    isWeb3Enabled,
    Moralis,
    deactivateWeb3,
    isWeb3EnableLoading,
  } = useMoralis()
  // useEffect
  //enableWeb3 is an inbuilt function of Moralis
  // if no dependency array: it runs anytime something re-renders
  // if blank dependdency arry: it runs once on load
  // if something in the array: it runs anytime something in the state changes

  /* +++++++++++++++++++++++++++++++++++++++++++++ 1 +++++++++++++++++++++++++++++++++++++++++++++ */
  useEffect(() => {
    if (isWeb3Enabled) return
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem("connected")) {
        enableWeb3()
      }
    }
  }, [isWeb3Enabled])
  /* +++++++++++++++++++++++++++++++++++++++++++++ 1 +++++++++++++++++++++++++++++++++++++++++++++ */
  useEffect(() => {
    Moralis.onAccountChanged((account) => {
      console.log(`Account changed to ${account}`)
      if (account == null) {
        window.localStorage.removeItem("connected")
        deactivateWeb3()
        console.log("No account found !!")
      }
    })
  }, [])
  return (
    <>
      {/* +++++++++++++++++++++++++++++++++++++++++++++ 1 +++++++++++++++++++++++++++++++++++++++++++++ */}
      {account ? (
        <div>
          We are connected to {account.slice(0, 6)}...
          {account.slice(length - 4)}
        </div>
      ) : (
        <div>
          <button
            onClick={async () => {
              await enableWeb3()
              if (typeof window !== "undefined") {
                window.localStorage.setItem("connected", "injected")
              }
            }}
            disabled={isWeb3EnableLoading}
          >
            Connect ot wallet
          </button>
        </div>
      )}
    </>
  )
}
