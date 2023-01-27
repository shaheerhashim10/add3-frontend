import { connectWallet } from "@/lib/util/walletConnection";
import Head from "next/head";
import { useState } from "react";

export default function Home() {
  const [walletAddress, setWallet] = useState("");

  const connectWalletPressed = async () => {
    const { address, status } = await connectWallet();
    setWallet(address);
  };
  return (
    <>
      <Head>
        <title>Add3 Frontend</title>
      </Head>
      <div className="md:mx-72 mx-auto mt-8 px-4  sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="flex justify-end p-8">
          <div>
            <button
              className="inline-block px-6 py-2.5 bg-yellow-500 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-yellow-600 hover:shadow-lg focus:bg-yellow-600 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-yellow-700 active:shadow-lg transition duration-150 ease-in-out"
              id="walletButton"
              onClick={connectWalletPressed}
            >
              {walletAddress.length > 0 ? (
                "Connected: " +
                String(walletAddress).substring(0, 6) +
                "..." +
                String(walletAddress).substring(38)
              ) : (
                <span>Connect Wallet</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
