// app/page.tsx
"use client";

import { useState } from "react";
import { account, walletClient, signer, } from "@/lib/walletClient";
import { evmAddress } from "@lens-protocol/client";
import { createApp, fetchAccountsAvailable, fetchApp } from "@lens-protocol/client/actions";
import { client } from "@/lib/clinet";
import ConnectWallet from "@/components/ConnectWallet";
import { AppMetadata } from "./AppMetadata";
import { storageClient } from "@/lib/storageClient";
import { handleWith } from "@lens-protocol/client/viem";
import Link from "next/link";

export default function Page() {
  const [sessionClient, setSessionClient] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [AppMetadataUrl, setAppMetadataUrl] = useState<string | undefined>(undefined);
  const [appdata, setAppData] = useState<any>(null);
  const [txHash, setTxHash] = useState<string | null>(null);

  const authenticateAndFetchAccounts = async () => {
    try {
      // 登录 Lens 并获取会话客户端
      const authenticated = await client.login({
        builder: {
          address: account,
        },
        signMessage: signer.signMessage,
      });

      if (authenticated.isErr()) {
        console.error("Authentication failed:", authenticated.error);
        return;
      }

      const session = authenticated.value;
      setSessionClient(session);

    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };

  const createAppButton = async () => {
    try {
      if (!sessionClient) {
        console.error("Session client is not available. Please authenticate first.");
        return;
      }

      const { uri } = await storageClient.uploadAsJson(AppMetadata);
      const AppMetadataUrl = await storageClient.resolve(uri);
      setAppMetadataUrl(AppMetadataUrl)

      const result = await createApp(sessionClient, {
        metadataUri: uri, // 上一步中的 URI
      })
        .andThen(handleWith(walletClient))
        .andThen(sessionClient.waitForTransaction)
        .andThen((txHash) => fetchApp(sessionClient, { txHash }));
        setTxHash(txHash)

      if (result.isErr()) {
        return console.error(result.error);
      }
      
      setAppData(result.value)

    } catch (error) {
      console.error("Error during app creation:", error);
    }
  }

  return (
    <>



      <div className="">
        <div className="mb-4">
          {!sessionClient && <p>创建应用程序之前，请先进行开发者账户身份验证。</p>}
          <button
            onClick={authenticateAndFetchAccounts}
            className="btn btn-primary"
            disabled={sessionClient}
          >
            {sessionClient ? "认证成功！" : "签名认证并获取开发者账户"}
          </button>
        </div>
      </div>


      <button onClick={createAppButton} disabled={!sessionClient} className="btn btn-primary mb-4">
        createAppButton
      </button>


      <div className="mb-4">
        {AppMetadataUrl && (
          <>
            <span>App Metadata URL: </span>
            <Link href={AppMetadataUrl} target="_blank" className="hover:link-hover">
              {AppMetadataUrl}
            </Link>
          </>
        )}
      </div>


      <div className="mb-4">
        {txHash && (
          <p>
            Transaction Hash:{" "}
            <a href={`https://block-explorer.testnet.lens.dev/tx/${txHash}`} target="_blank" className="hover:link-hover"   >
              {txHash}
            </a>
          </p>
        )}
      </div>


      <div>
        {appdata ? (
          <div className="border p-4 rounded">
            <h2 className="text-lg font-bold mb-2">App Data:</h2>
            <pre className="bg-gray-100 p-2 rounded overflow-x-auto">
              {JSON.stringify(appdata, null, 2)}
            </pre>
          </div>
        ) : (
          <p>尚未创建应用。</p>
        )}
      </div>


      {/*       <div> {appdata?.map((data: any) => (
        <div>
          {data}
        </div>
      ))}  </div> */}





    </>
  );
}
