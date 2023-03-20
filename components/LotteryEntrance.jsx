import { useWeb3Contract } from "react-moralis"
import { abi, contractAddresses } from "../constants"
import { useMoralis } from "react-moralis"
import { useEffect } from "react"

export default function LotteryEntrance() {
  /**++++++++++++++++++++++++++++++++++++++++++ hardhat-localhost has no eth in it,
   * go to html-fundme and check for changes to make ++++++++++++++++++++++++++++++++++++++++++ */

  const { chainId: chainIdHex, isWeb3Enabled } = useMoralis()
  const chainId = parseInt(chainIdHex)
  // const raffleAddress =
  //   chainId in contractAddress ? contractAddress[chainId][0] : null

  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  })

  useEffect(() => {
    if (isWeb3Enabled) {
      async function updateUI() {
        const entraceFeeFromContract = await getEntranceFee()
      }
      updateUI()
    }
  }, [isWeb3Enabled])

  return (
    <>
      <div>LotteryEntrance</div>
    </>
  )
}
