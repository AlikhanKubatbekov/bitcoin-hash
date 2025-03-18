import { Background, ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CryptoJS from 'crypto-js';
import { useState } from 'react';

const initialNodes = [
  {
    id: '1',
    data: { label: 'Start: blockData = "block1", nonce = 0' },
    position: { x: 0, y: 250 },
    style: { backgroundColor: '#ffffff', border: '1px solid #000' },
  },
  {
    id: '2',
    data: { label: 'Prepare Input: blockData + ":" + nonce' },
    position: { x: 250, y: 250 },
    style: { backgroundColor: '#ffffff', border: '1px solid #000' },
  },
  {
    id: '3',
    data: { label: 'Hash: SHA-256(input)' },
    position: { x: 500, y: 250 },
    style: { backgroundColor: '#ffffff', border: '1px solid #000' },
  },
  {
    id: '4',
    data: { label: 'Check: Does hash start with "00"?' },
    position: { x: 750, y: 250 },
    style: { backgroundColor: '#ffffff', border: '1px solid #000' },
  },
  {
    id: '5',
    data: { label: 'Success: Show hash and nonce' },
    position: { x: 1000, y: 150 },
    style: { backgroundColor: '#ffffff', border: '1px solid #000' },
  },
  {
    id: '6',
    data: { label: 'Increment Nonce' },
    position: { x: 1000, y: 350 },
    style: { backgroundColor: '#ffffff', border: '1px solid #000' },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', label: '' },
  { id: 'e2-3', source: '2', target: '3', label: '' },
  { id: 'e3-4', source: '3', target: '4', label: '' },
  { id: 'e4-5', source: '4', target: '5', label: 'Yes' },
  { id: 'e4-6', source: '4', target: '6', label: 'No' },
  { id: 'e6-2', source: '6', target: '2', label: '' },
];

const App = () => {
  const [state, setState] = useState({
    blockData: 'block1',
    nonce: 0,
    currentInput: '',
    currentHash: '',
    found: false,
    currentNode: '1',
    nodes: initialNodes,
  });

  const computeHash = (data: string) => {
    return CryptoJS.SHA256(data).toString();
  };

  const step = () => {
    setState((prevState) => {
      const { currentNode, blockData, nonce, currentInput, currentHash, found } = prevState;
      let newNonce = nonce;
      let newInput = currentInput;
      let newHash = currentHash;
      let newFound = found;
      let newCurrentNode = currentNode;

      if (currentNode === '1') {
        newCurrentNode = '2';
      } else if (currentNode === '2') {
        newInput = `${blockData}:${nonce}`;
        newCurrentNode = '3';
      } else if (currentNode === '3') {
        newHash = computeHash(newInput);
        newCurrentNode = '4';
      } else if (currentNode === '4') {
        if (newHash.startsWith('00')) {
          newFound = true;
          newCurrentNode = '5';
        } else {
          newCurrentNode = '6';
        }
      } else if (currentNode === '6') {
        newNonce = nonce + 1;
        newCurrentNode = '2';
      }

      const updatedNodes = initialNodes.map((node) => {
        const newNode = { ...node };
        if (node.id === '2') {
          newNode.data.label = `Prepare Input: ${newInput}`;
        } else if (node.id === '3') {
          newNode.data.label = `Hash: ${newHash}`;
        } else if (node.id === '5') {
          newNode.data.label = `Success: Hash = ${newHash}, Nonce = ${newNonce}`;
        }

        newNode.style = {
          ...node.style,
          backgroundColor: node.id === newCurrentNode ? '#ffcc00' : '#ffffff',
        };
        return newNode;
      });

      return {
        ...prevState,
        blockData,
        nonce: newNonce,
        currentInput: newInput,
        currentHash: newHash,
        found: newFound,
        currentNode: newCurrentNode,
        nodes: updatedNodes,
      };
    });
  };
л
  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
      <div style={{ padding: '10px' }}>
        <h1>Bitcoin Hashing Demo with React Flow</h1>
        <button onClick={step} disabled={state.found} style={{ margin: '10px' }}>
          Next Step
        </button>
      </div>
      <ReactFlowProvider>
        <ReactFlow
          nodes={state.nodes}
          edges={initialEdges}
          fitView
          style={{ flex: 1 }}
          defaultViewport={{ x: 0, y: 0, zoom: 0.75 }}
        >
          <Background />
        </ReactFlow>
      </ReactFlowProvider>
    </div>
  );
};

export default App;