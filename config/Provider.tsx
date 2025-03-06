'use client'

import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import Thirdweb from "./Thirdweb"
import { WagmiProvider } from "wagmi"
import { config } from "./wgami"

const queryClient = new QueryClient()
export default function Provider({ children }) {
    return (
        <Thirdweb>
            <WagmiProvider config={config}>
                <QueryClientProvider client={queryClient}>
                    {children}
                </QueryClientProvider>
            </WagmiProvider>
        </Thirdweb>

    )
}