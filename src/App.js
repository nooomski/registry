import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//Components
import ChainData from './components/ChainData';

function App() {
  const [data, setData] = useState([]);
  const [currentChain, setCurrentchain] = useState([]);
  const defaultChain = "cosmoshub";

  useEffect(() => {
    let folderUrl = 'https://api.github.com/repos/cosmos/chain-registry/contents';
    axios.get(folderUrl).then((res) => {
      const result = res.data.filter((item) => item.type === 'dir' && item.name !== '.github');
      setData(result);
    });
  }, []);

  const handleChange = (e) => {
    fetchChainData(e.target.value);
  };

  const fetchChainData = (v) => {
    let fieldUrl =
      'https://cdn.jsdelivr.net/gh/cosmos/chain-registry@master/' + v + '/chain.json';

    axios.get(fieldUrl).then((res) => {
      let result = { ...res.data };
      delete result.$schema;
      setCurrentchain(result);
    });
  }

  return (
    <div className='app'>
      <header className='flex items-center justify-between px-5 bg-gray-800 h-14'>
        <h1 className='text-xl font-bold tracking-wider text-white'>Chain Registry</h1>
        <div>
          <label htmlFor='blockchains' className='mr-4 font-bold text-white'>
            Select Chain:
          </label>
          <select className='capitalize' id='blockchains' onChange={handleChange} value={defaultChain}>
            {data.map((chain) => {
              return (
                <option key={chain.name} value={chain.name}>
                  {chain.name}
                </option>
                );
            })}
            {fetchChainData(defaultChain)}

          </select>
        </div>
      </header>
      <ChainData currentChain={currentChain} />
    </div>
  );
}

export default App;
