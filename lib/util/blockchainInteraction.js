const { ethers } = require("ethers");
const CONTRACT_ABI = require("../../src/abi/TestToken.json");
const CONTRACT_ADDRESS = "0x927DFb9e957526e4D40448d6D05A39ea39a2ee6B";

// const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
export const getContract = (provider) => {
  return new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, provider);
};

export const getContractInfo = async (signer) => {
  try {
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );
    const name = await contract.name();
    const symbol = await contract.symbol();
    return { name: name, symbol: symbol };
  } catch (error) {
    return {
      status: error.message,
    };
  }
};

export const fetchUserBalance = async (userAddress, signer) => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const balance = await contract.balanceOf(userAddress);
  const balanceInDecimal = ethers.BigNumber.from(balance._hex).toNumber();
  return balanceInDecimal;
};

export const mintToken = async (address, signer) => {
  const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
  const amount = 1;
  if (!window.ethereum || address === null) {
    return {
      status:
        "💡 Connect your MetaMask wallet to update the message on the blockchain.",
    };
  }
  try {
    const txHash = await contract.mint(address, amount);
    console.log(txHash);
    return {
      status: `ℹ️ Once the transaction is verified by the network, the token will be minted to the entered address.`,
      txHash: txHash,
    };
  } catch (error) {
    return {
      status: "😥 " + error.message,
    };
  }
};
