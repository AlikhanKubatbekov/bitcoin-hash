import React from 'react';
import BlockHashFlow from './BlockHashFlow';
import BlockLinkingFlow from './BlockLinkingFlow';
import MerkleRootFlow from './MerkleRootFlow';
import TxIDFlow from './TxIDFlow';

const App = () => {
  return (
    <div>
      <TxIDFlow />
      <MerkleRootFlow />
      <BlockHashFlow />
      <BlockLinkingFlow />
    </div>
  );
};

export default App;