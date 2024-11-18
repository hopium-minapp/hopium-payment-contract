import "dotenv/config"
import process from "process"
export const Config = {
    WALLET_MNEMONIC: process.env.WALLET_MNEMONIC as string,
    USDT_JETTON_WALLET_ADDRESS: process.env.USDT_JETTON_WALLET_ADDRESS as string,
    OWNER_ADDRESS: process.env.OWNER_ADDRESS as string,
    HOPIUM_ADDRESS: process.env.HOPIUM_ADDRESS as string,
}