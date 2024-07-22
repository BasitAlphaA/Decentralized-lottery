// "use client";

import React, { Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider, useAccount, useConnect, useDisconnect } from "wagmi";
import config from "./config";

const queryClient = new QueryClient();

function WalletOptions() {
  const { connectors, connect } = useConnect();

  return connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>
  ));
}

function Account() {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const disconnectWallet = () => {
    disconnect();
    console.log("Disconnecting wallet...");
  };

  return (
    <div className="border-b-8">
      <div>
        Connected Address: {address.slice(0, 6)}....
        {address.slice(address.length - 4)}
      </div>
      <button onClick={disconnectWallet}>Disconnect</button>
    </div>
  );
}
function ConnectWallet() {
  const { isConnected } = useAccount();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This will run only on the client
    setMounted(true);
    console.log("Component mounted on client");
  }, []);

  if (!mounted) {
    return null; // Prevents mismatches by avoiding rendering on the server
  }

  return <>{isConnected ? <Account /> : <WalletOptions />}</>;
}

function WalletConnect() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<div>Loading...</div>}>
          <ConnectWallet />
        </Suspense>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default WalletConnect;
