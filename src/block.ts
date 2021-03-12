import { GENESIS_DATA } from './config';
import { cryptoHash } from './crypto-hash';

export interface BlockProps {
  timestamp: number;
  lastHash: string;
  hash: string;
  data: any;
}

class Block {
  timestamp: number;
  lastHash: string;
  hash: string;
  data: any;

  constructor({ timestamp, lastHash, hash, data }: BlockProps) {
    this.timestamp = timestamp;
    this.lastHash = lastHash;
    this.hash = hash;
    this.data = data;
  }

  static genesis() {
    return new this(GENESIS_DATA);
  }

  static mineBlock({ lastBlock, data }: { lastBlock: BlockProps; data: any }) {
    const timestamp = Date.now();
    const lastHash = lastBlock.hash;

    return new this({
      timestamp,
      lastHash,
      hash: cryptoHash(String(timestamp), lastHash, data),
      data,
    });
  }
}

export default Block;
