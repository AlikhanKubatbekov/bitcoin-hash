# Merkle Tree in Bitcoin
Overview
In Bitcoin, the SHA-256 function is used, with hashing performed twice (SHA-256(SHA-256(data))), to create a Merkle Tree. The tree summarizes all transactions in a block into a single hash, the Merkle Root, which is stored in the block header.

Construction Process
For 4 transactions (T1, T2, T3, T4), the Merkle Tree is built as follows:

### Step 1: Hashing Transactions (Leaves)
Each transaction is hashed individually
```
H1 = SHA-256(SHA-256(T1))
H2 = SHA-256(SHA-256(T2))
H3 = SHA-256(SHA-256(T3))
H4 = SHA-256(SHA-256(T4))
```
Leaves: H1, H2, H3, H4.

### Step 2: Pairwise Hashing
Pairs are concatenated and hashed:
```
H12 = SHA-256(SHA-256(H1 + H2))
H34 = SHA-256(SHA-256(H3 + H4))
```

Next level: H12, H34.

### Step 3: Creating the Root
Combine the pairs:
``` Root = SHA-256(SHA-256(H12 + H34)) ```

The Root (Merkle Root) represents all transactions.

### Handling Odd Numbers
For 3 transactions (T1, T2, T3):

Duplicate the last hash: H3 becomes H4.
Then:

```
H12 = SHA-256(SHA-256(H1 + H2))
H34 = SHA-256(SHA-256(H3 + H3))
Root = SHA-256(SHA-256(H12 + H34))
```
### Example
For transactions T1, T2, T3, T4 with simplified hashes:

- Leaves:
  - H1 = a1b2 (T1)
  - H2 = c3d4 (T2)
  - H3 = e5f6 (T3)
  - H4 = g7h8 (T4)
- Pairwise:
  - H12 = k9m0 (H1 + H2)
  - H34 = p1q2 (H3 + H4)
- Root:
  - Root = r3s4 (H12 + H34)
### Tree Structure
```
     r3s4
    /    \
  k9m0  p1q2
  /  \  /  \
 a1b2 c3d4 e5f6 g7h8
  |    |    |    |
  T1  T2   T3   T4
```
### Verifying a Transaction
To verify T2:

- You have: H2 = c3d4.
- Given (Merkle path): H1 = a1b2, H34 = p1q2.
- Calculate:
```
H12 = SHA-256(SHA-256(H1 + H2)) = k9m0
Root = SHA-256(SHA-256(H12 + H34)) = r3s4
```


