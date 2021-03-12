import { BlockProps } from './block';
// the first block with dummy value for last hash
export const GENESIS_DATA: BlockProps = {
  timestamp: 1,
  lastHash: '-----',
  hash: 'hash-one',
  data: [],
};
