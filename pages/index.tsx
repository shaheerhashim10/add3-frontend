import {
  connectWallet,
  getCurrentWalletConnected,
} from "@/lib/util/walletConnection";
import {
  fetchUserBalance,
  getContractInfo,
  mintToken,
} from "@/lib/util/blockchainInteraction";
import Head from "next/head";
import { useEffect, useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}
export default function Home() {
  const [walletAddress, setWalletAddress] = useState("");
  const [mintAddress, setMintAddress] = useState("");
  const [status, setStatus] = useState<any>("");
  const [signer, setSigner] = useState<ethers.providers.JsonRpcSigner>();
  const [tokenName, setTokenName] = useState<String>("");
  const [tokenSymbol, setTokenSymbol] = useState<String>("");
  const [walletBalance, setWalletBalance] = useState<Number>(0);

  //called only once
  useEffect(() => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const providerSigner = provider.getSigner();
    setSigner(providerSigner);

    async function mainFunction() {
      addWalletListener(providerSigner);
      const { address, status } = await getCurrentWalletConnected();
      fetchContractInfo(providerSigner);
      if (providerSigner && address)
        fetchBalanceFromBlockchain(providerSigner, address);
      setWalletAddress(address);

      // blockchainEventListener(provider);
      // const { address, status } = await getCurrentWalletConnected();
      // setWalletAddress(address);
      // addWalletListener(providerSigner);
      /* if (providerSigner && address)
        loadMessagesFromBlockchain(providerSigner, address); */
    }
    mainFunction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function addWalletListener(signer: ethers.providers.JsonRpcSigner) {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: any | any[]) => {
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          setMintAddress("");
          if (signer && accounts[0])
            fetchBalanceFromBlockchain(signer, accounts[0]);
          // setStatus("Write a message in the text-field above.");
        } else {
          setWalletAddress("");
          setStatus("🦊 Connect to MetaMask using the top right button.");
        }
      });
    } else {
      <p>
        {" "}
        🦊{" "}
        <a
          target="_blank"
          href={`https://metamask.io/download.html`}
          rel="noreferrer"
        >
          You must install MetaMask, a virtual Ethereum wallet, in your browser.
        </a>
      </p>;
    }
  }

  const fetchBalanceFromBlockchain = async (
    signer: ethers.providers.JsonRpcSigner,
    walletAddress: string
  ) => {
    console.log("fetch--");
    const userBalance = await fetchUserBalance(walletAddress, signer);
    setWalletBalance(userBalance);
  };

  const fetchContractInfo = async (signer: ethers.providers.JsonRpcSigner) => {
    const { name, symbol } = await getContractInfo(signer);
    setTokenName(name);
    setTokenSymbol(symbol);
  };

  const connectWalletPressed = async () => {
    const { address, status } = await connectWallet();

    if (signer && address) fetchBalanceFromBlockchain(signer, address);
    if (signer) fetchContractInfo(signer);
    setWalletAddress(address);
  };

  const clickMintToken = async () => {
    setMintAddress("");
    const { status, txHash } = await mintToken(mintAddress, signer);
    // setStatus(status);
    // setTxhash(txHash);
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
        <div className="mt-4" id="status">
          {status}
          {/* {txHash && (
            <>
              <br />
              <a
                target="_blank"
                href={`https://goerli.etherscan.io/tx/${txHash}`}
                rel="noreferrer"
              >
                ✅
                <span className="underline">
                  {" "}
                  Click here to view the status of your transaction on
                  Etherscan!
                </span>
              </a>
            </>
          )} */}
        </div>
        <div className="flex flex-col text-2xl gap-12">
          <span>Token Name: {tokenName && tokenName}</span>
          <span>Token Symbol: {tokenSymbol && tokenSymbol}</span>
          <span>
            <>User Balance: {walletBalance}</>
          </span>
        </div>

        <div className="flex justify-center mt-12">
          <div className="mb-3 xl:w-96">
            {/* <label
              htmlFor="exampleFormControlInput1"
              className="form-label inline-block mb-2 text-gray-700"
            >
              Enter wallet address
            </label> */}
            <input
              type="text"
              className="form-control block w-full px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="exampleFormControlInput1"
              placeholder="Enter wallet address here..."
              onChange={(e) => setMintAddress(e.target.value)}
              value={mintAddress}
            />
          </div>
          <div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 ml-2 rounded"
              onClick={clickMintToken}
            >
              Mint Token
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
