'use client'
import { useAccount, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'

export function Account() {
    const { address } = useAccount()
    const { disconnect } = useDisconnect()
    const { data: ensName } = useEnsName({ address })
    const { data: ensAvatar } = useEnsAvatar({ name: ensName! })

    return (
        <div className=' flex flex-row'>

            {ensAvatar && <img alt="ENS Avatar" src={ensAvatar} />}

            {address &&
                <div className='btn'>
                    {ensName ?
                        `${ensName} (${address.slice(0, 6)}...${address.slice(-4)})`
                        :
                        <>{address.slice(0, 6)}...{address.slice(-4)}</>
                    }
                </div>
            }

            <button onClick={() => disconnect()} className='btn'>Disconnect</button>

        </div >
    )
}