import { config } from "@/config/wagmi";
import { useClient, useConnectorClient } from "wagmi";


export const publicClient = useClient({ config })


