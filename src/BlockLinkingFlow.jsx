import { Background, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';

const nodes = [
  { id: '1', type: 'input', data: { label: 'Previous Block' }, position: { x: 100, y: 0 } },
  { id: '2', data: { label: 'Compute Block Hash (0000f8b2...)' }, position: { x: 100, y: 100 } },
  { id: '3', type: 'input', data: { label: 'Current Transactions' }, position: { x: 400, y: 0 } },
  { id: '4', data: { label: 'Build Merkle Root (7d865e95...)' }, position: { x: 400, y: 100 } },
  { id: '5', data: { label: 'Create Block Header' }, position: { x: 250, y: 200 } },
  { id: '6', data: { label: 'Mine Block (Nonce Search)' }, position: { x: 250, y: 300 } },
  { id: '7', type: 'output', data: { label: 'New Block Hash (0000a9c4...)' }, position: { x: 250, y: 400 } },
];

const edges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-5', source: '2', target: '5', label: 'prevBlockHash' },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', label: 'merkleRoot' },
  { id: 'e5-6', source: '5', target: '6', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
];

const BlockLinkingFlow = () => {
  return (
    <div style={{ height: 500 }}>
      <h2>Block Linking Flow</h2>
      <ReactFlowProvider>
			<ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
			</ReactFlowProvider>
    </div>
  );
};

export default BlockLinkingFlow;