import Blockchain from './blockchain';
import Block from './block';

describe('Blockchain', () => {
  let blockchain: Blockchain, shorterChain: Blockchain;

  beforeEach(() => {
    blockchain = new Blockchain();
    blockchain.addBlock('Bears');
    blockchain.addBlock('Beets');
    blockchain.addBlock('Battlestar Galactica');

    shorterChain = new Blockchain();
  });
  it('contains a `chain` Array instance', () => {
    expect(blockchain.chain instanceof Array).toBe(true);
  });

  it('starts with the genesis block', () => {
    expect(blockchain.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block to the chain', () => {
    const newData = 'foo bar';
    blockchain.addBlock(newData);
    expect(blockchain.chain[blockchain.chain.length - 1]).toHaveProperty(
      'data',
      newData
    );
  });

  describe('isValidChain()', () => {
    describe('when the chain does not start with the genesis block', () => {
      it('returns false', () => {
        blockchain.chain[0].data = 'fake-genesis';
        expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
      });
    });

    describe('when the chain starts with the genesis block and has multiple blocks', () => {
      describe('and a lastHash reference has changed', () => {
        it('returns false', () => {
          blockchain.chain[2].lastHash = 'broken-lastHash';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe('and the chain contains a block with an invalid field', () => {
        it('returns false', () => {
          blockchain.chain[2].data = 'some-bad-and-evil-data';
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
        });
      });
      describe('and the chain does not contain any invalid blocks', () => {
        it('returns true', () => {
          expect(Blockchain.isValidChain(blockchain.chain)).toBe(true);
        });
      });
    });
  });

  describe('replaceChain()', () => {
    let errorMock: jest.Mock, logMock: jest.Mock;

    beforeEach(() => {
      errorMock = jest.fn();
      logMock = jest.fn();

      global.console.error = errorMock;
      global.console.log = logMock;
    });

    describe('when the new chain is not longer', () => {
      it('does not replace the chain', () => {
        const ogChain = blockchain.chain;
        // @ts-ignore
        shorterChain.chain[0] = { new: 'chain' };
        blockchain.replaceChain(shorterChain.chain);
        expect(blockchain.chain).toEqual(ogChain);
      });
    });

    describe('when the new chain is longer', () => {
      describe('and the chain is invalid', () => {
        let ogChain: Block[];

        beforeEach(() => {
          ogChain = shorterChain.chain;
          blockchain.chain[2].hash = 'wrong-hash';
          shorterChain.replaceChain(blockchain.chain);
        });

        it('does not replace the chain', () => {
          expect(shorterChain.chain).toEqual(ogChain);
        });

        it('logs an error', () => {
          expect(errorMock).toHaveBeenCalled();
        });
      });

      describe('and the chain is valid', () => {
        beforeEach(() => {
          shorterChain.replaceChain(blockchain.chain);
        });

        it('replaces the chain', () => {
          expect(shorterChain.chain).toEqual(blockchain.chain);
        });

        it('logs about the chain replacemet', () => {
          expect(logMock).toHaveBeenCalled();
        });
      });
    });
  });
});
