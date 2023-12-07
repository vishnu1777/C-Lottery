import { useEffect, useState } from "react";
import {
  useAddress,
  useContract,
  useContractRead,
  useContractWrite,
} from "@thirdweb-dev/react";
import { NextPage } from "next";
import Head from "next/head";
import {
  Header,
  Login,
  Loading,
  CountdownTimer,
  AdminControl,
} from "../components";
import { ethers } from "ethers";
import { currency } from "../constants";
import { toast } from "react-hot-toast";
import Marquee from "react-fast-marquee";

const Home: NextPage = () => {
  const address = useAddress();
  const [userTickets, setUserTickets] = useState<number>(0);
  const { contract } = useContract("0x965bc21a75C3b8A3FBEd3B4263B8b27962F901A1");
   
  const{data:remainingTickets,isLoading:loading} = useContractRead(contract,"RemainingTickets")
 
  const { data: currentWinningReward } = useContractRead(
    contract,
    "CurrentWinningReward"
  );
  const { data: ticketPrice } = useContractRead(contract, "ticketPrice");
  const { data: ticketCommission } = useContractRead(
    contract,
    "ticketCommission"
  );
  const { data: expiration } = useContractRead(contract, "expiration");
  const { mutateAsync: BuyTickets, isLoading } = useContractWrite(contract, "BuyTickets")
  const { data: tickets } = useContractRead(contract, "getTickets");
  const { data: winnings } = useContractRead(
    contract,
    "getWinningsForAddress",
   [ address]
  );
  const { mutateAsync: WithdrawWinnings } = useContractWrite(
    contract,
    "WithdrawWinnings"
  );
  const { data: lastWinnner } = useContractRead(contract, "lastWinner");
  const { data: lastWinnerAmount } = useContractRead(
    contract,
    "lastWinnerAmount"
  );
  const { data: lotteryOperator } = useContractRead(
    contract,
    "lotteryOperator"
  );
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (!tickets) return;

    const totalTickets: string[] = tickets;
    const noOfUserTickets = totalTickets.reduce(
      (total, ticketAddress) => (ticketAddress === address ? total + 1 : total),
      0
    );
    setUserTickets(noOfUserTickets);
  }, [tickets, address]);

  const onWithdrawWinnings = async () => {
    const notification = toast.loading("Withdrawing Winningss...");

    try {
      await WithdrawWinnings([{}]);
      toast.success("Withdraw went successfully!", { id: notification });
    } catch (e) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };

  const handleClick = async () => {
    if (!ticketPrice) return;
    const notification = toast.loading("Buying your tickets..");
    try {
      const data = await BuyTickets({
        value: [
          ethers.utils.parseEther(
          (
            Number(ethers.utils.formatEther(ticketPrice)) * quantity
          ).toString())
        ]
      });
     
     
      toast.success("Tickets Purchased Successfully!", { id: notification });
    } catch (e) {
      toast.error("Whoops something went wrong", { id: notification });
    }
  };

  // if (isLoading) return <Loading />;
  if (!address) return <Login />;

  return (
    <div className="bg-[#091B18] min-h-screen flex-flex-col">
      <Head>
        <title>C-Lottery</title>
      </Head>

      <div className="flex-1">
        {/* Header here */}
        <Header />
        {/* Marquee here */}
        <Marquee className="bg-[#0A1F1C] p-5 mb-5" gradient={false} speed={100}>
          <div className="flex space-x-2">
            <h4 className="font-bold text-white">
              LastWinner:{lastWinnner ? lastWinnner : "0x000"}
            </h4>
            <h4 className="font-bold text-white">
              PreviousWinnings:
              {lastWinnerAmount &&
                ethers.utils.formatEther(lastWinnerAmount).toString()}{" "}
              {currency}
            </h4>
          </div>
        </Marquee>
        {/* Admin control if user address is the admin address */}
        {lotteryOperator === address && (
          <div className="flex justify-center">
            <AdminControl />
          </div>
        )}
        {/* The next draw box */}
        {winnings > 0 && (
          <div className="max-w-md md:max-w-2xl lg:max-w-4xl mx-auto mt-5">
            <button
              onClick={onWithdrawWinnings}
              className="p-5 bg-gradient-to-b from-orange-500 to-emerald-600 animate-pulse text-center rounded-xl w-full"
            >
              <p className="font-bold">Winner Winner Chicken Dinner</p>
              <p>
                Total Winnings:{ethers.utils.formatEther(winnings.toString())}{" "}
                {currency}
              </p>
              <br />
              <p className="font-semibold">Click here to withdraw</p>
            </button>
          </div>
        )}
        <div className="space-y-5 md:space-y-0 m-5 md:flex md:flex-row items-start justify-center md:space-x-5">
          <div className="stats-container">
            <h1 className="text-5xl text-white font-semibold text-center">
              The Next Draw
            </h1>
            <div className="flex p-2  space-x-2">
              <div className="stats">
                <h2 className="text-sm">Total Pool</h2>
                <p className="text-xl">
                  {currentWinningReward &&
                    ethers.utils.formatEther(
                      currentWinningReward.toString()
                    )}{" "}
                  {currency}
                </p>
              </div>
              <div className="stats">
                <h2 className="text-sm">Tickets Remaining</h2>
                <p className="text-xl">{remainingTickets?.toNumber()}</p>
              </div>
            </div>
            {/* Countdown Timer */}
            <div className="mt-5 mb-3">
              <CountdownTimer {...expiration} />
            </div>
          </div>
          <div className="stats-container space-y-2">
            <div className="stats-container">
              <div className="flex justify-between items-center text-white pb-2">
                <h2>Price per ticket</h2>
                <p>
                  {ticketPrice &&
                    ethers.utils.formatEther(ticketPrice.toString())}{" "}
                  {currency}
                </p>
              </div>
              <div className="flex text-white items-center space-x-2 bg-[#091B18] border-[#004337] border p-4">
                <p>TICKETS</p>
                <input
                  className="flex w-full bg-transparent text-right outline-none"
                  type="number"
                  min={1}
                  max={10}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
              </div>
              <div className="space-y-2 mt-5">
                <div className="flex items-center justify-between text-emerald-300 text-sm italic font-extrabold">
                  <p>Total Cost Of Tickets</p>
                  <p>
                    {ticketPrice &&
                      Number(ethers.utils.formatEther(ticketPrice.toString())) *
                        quantity}{" "}
                    {currency}
                  </p>
                </div>

                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>Service Fees</p>
                  <p>
                    {ticketCommission &&
                      ethers.utils.formatEther(
                        ticketCommission?.toString()
                      )}{" "}
                    {currency}
                  </p>
                </div>
                <div className="flex items-center justify-between text-emerald-300 text-xs italic">
                  <p>+ Network Fees</p>
                  <p>TBC</p>
                </div>
              </div>
              <button
                disabled={
                  expiration?.toString() < Date.now().toString() ||
                  remainingTickets?.toNumber() === 0
                }
                onClick={handleClick}
                className="mt-5 w-full bg-gradient-to-br from-orange-500 to-emerald-600
              px-10 py-5 rounded-md text-white shadow-xl font-semibold disabled:from-gray-600 disabled:to-gray-600 
              disabled:text-gray-100  disabled:cursor-not-allowed
              "
              >
                Buy {quantity} tickets for{" "}
                {ticketPrice &&
                  Number(ethers.utils.formatEther(ticketPrice.toString())) *
                    quantity}{" "}
                {currency}
              </button>
            </div>
            {userTickets > 0 && (
              <div className="stats">
                <p className="text-lg mb-2">
                  You have {userTickets} Tickets in this draw
                </p>
                <div className="flex max-w-sm flex-wrap gap-x-2 gap-y-2">
                  {Array(userTickets)
                    .fill("")
                    .map((_, index) => (
                      <p
                        className="text-emerald-300 h-20 w-12 bg-emerald-500/30 rounded-lg flex flex-shrink-0
                    items-center justify-center text-xs italic
                    "
                        key={index}
                      >
                        {index + 1}
                      </p>
                    ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <footer
        className="border-t border-emerald-500/20 flex items-center
      text-white justify-between p-5
      "
      >
        <img
          className="h-10 w-10 filter hue-rotate-90 opacity-20 rounded-full"
          src="https://avatars.githubusercontent.com/u/67725452?v=4"
          alt="logo"
        />
        <p className="text-xs text-emerald-900 pl-5">
          @Copyright 2022 - 2023 . All rights Reserved @C-Lottery
        </p>
      </footer>
    </div>
  );
};

export default Home;
