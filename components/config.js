// config.js
import { createConfig } from "wagmi";
import { base, sepolia, mainnet, hardhat } from "wagmi/chains";
import { injected /* walletConnect*/ } from "wagmi/connectors";
import { http } from "wagmi"; // Adjust import to match correct path

const projectId = "91d560d756869bce0ae4a7e88455b03f"; // Replace with your WalletConnect Project ID

const dAppMetadata = {
  name: "My DApp", // Replace with your dApp name
  url: "http://localhost:3000/", // Replace with your dApp URL
};

const config = createConfig({
  chains: [base, sepolia, mainnet, hardhat],
  connectors: [
    injected(),
    // walletConnect({ projectId }),
    // metaMask({ dAppMetadata }), // Pass the dAppMetadata option
    // safe(),
  ],
  syncConnectedChain: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [hardhat.id]: http(),
  },
});

export default config;
