// LotteryEntrance.js

import dynamic from "next/dynamic";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import config from "./config";

const queryClient = new QueryClient();
const LotteryEntranceClient = dynamic(
  () => import("./LotteryEntranceClient.js"),
  {
    ssr: false,
  }
);

export default function FromLottery() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <LotteryEntranceClient />
      </QueryClientProvider>
    </WagmiProvider>
  );
}
