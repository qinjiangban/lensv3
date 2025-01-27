'use client'

import Thirdweb from "./Thirdweb"
export default function Provider({ children }) {
    return (
        <Thirdweb>
            {children}
        </Thirdweb>

    )
}