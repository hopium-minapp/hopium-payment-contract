import { NetworkProvider } from '@ton/blueprint';
import { JettonWallet } from '../wrappers/JettonWallet';
import { Address, Cell } from '@ton/core';
import { Config } from "../config"

export async function run(provider: NetworkProvider) {
    const ui = provider.ui();
    try {
        const wallet = provider.open(JettonWallet.createFromAddress(Address.parse(Config.USDT_JETTON_WALLET_ADDRESS)));

        const ownerAddress = Address.parse(Config.HOPIUM_ADDRESS);
        const jettonWallet = await wallet.getWalletAddress(ownerAddress);

        const hexData = 'b5ee9c7201010101002400004380125ea3aff89ef7ab54d7f7ffe27264782d8861a4d3867cac594287314d24ecab70';
        await extractAddressFromCell(hexData)
        console.log(Address.parse("kQCS9R1_xPe9Wqa_v_8TkyPBbEMNJpwz5WLKFDmKaSdlW6jb"));

        // ui.write('Transaction sent');
    } catch (e: any) {
        ui.write(e.message);
        return;
    }
}
async function extractAddressFromCell(hexData: string): Promise<Address | null> {
    // Step 1: Convert the hex string to a Buffer
    const buffer = Buffer.from(hexData, 'hex');

    // Step 2: Parse the BOC data to get the cell
    const cell = Cell.fromBoc(buffer)[0]; // Assuming a single-cell BOC

    // Step 3: Create a Slice from the cell to read its contents
    const slice = cell.beginParse();

    // Step 4: Load the address directly from the slice
    const address = slice.loadAddress(); // This loads an Address if it was stored in the slice

    // Step 5: Return or log the address
    if (address) {
        console.log("Address:", address.toString());
    } else {
        console.log("No valid address found in the cell.");
    }

    return address;
}