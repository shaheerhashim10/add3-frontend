interface WalletConnect {
  address: string;
  status: string;
}

export const connectWallet = async (): Promise<WalletConnect> => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      const obj: WalletConnect = {
        status: "👆🏽 Write a message in the text-field above.",
        address: addressArray[0],
      };
      return obj;
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      } as WalletConnect;
    }
  } else {
    return {
      address: "",
      status:
        "You must install MetaMask, a virtual Ethereum wallet, in your browser.",
    } as WalletConnect;
  }
};

export const getCurrentWalletConnected = async (): Promise<WalletConnect> => {
  if (window.ethereum) {
    try {
      const addressArray = await window.ethereum.request({
        method: "eth_accounts",
      });
      if (addressArray.length > 0) {
        return {
          address: addressArray[0],
          status: "👆🏽 Write a message in the text-field above.",
        } as WalletConnect;
      } else {
        return {
          address: "",
          status: "🦊 Connect to MetaMask using the top right button.",
        } as WalletConnect;
      }
    } catch (err) {
      return {
        address: "",
        status: "😥 " + err.message,
      } as WalletConnect;
    }
  } else {
    return {
      address: "",
      status:
        "You must install MetaMask, a virtual Ethereum wallet, in your browser.",
    } as WalletConnect;
  }
};

export const checkMetamaskNetwork = () => {
  const desiredNetwork = "5"; // network id of Goerli network
  const currentNetwork = window.ethereum.networkVersion;
  if (currentNetwork !== desiredNetwork) {
    alert(`Please switch to the Goerli Test Network`);
    return false;
  } else {
    return true;
  }
};
