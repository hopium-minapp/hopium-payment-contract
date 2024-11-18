import { Address, toNano, Cell } from '@ton/core';
import { Hopium } from '../wrappers/Hopium';
import fs from 'fs/promises';
import { compile, NetworkProvider } from '@ton/blueprint';
import { Config } from '../config';

export async function run(provider: NetworkProvider) {
    const compilePath = "build/Hopium.compiled.json";
    const minter = provider.open(Hopium.createFromAddress(Address.parse(Config.HOPIUM_ADDRESS)));
    const newCode = await readCompileFile(compilePath);
    await minter.sendUpgrade(provider.sender(), newCode, toNano('0.01'));
}

async function readCompileFile(filePath: string): Promise<Cell> {
    try {
        const fileContent = await fs.readFile(filePath, 'utf-8');
        const jsonData = JSON.parse(fileContent);
        if (!jsonData.hex) {
            throw new Error('Not exist compile.json');
        }
        const newCode = Cell.fromBoc(Buffer.from(jsonData.hex, 'hex'))[0];
        return newCode;
    } catch (error) {
        console.error(error);
        throw error;
    }
}