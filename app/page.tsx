'use client'
import Connect from "@/components/ConnectButton"
import { client } from "@/config/Thirdweb"
import Link from "next/link"
import { base } from "thirdweb/chains"
import { PayEmbed } from "thirdweb/react"

export default function page() {

  return (
    <>

      <div><Connect />  </div>
  
      <Link href={`/createAccount`} className="btn btn-primary">createAccount</Link>
      <Link href={`/createApp`} className="btn btn-primary">createApp</Link>
      <Link href={`/createPos`} className="btn btn-primary">createPos</Link>
      <Link href={`/test`} className="btn btn-primary">test</Link>
      {/* <Link href={`/linkProfile`} className="btn btn-primary">linkProfile</Link> */}
      <PayEmbed
      client={client}
      payOptions={{
        mode: "fund_wallet",
        metadata: {
          name: "Get funds",
        },
        prefillBuy: {
          chain: base,
          amount: "0.01",
        },
        // ... theme, currency, amounts, payment methods, etc.
      }}
    />
    </>
  )
}