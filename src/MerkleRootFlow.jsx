import { Background, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';

const nodes = [
  // Nodes (Leaves)
  { id: '1', type: 'input', data: { label: 'tx1 (f4184fc5...)' }, position: { x: 100, y: 0 } },
  { id: '2', type: 'input', data: { label: 'tx2 (6b86b273...)' }, position: { x: 250, y: 0 } },
  { id: '3', type: 'input', data: { label: 'tx3 (d4735e3a...)' }, position: { x: 400, y: 0 } },
  { id: '4', type: 'input', data: { label: 'tx4 (4e074085...)' }, position: { x: 550, y: 0 } },
  // Pairwise Hashing
  { id: '5', data: { label: 'Concat + DoubleSHA256' }, position: { x: 175, y: 100 } },
  { id: '6', data: { label: 'Concat + DoubleSHA256' }, position: { x: 475, y: 100 } },
  { id: '7', data: { label: 'H12 (1b645389...)' }, position: { x: 175, y: 200 } },
  { id: '8', data: { label: 'H34 (5f70bf18...)' }, position: { x: 475, y: 200 } },
  // Root
  { id: '9', data: { label: 'Concat + DoubleSHA256' }, position: { x: 325, y: 300 } },
  { id: '10', type: 'output', data: { label: 'Merkle Root (7d865e95...)' }, position: { x: 325, y: 400 } },
];

const edges = [
	{ id: 'e1-5', source: '1', target: '5', animated: true },
  { id: 'e2-5', source: '2', target: '5', animated: true },
  { id: 'e3-6', source: '3', target: '6', animated: true },
  { id: 'e4-6', source: '4', target: '6', animated: true },
  { id: 'e5-7', source: '5', target: '7', animated: true },
  { id: 'e6-8', source: '6', target: '8', animated: true },
  { id: 'e7-9', source: '7', target: '9', animated: true },
  { id: 'e8-9', source: '8', target: '9', animated: true },
  { id: 'e9-10', source: '9', target: '10', animated: true },
]

const MerkleRootFlow = () => {
  return (
    <div style={{ height: 500 }}>
      <h2>Merkle Root Flow</h2>
      <ReactFlowProvider>
			<ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
			</ReactFlowProvider>
    </div>
  );
};

export default MerkleRootFlow;