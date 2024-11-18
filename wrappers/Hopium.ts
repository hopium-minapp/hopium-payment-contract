import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Dictionary, Sender, SendMode, Slice, toNano } from '@ton/core';
export interface HopiumTomConfig {
    ownerAddress?: Address;
}

export class Hopium implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) { }

    static createFromAddress(address: Address) {
        return new Hopium(address);
    }

    static createFromConfig(ownerAddress: Address, code: Cell, workchain = 0) {
        const data = beginCell()
            .storeAddress(ownerAddress)  // Store owner address
            .endCell();
        const init = { code, data };
        return new Hopium(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().storeUint(0xd372158c, 32).storeUint(0, 64).endCell(),
        });
    }
    static upgradeMessage(new_code: Cell, query_id: bigint | number = 0) {
        return beginCell().storeUint(0x2508d66a, 32).storeUint(query_id, 64)
            .storeRef(new_code)
            .endCell();
    }
    async sendUpgrade(provider: ContractProvider, via: Sender, new_code: Cell, value: bigint = toNano('0.1'), query_id: bigint | number = 0) {
        await provider.internal(via, {
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: Hopium.upgradeMessage(new_code, query_id),
            value
        });
    }
    static tonWithdrawMsg(reverse_ton: bigint) {
        return beginCell()
            .storeUint(0xd372338c, 32)
            .storeUint(0, 64)
            .storeCoins(reverse_ton)
            .endCell();
    }

    async sendTxTonWithdraw(provider: ContractProvider,
        via: Sender,
        reverse_ton: bigint,
        total_ton_amount: bigint = toNano('0.01')) {

        await provider.internal(via, {
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: Hopium.tonWithdrawMsg(reverse_ton),
            value: total_ton_amount,
        });
    }
}
