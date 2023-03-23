import { abi, contractAddresses } from "../constants"
import { useMoralis, useWeb3Contract } from "react-moralis"
import { useEffect, useState } from "react"
import { ethers } from "ethers"
import { Beans, Bell, CheckCircle, useNotification, Youtube } from "web3uikit"

export default function LotteryEntrance() {
  const { chainId: chainIdHex, isWeb3Enabled, Moralis } = useMoralis()
  const chainId = parseInt(chainIdHex)
  const raffleAddress =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null
  const [entranceFee, setEntraceFee] = useState("0")
  const [numberOfPlayers, setNumberOfPlayers] = useState("0")
  const [recentWinner, setRecentWinner] = useState("0")

  const dispatch = useNotification()

  const {
    runContractFunction: enterRaffle,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    //contractAddressES: raffleAddress,
    functionName: "enterRaffle",
    params: {},
    msgValue: entranceFee,
  })

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getEntranceFee",
    params: {},
  })

  const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getNumberOfPlayers",
    params: {},
  })

  const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: raffleAddress,
    functionName: "getRecentWinner",
    params: {},
  })

  async function updateUI() {
    const entranceFeeFromCall = (await getEntranceFee()).toString()
    const numberOfPlayersFromCall = (await getNumberOfPlayers()).toString()
    const recentWinnerFromCall = (await getRecentWinner()).toString()
    setEntraceFee(entranceFeeFromCall)
    setNumberOfPlayers(numberOfPlayersFromCall)
    setRecentWinner(recentWinnerFromCall)
  }

  useEffect(() => {
    if (isWeb3Enabled) {
      updateUI()
    }
  }, [isWeb3Enabled])

  const handleSuccess = async function (tx) {
    await tx.wait(1)
    handleNewNotification(tx)
    updateUI()
  }

  const handleNewNotification = function () {
    dispatch({
      type: "info",
      message: "Transaction Completed !!",
      title: "Tx Notification",
      position: "topR",
      icon: Bell,
    })
  }

  return (
    <>
      <div>LotteryEntrance</div>
      {raffleAddress ? (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
            onClick={async function () {
              await enterRaffle({
                onSuccess: handleSuccess,
                onError: (error) => console.log(error),
                //   onSuccess: (tx) => {console.log(tx);},
                //   onError:(error) => console.log(error);
              })
            }}
          >
            Enter Raffle
          </button>
          Entrance Fee : {ethers.utils.formatUnits(entranceFee, "ether")}
          ETH
          <div>Players : {numberOfPlayers}</div>
          <div>recentWinner : {recentWinner}</div>
        </div>
      ) : (
        "No raffle address detected !!"
      )}
    </>
  )
}
