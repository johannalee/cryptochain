import { GENESIS_DATA } from './config';
import Block from './block';

describe('Block', () => {
    const timestamp = 1;
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({
        timestamp,
        lastHash,
        hash,
        data
    });

    it('has timestamp, lastHash, hash and data properties', () => {
        expect(block).toEqual({
            timestamp,
            lastHash,
            hash,
            data,
        })
    });

    describe('genesis()', () => {
        const genesisBlock = Block.genesis();

        it('returns a Block instance', () => {
            expect(genesisBlock instanceof Block).toBe(true);
        });

        it('returns the genesis data', () => {
            expect(genesisBlock).toEqual(GENESIS_DATA);
        });
    });
});