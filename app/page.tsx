'use client'
import Connect from "@/components/ConnectButton"
import ConnectWallet from "@/components/ConnectWallet"
import Link from "next/link"

export default function page() {

  return (
    <>

      <div><Connect />  </div>
  
      <Link href={`/createAccount`} className="btn btn-primary">createAccount</Link>
      <Link href={`/createApp`} className="btn btn-primary">createApp</Link>
      <Link href={`/createPos`} className="btn btn-primary">createPos</Link>
      <Link href={`/test`} className="btn btn-primary">test</Link>
      <Link href={`/linkProfile`} className="btn btn-primary">linkProfile</Link>
      
    </>
  )
}