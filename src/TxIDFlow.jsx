import { Background, Controls, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import React from 'react';

const nodes = [
  { id: '1', type: 'input', data: { label: 'Transaction (e.g., "Alice sends 1 BTC")' }, position: { x: 250, y: 0 } },
  { id: '2', data: { label: 'Serialize to Bytes' }, position: { x: 250, y: 100 } },
  { id: '3', data: { label: 'SHA-256' }, position: { x: 200, y: 200 } },
  { id: '4', data: { label: 'SHA-256 Again' }, position: { x: 400, y: 200 } },
  { id: '5', type: 'output', data: { label: 'txid (e.g., f4184fc5...)' }, position: { x: 250, y: 300 } },
];

const edges = [
	{ id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e2-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
];

const TxIDFlow = () => {
  return (
    <div style={{ height: 400 }}>
      <h2>Transaction ID (txid) Flow</h2>
      <ReactFlowProvider>
			<ReactFlow nodes={nodes} edges={edges}>
        <Background />
        <Controls />
      </ReactFlow>
			</ReactFlowProvider>
    </div>
  );
};

export default TxIDFlow;