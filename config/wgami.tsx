import { http, createConfig } from "wagmi";
import { inAppWalletConnector } from "@thirdweb-dev/wagmi-adapter";
import { defineChain as thirdwebChain, } from "thirdweb";
import { lenstestnet } from "./customChains";
import { client } from "./Thirdweb";

export const config = createConfig({
    chains: [lenstestnet],
    connectors: [
        // add the in-app wallet connector
        inAppWalletConnector({
            client,
            // optional: turn on smart accounts!
            smartAccounts: {
                sponsorGas: true,
                chain: thirdwebChain(lenstestnet),
            },
        }),
    ],
    transports: {
        [lenstestnet.id]: http(),
    },
});
