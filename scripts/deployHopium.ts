import { Address, Cell, Dictionary, Slice, beginCell, toNano } from '@ton/core';
import { Hopium } from '../wrappers/Hopium';
import { compile, NetworkProvider } from '@ton/blueprint';
import { Config } from '../config';
import { Jettons } from '../shared/const';

export async function run(provider: NetworkProvider) {
    const ownerAddress = Address.parse(Config.OWNER_ADDRESS);
    const hopiumTom = provider.open(
        Hopium.createFromConfig(ownerAddress, await compile('Hopium'))
    );

    await hopiumTom.sendDeploy(provider.sender(), toNano('0.05'));

    await provider.waitForDeploy(hopiumTom.address);
}

