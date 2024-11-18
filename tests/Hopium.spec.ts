import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { Cell, toNano } from '@ton/core';
import { Hopium } from '../wrappers/Hopium';
import '@ton/test-utils';
import { compile } from '@ton/blueprint';

describe('Hopium', () => {
    let code: Cell;

    beforeAll(async () => {
        code = await compile('Hopium');
    });

    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let hopiumTom: SandboxContract<Hopium>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        hopiumTom = blockchain.openContract(Hopium.createFromConfig({}, code));

        deployer = await blockchain.treasury('deployer');

        const deployResult = await hopiumTom.sendDeploy(deployer.getSender(), toNano('0.05'));

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: hopiumTom.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and hopiumTom are ready to use
    });
});
