import { GENESIS_DATA } from './config';
export interface BlockProps { timestamp: number, lastHash: string, hash: string, data: any };
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
}

export default Block;