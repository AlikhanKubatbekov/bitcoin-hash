import { Background, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';

const nodes = [
  { id: '1', type: 'input', data: { label: 'Version (1)' }, position: { x: 0, y: 0 } },
  { id: '2', type: 'input', data: { label: 'Prev Block Hash (0000f8b2...)' }, position: { x: 200, y: 0 } },
  { id: '3', type: 'input', data: { label: 'Merkle Root (7d865e95...)' }, position: { x: 400, y: 0 } },
  { id: '4', type: 'input', data: { label: 'Timestamp (1698765432)' }, position: { x: 600, y: 0 } },
  { id: '5', type: 'input', data: { label: 'Bits (1d00ffff)' }, position: { x: 800, y: 0 } },
  { id: '6', type: 'input', data: { label: 'Nonce (0)' }, position: { x: 1000, y: 0 } },
	
  { id: '7', data: { label: 'Serialize to 80 Bytes' }, position: { x: 375, y: 100 } },
  { id: '8', data: { label: 'Double SHA-256' }, position: { x: 375, y: 200 } },
  { id: '9', type: 'output', data: { label: 'Block Hash (0000a9c4...)' }, position: { x: 375, y: 300 } },
];

const edges = [
	{ id: 'e1-7', source: '1', target: '7', animated: true },
  { id: 'e2-7', source: '2', target: '7', animated: true },
  { id: 'e3-7', source: '3', target: '7', animated: true },
  { id: 'e4-7', source: '4', target: '7', animated: true },
  { id: 'e5-7', source: '5', target: '7', animated: true },
  { id: 'e6-7', source: '6', target: '7', animated: true },
  { id: 'e7-8', source: '7', target: '8', animated: true },
  { id: 'e8-9', source: '8', target: '9', animated: true },
]

const BlockHashFlow = () => {
  return (
    <div style={{ height: 400 }}>
      <h2>Block Hash Flow</h2>
      <ReactFlowProvider>
			<ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
			</ReactFlowProvider>
    </div>
  );
};

export default BlockHashFlow;