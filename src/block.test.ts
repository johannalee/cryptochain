import { GENESIS_DATA } from './config';
import Block from './block';
import { cryptoHash } from './crypto-hash';

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
        
        describe('mineBlock()', () => {
            const lastBlock = Block.genesis();
            const data = 'mined data';
            const minedBlock = Block.mineBlock({ lastBlock, data });

            it('returns a Block instance', () => {
                expect(minedBlock instanceof Block).toBe(true);
            });

            it('sets the `lastHash` to be the `hash` of the lastBlock', () => {
                expect(minedBlock.lastHash).toEqual(lastBlock.hash);
            });

            it('sets the `data`', () => {
                expect(minedBlock.data).toEqual(data);
            });

            it('sets a `timestamp`', () => {
                expect(minedBlock.timestamp).not.toEqual(undefined);
            });

            it('creates a SHA-256 `hash` based on the proper inputs', () => {
                expect(minedBlock.hash).toEqual(cryptoHash(String(minedBlock.timestamp), lastBlock.hash, data))
            });
        });
    });
});