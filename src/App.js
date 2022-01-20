import logo from './logo.svg';
import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import BlockChain from './components/BlockChain';

function App() {
  const [data, setData] = useState([]);
  const [currentChain, setCurrentchain] = useState([]);

  let folderUrl = 'https://api.github.com/repos/cosmos/chain-registry/contents';

  useEffect(() => {
    axios.get(folderUrl).then((res) => {
      const result = res.data.filter((item) => item.type === 'dir' && item.name !== '.github');
      setData(result);
    });
  }, []);

  const handleChange = (e) => {
    let fieldUrl =
      'https://cdn.jsdelivr.net/gh/cosmos/chain-registry@master/' + e.target.value + '/chain.json';

    axios.get(fieldUrl).then((res) => {
      let result = { ...res.data };
      delete result.$schema;
      setCurrentchain(result);
    });
  };

  return (
    <div className='app'>
      <header className='flex justify-between h-14 bg-gray-800'>
        <h1 className='text-white'>Chain Registry</h1>
        <div>
          <label htmlFor='blockchains'>Select Blockchains</label>
          <select id='blockchains' onChange={handleChange}>
            {data.map((chain) => {
              return (
                <option key={chain.name} value={chain.name}>
                  {chain.name}
                </option>
              );
            })}
          </select>
        </div>
      </header>
      <BlockChain currentChain={currentChain} />
    </div>
  );
}

export default App;
