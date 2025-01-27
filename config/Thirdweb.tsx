'use client'
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";

export const client = createThirdwebClient({
    clientId: process.env.THIRDWEB_CLIENT_ID || 'a41e2751fa956a2b5e165ad5ba7bbef0',
});
export default function Thirdweb({ children }) {
    return (
        <ThirdwebProvider>
            {children}
        </ThirdwebProvider>
    );
}
