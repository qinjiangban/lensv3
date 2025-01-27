// lib/walletClient.ts
import "viem/window";
import { Address, createWalletClient, custom } from "viem";
import { chains } from "@lens-network/sdk/viem";
import { useAccount, useConnectorClient } from "wagmi";
import { config } from "@/config/wagmi";

export const getWalletClient = async () => {
  if (typeof window === "undefined") {
    throw new Error("This function can only be called on the client side.");
  }
  if (!window.ethereum) {
    throw new Error("MetaMask is not available");
  }

  const [address] = (await window.ethereum.request({
    method: "eth_requestAccounts",
  })) as [Address];

  return createWalletClient({
    account: address,
    chain: chains.testnet,
    transport: custom(window.ethereum),
     pollingInterval: 10_000, 
  });
  
};

//export const { data: walletClient } = useConnectorClient({ config })
//export const account = useAccount({ config })
export const walletClient = await getWalletClient()
export const account = await walletClient.getAddresses()

export const getAccountAndSigner = async () => {
  
  return {
    account,
    signer: {
      signMessage: (message: string) =>
        walletClient.signMessage({ account, message }),
    },
  };
};

export const { signer } = await getAccountAndSigner();
