'use client'

import { client } from "@/lib/clinet";
import { account, signer } from "@/lib/walletClient";
import { evmAddress } from "@lens-protocol/client";
import { fetchAccountsAvailable } from "@lens-protocol/client/actions";
import { useState } from "react";

export default function page() {
  const [sessionClient, setSessionClient] = useState<any>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const authenticateAndFetchAccounts = async () => {
    try {

      // 登录 Lens 并获取会话客户端
      const authenticated = await client.login({
        onboardingUser: {
          app: "0x2a4468A8e44A0965752bD43883bae426795DC0d5",
          wallet: account,
        },
        signMessage: signer.signMessage,
      });

      if (authenticated.isErr()) {
        console.error("Authentication failed:", authenticated.error);
        return;
      }

      const session = authenticated.value;
      setSessionClient(session);

      // 获取可用账户信息
      const result = await fetchAccountsAvailable(client, {
        managedBy: evmAddress(account),
        includeOwned: true,
      });
      setAccounts(result);
    } catch (error) {
      console.error("Error during authentication:", error);
    }
  };
  return (
    <>
      <div>
        <button onClick={authenticateAndFetchAccounts} className="btn btn-primary" disabled={sessionClient}>验证账户</button>
        {accounts.length > 0 ? (
          <ul>
            {accounts.map((data, index) => (
              <li key={index}>{JSON.stringify(data)}</li>
            ))}
          </ul>
        )
          :
          (
            <>
              <p>当前连接没有注册账户</p>
              <button className="btn btn-primary" disabled={!sessionClient}>创建账户</button>
            </>
          )
        }
      </div>
    </>
  )
}