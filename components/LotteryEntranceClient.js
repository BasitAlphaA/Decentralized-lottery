import React, { useEffect, useState } from "react";
import { readContract } from "@wagmi/core";
import { useChainId, useWriteContract } from "wagmi";
import config from "./config";
import { contractAddresses, abi } from "../constants";
import Web3 from "web3";
import { Toaster, toast } from "react-hot-toast";

const LotteryEntranceClient = () => {
  const chainId = useChainId();
  const [raffleAddress, setRaffleAddress] = useState(null);
  const [entranceFee, setEntranceFee] = useState("0");
  const [NumPlayers, setNumPlayers] = useState("0");
  const [recentWinner, setReccentWinner] = useState("0");
  const [raffleState, setRaffleState] = useState("0");

  const { writeContractAsync } = useWriteContract();

  const address =
    chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  async function fetchData() {
    if (!chainId || !address) {
      setRaffleAddress(null);
      return;
    }
    // Fetch entrance fee
    try {
      const entranceFeeFromCall = await readContract(config, {
        abi: abi,
        address: address,
        functionName: "getEntranceFee",
        args: [],
      });
      const entranceFeeWei = entranceFeeFromCall.toString();
      setEntranceFee(entranceFeeWei);
      setRaffleAddress(address);
    } catch (error) {
      console.error("Error fetching entrance fee:", error);
    }
    // Fetch number of players
    try {
      const numOfPlayersFromCall = await readContract(config, {
        abi: abi,
        address: address,
        functionName: "getNumOfPlayers",
        args: [],
      });
      const numOfPlayers = numOfPlayersFromCall.toString();
      setNumPlayers(numOfPlayers);
    } catch (error) {
      console.error("Error fetching number of players:", error);
    }
    // Fetch recent winner
    try {
      const recentWinnerFromCall = await readContract(config, {
        abi: abi,
        address: address,
        functionName: "getRecentWinner",
        args: [],
      });
      const getRecentWinner = recentWinnerFromCall.toString();
      setReccentWinner(getRecentWinner);
    } catch (error) {
      console.error("Error fetching recent winner:", error);
    }
    // Fetch raffle state
    try {
      const stateFromCall = await readContract(config, {
        abi: abi,
        address: address,
        functionName: "getRaffleState",
        args: [],
      });
      const getRaffleState = stateFromCall.toString();
      setRaffleState(getRaffleState);
    } catch (error) {
      console.error("Error fetching raffle state:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [chainId, address]);

  const handleEnterRaffle = async () => {
    try {
      const tx = await writeContractAsync({
        address: address,
        functionName: "enterRaffle",
        abi,
        value: entranceFee,
        args: [],
      });

      // Wait for the transaction to be mined
      // await tx.wait(1);

      toast.success("Transaction Complete!");
      fetchData(); // Refresh data after successful transaction
    } catch (error) {
      console.error("Error entering raffle:", error);
      toast.error("Transaction failed: " + error.message);
    }
  };

  if (!address) {
    return <div>No raffle address detected</div>;
  }

  return (
    <div>
      <Toaster />
      <br />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto"
        onClick={handleEnterRaffle}
      >
        Enter Raffle
      </button>
      Entrance Fee:{" "}
      {entranceFee !== "0"
        ? Web3.utils.fromWei(entranceFee, "ether")
        : "Loading..."}{" "}
      ETH Number of Players: {NumPlayers}
      <br />
      Recent Winner: {recentWinner}
    </div>
  );
};

export default LotteryEntranceClient;
