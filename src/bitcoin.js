import { createHash } from 'crypto';

function doubleSHA256(data) {
    const hash1 = createHash('sha256').update(data).digest(); 
    const hash2 = createHash('sha256').update(hash1).digest('hex'); 
    return hash2; 
}

// 1. Compute Transaction ID (txid)
function computeTxID(transaction) {
    // In real Bitcoin, transaction would be a raw byte array
    // Here, we simulate with a string for simplicity
    const rawData = Buffer.from(JSON.stringify(transaction), 'utf8'); // Serialize to bytes
    const txid = doubleSHA256(rawData); 
    return txid;
}

// 2. Build Merkle Root from transactions
function buildMerkleRoot(transactions) {
    // Step 1: Compute txids for each transaction (leaves)
    let leaves = transactions.map(tx => computeTxID(tx));

    if (leaves.length === 1) {
        return leaves[0];
    }

    // Step 2: Build the Merkle Tree level by level
    let currentLevel = leaves;
    while (currentLevel.length > 1) {
        let tempLevel = [];
        for (let i = 0; i < currentLevel.length; i += 2) {
            if (i + 1 < currentLevel.length) {
                const pair = currentLevel[i] + currentLevel[i + 1];
                const newHash = doubleSHA256(Buffer.from(pair, 'hex'));
                tempLevel.push(newHash);
            } else {
                const pair = currentLevel[i] + currentLevel[i];
                const newHash = doubleSHA256(Buffer.from(pair, 'hex'));
                tempLevel.push(newHash);
            }
        }
        currentLevel = tempLevel; 
    }

    return currentLevel[0];
}

// 3. Compute Block Hash
function computeBlockHash(blockHeader) {
    // Serialize block header into a byte array (simplified)
    const rawHeader = Buffer.concat([
        Buffer.from(blockHeader.version.toString(16).padStart(8, '0'), 'hex'), // 4 bytes
        Buffer.from(blockHeader.prevBlockHash, 'hex'), // 32 bytes
        Buffer.from(blockHeader.merkleRoot, 'hex'),   // 32 bytes
        Buffer.from(blockHeader.timestamp.toString(16).padStart(8, '0'), 'hex'), // 4 bytes
        Buffer.from(blockHeader.bits.toString(16).padStart(8, '0'), 'hex'),     // 4 bytes
        Buffer.from(blockHeader.nonce.toString(16).padStart(8, '0'), 'hex')     // 4 bytes
    ]);
    const blockHash = doubleSHA256(rawHeader);
    return blockHash;
}

// 4. Mine a Block (simplified Proof-of-Work)
function mineBlock(blockHeader, target) {
    let nonce = 0;
    const targetPrefix = '0'.repeat(target); // Simplified target (e.g., leading zeros)
    while (true) {
        blockHeader.nonce = nonce;
        const hash = computeBlockHash(blockHeader);
        if (hash.startsWith(targetPrefix)) { // Check if hash meets difficulty
            return { hash, nonce };
        }
        nonce++;
        if (nonce > 1000000) break; 
    }
    return null; 
}

// 5. Link Blocks and Build Chain
function linkBlock(previousBlock, currentTransactions) {
    const prevBlockHash = previousBlock ? computeBlockHash(previousBlock.header) : '0'.repeat(64);
    const merkleRoot = buildMerkleRoot(currentTransactions);

    const blockHeader = {
        version: 1,                    // 4 bytes
        prevBlockHash: prevBlockHash,  // 32 bytes
        merkleRoot: merkleRoot,        // 32 bytes
        timestamp: Math.floor(Date.now() / 1000), // 4 bytes
        bits: 0x1d00ffff,              // 4 bytes, simplified
        nonce: 0                       // 4 bytes
    };

    // Mine the block (find a valid hash)
    const { hash, nonce } = mineBlock(blockHeader, 4); // Target: 4 leading zeros
    blockHeader.nonce = nonce;

    return { header: blockHeader, hash };
}

const transactions = [
    { from: "Alice", to: "Bob", amount: 1 },
    { from: "Bob", to: "Charlie", amount: 0.5 },
    { from: "Charlie", to: "Dave", amount: 0.2 },
    { from: "Dave", to: "Eve", amount: 0.4 }
];

const genesisBlock = linkBlock(null, transactions);
console.log("Genesis Block Hash:", genesisBlock.hash);
console.log("Genesis Block Header:", genesisBlock.header);

const nextTransactions = [
    { from: "Eve", to: "Alice", amount: 0.05 }
];
const secondBlock = linkBlock(genesisBlock, nextTransactions);
console.log("Second Block Hash:", secondBlock.hash);
console.log("Second Block Header:", secondBlock.header);