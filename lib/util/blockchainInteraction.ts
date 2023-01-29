import { ethers } from "ethers";
import CONTRACT_ABI from "../../src/abi/TestToken.json";

/**
 * This function creates and returns a new instance of an ethers.js contract object.
 * @param provider
 * @returns ethers.Contract() instance
 */
export const getContract = (
  provider:
    | ethers.providers.Provider
    | ethers.providers.Web3Provider
    | ethers.providers.JsonRpcSigner
) => {
  if (!process.env.CONTRACT_ADDRESS) {
    throw new Error(
      "CONTRACT_ADDRESS is not defined in the environment variables"
    );
  }
  return new ethers.Contract(
    process.env.CONTRACT_ADDRESS as string,
    CONTRACT_ABI,
    provider
  );
};

/**
 * This function takes in a signer of type ethers.providers.JsonRpcSigner and returns an object containing the name and symbol of the contract
 * @param signer
 * @returns
 */
export const getContractInfo = async (
  signer: ethers.providers.JsonRpcSigner
) => {
  try {
    const contract = getContract(signer);
    const name = await contract.name();
    const symbol = await contract.symbol();
    return { name: name, symbol: symbol };
  } catch (error) {
    return {
      status: error.message,
    };
  }
};

/**
 * This function takes in a user's address and a signer of type ethers.providers.JsonRpcSigner and returns the user's token balance in decimal
 * @param userAddress
 * @param signer
 * @returns
 */
export const fetchUserBalance = async (
  userAddress: string,
  signer: ethers.providers.JsonRpcSigner
) => {
  const contract = getContract(signer);
  const balance = await contract.balanceOf(userAddress);
  const balanceInDecimal = ethers.BigNumber.from(balance._hex).toNumber();
  return balanceInDecimal;
};

/**
 * This function takes in an address and a signer of type ethers.providers.JsonRpcSigner and returns an object containing the status of the minting process.
 * @param address
 * @param signer
 * @returns
 */
export const mintToken = async (
  address: string,
  signer: ethers.providers.JsonRpcSigner
) => {
  const contract = getContract(signer);
  const amount = 1;
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    };
  }
  try {
    const txHash = await contract.mint(address, amount);
    return {
      status: `Token minting in progress!`,
      txHash: txHash,
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};
