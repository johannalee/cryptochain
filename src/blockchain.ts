import Block from './block';
import { cryptoHash } from './crypto-hash';

class Blockchain {
  chain: Block[];

  constructor() {
    this.chain = [Block.genesis()];
  }

  addBlock(data: any) {
    const newBlock = Block.mineBlock({
      lastBlock: this.chain[this.chain.length - 1],
      data,
    });
    this.chain.push(newBlock);
  }

  static isValidChain(chain: Block[]): boolean {
    if (JSON.stringify(Block.genesis()) !== JSON.stringify(chain[0]))
      return false;
    return !chain
      .slice(1)
      .some(
        ({ timestamp, lastHash, hash, data }) =>
          cryptoHash(String(timestamp), lastHash, data) !== hash
      );
  }

  replaceChain(chain: Block[]) {
    if (this.chain.length > chain.length) {
      console.error('The incoming chain must be logger');
      return;
    }

    if (!Blockchain.isValidChain(chain)) {
      console.error('The incoming chain must be valid');
      return;
    }

    console.log('replacing chain with', chain);
    this.chain = chain;
  }
}

export default Blockchain;
