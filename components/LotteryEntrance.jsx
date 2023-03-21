import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"

export default function LotteryEntrance() {
  /**++++++++++++++++++++++++++++++++++++++++++ hardhat-localhost has no eth in it,
   * go to html-fundme and check for changes to make ++++++++++++++++++++++++++++++++++++++++++ */

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const [entranceFee, setEntraceFee] = useState("0")

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  })
  const { runContractFunction: enterRaffle } = useWeb3Contract({
    abi: abi,
    contractAddresses: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  })

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const entranceFeeFromCall = (await getEntranceFee()).toString()
        setEntraceFee(entranceFeeFromCall)
      }
      updateUI()
    }
  }, [isWeb3Enabled])

  return (
    <>
      <div>LotteryEntrance</div>
      {raffleAddress ? (
        <div>
          <button
            onClick={async function () {
              await enterRaffle()
            }}
          >
            Enter Raffle
          </button>
          Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")}
          ETH
        </div>
      ) : (
        "No raffle address detected !!"
      )}
    </>
  )
}
