import crypto from 'crypto';

// Secure Hashing Algorithm-256bits
// 64 Characters in hex
export const cryptoHash = (...inputs: string[]): string => {
    const hash = crypto.createHash('sha256');
    hash.update(inputs.sort().join(' '));
    return hash.digest('hex');
};