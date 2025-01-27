'use client'
import { client } from "@/config/Thirdweb";
import { createThirdwebClient } from "thirdweb";
import { base } from "thirdweb/chains";
import { ConnectButton } from "thirdweb/react";
import { darkTheme } from "thirdweb/react";
import {
    inAppWallet,
    createWallet,
} from "thirdweb/wallets";



const wallets = [
    inAppWallet({
        auth: {
            options: [
                "google",
                "apple",
                "x",
                "facebook",
                "github",
                "email",
/*                 "passkey",
                "telegram",
                "coinbase",
                "farcaster",
                "line", */
            ],
        },
    }),
    createWallet("io.metamask"),
    createWallet("com.coinbase.wallet"),
    createWallet("com.okex.wallet"),
    createWallet("me.rainbow"),
    createWallet("global.safe"),
    createWallet("app.phantom"),
    createWallet("so.onekey.app.wallet"),
    createWallet("com.bitget.web3"),
    createWallet("com.binance"),
    createWallet("org.uniswap"),
];

export default function Connect() {
    return (
        <ConnectButton
            client={client}
            wallets={wallets}
            //chains={base}
            theme={darkTheme({
                colors: {
                    accentText: "hsl(70, 81%, 49%)",
                    accentButtonBg: "hsl(70, 81%, 49%)",
                },
            })}
            
            connectModal={{
                size: "wide",
                showThirdwebBranding: false,
            }}
            detailsModal={{
                payOptions: {
                  buyWithCrypto: false,
                  buyWithFiat:false
                },
              }}
/*             accountAbstraction={{
                chain: ethereum, // replace with the chain you want
                sponsorGas: true,
            }} */

        />
    );
}
