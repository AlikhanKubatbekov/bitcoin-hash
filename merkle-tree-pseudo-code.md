
### Merkle tree pseudo code

```markdown
```javascript
// Function to compute double SHA-256 hash
Function DoubleSHA256(data):
    hash1 = SHA-256(data)
    hash2 = SHA-256(hash1)
    return hash2

// Function to build Merkle Root from transactions
Function BuildMerkleRoot(transactions):
    // Step 1: Hash each transaction to create leaves
    leaves = empty array
    For each transaction in transactions:
        leaf = DoubleSHA256(transaction)
        leaves.append(leaf)

    // If there's only one transaction, return its hash
    If length(leaves) == 1:
        return leaves[0]
    
    // Step 2: Build tree until root is reached
    current_level = leaves
    While length(current_level) > 1:
        temp_level = empty array
        For i = 0 to length(current_level) - 1 step 2:
            If i + 1 < length(current_level): // Pair exists
                pair = current_level[i] + current_level[i + 1] // Concatenate
                new_hash = DoubleSHA256(pair)
                temp_level.append(new_hash)
            Else: // Odd number, duplicate last hash
                pair = current_level[i] + current_level[i]
                new_hash = DoubleSHA256(pair)
                temp_level.append(new_hash)
        current_level = temp_level
    
    // Step 3: Return the root
    return current_level[0]
