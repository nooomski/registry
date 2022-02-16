import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

//Components
import ChainData from './components/ChainData';
import AddToKeplr from './components/AddToKeplr';

function App() {
  const [data, setData] = useState([]);
  const [currentChainData, setCurrentChainData] = useState([]);
  const [currentAssetData, setCurrentAssetData] = useState([]);
  const defaultChain = "cosmoshub";
  const [currentChain, setCurrentChain] = useState(defaultChain);

  useEffect(() => {
    // Get folder structure from repo
    let folderUrl = 'https://api.github.com/repos/cosmos/chain-registry/contents';
    axios.get(folderUrl).then((res) => {
      // Filter only relevant
      const result = res.data.filter((item) => item.type === 'dir' && item.name !== '.github' && item.name !== 'testnets');
      setData(result);
    });
    
    // Fetch the first chain
    fetchChainData();
  }, []);

  const fetchChainData = (e) => {
    let v = (e) ? e.target.value : defaultChain;

    // Set URL
    let fieldUrl =
      'https://cdn.jsdelivr.net/gh/cosmos/chain-registry@master/' + v + '/chain.json';

    // Get chain.json file and filter out irrelevant data
    axios.get(fieldUrl).then((res) => {
      let result = { ...res.data };
      delete result.$schema;
      setCurrentChain(result.chain_name);
      setCurrentChainData(result);
    });

    fieldUrl =
      'https://cdn.jsdelivr.net/gh/cosmos/chain-registry@master/' + v + '/assetlist.json';

    // Get chain.json file and filter out irrelevant data
    axios.get(fieldUrl).then((res) => {
      let result = { ...res.data };
      delete result.$schema;
      setCurrentAssetData(result);
    });
  }
  
  return (
    <div className='app bg-gray-700 transition-all ease-in-out duration-300'>
      <header className='sticky z-10 top-0 flex items-center justify-between px-5 bg-gray-800 h-14 shadow-lg' >
        <h1 className='text-xl font-bold tracking-wider text-gray-100'>Cosmos Chain Registry</h1>
        <div>
          <label htmlFor='blockchains' className='mr-4 font-bold text-gray-100'>
            Select Chain:
          </label>
          <select className='capitalize bg-gray-300' id='blockchains' onChange={fetchChainData} value={currentChain}>
            {data.map((chain) => {
              return (
                <option key={chain.name} value={chain.name}>
                  {chain.name}
                </option>
                );
            })}

          </select>
          <AddToKeplr currentChainData={currentChainData} currentAssetData={currentAssetData}/>
        </div>
      </header>
      <ChainData currentChainData={currentChainData} />
    </div>
  );
}

export default App;
