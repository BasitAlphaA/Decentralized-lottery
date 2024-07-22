// pages/index.js (or any other page)
import WalletConnect from "../components/walletConnectConfig";
// import Header from "../components/Header"
import FromLottery from "../components/LotteryEntrance";

// import "../styles/globals.css";

export default function Home() {
  const dAppMetadata = {
    name: "My DApp", // Replace with your dApp name
    url: "http://localhost:3000/", // Replace with your dApp URL
  };
  return (
    <div className="p-4">
      <h1 className="border-b-2">Decentralized Lottery</h1>
      <WalletConnect />
      <FromLottery />

      <button className="bg-blue-500 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded">
        Test 2 Button
      </button>
    </div>
  );
}
// export default function Home() {
//   return (
//     <>
//       <h1 className="border-b-red-600">Tailwind test</h1>
//       <div>Hyye tailwindcss</div>
//       <div>use tailwind</div>
//       <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-auto">
//         Click Me
//       </button>
//     </>
//   );
// }
// export default function Home() {
//   return (
//     <div className="bg-red-500 text-white p-4">Tailwind CSS is working!</div>
//   );
// }
