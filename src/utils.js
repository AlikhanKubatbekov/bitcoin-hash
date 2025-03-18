import { createHash } from 'crypto';

function doubleSHA256(data) {
    const hash1 = createHash('sha256').update(data).digest();
    const hash2 = createHash('sha256').update(hash1).digest('hex');
    return hash2;
}

export default { doubleSHA256 };