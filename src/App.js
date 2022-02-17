import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

import githubIcon from './github.png';

//Components
import ChainData from './components/ChainData';
import AddToKeplr from './components/AddToKeplr';

function App() {
  const [chainList, setData] = useState([]);
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

  // fetchChainData gets the selected chainname from the dropdown list 
  // and uses it to fetch chain.json and assetlist.json.
  const fetchChainData = (e) => {
    // Set v to selected chainname or to default in case this function 
    // is called somewhere else (at start).
    let v = (e) ? e.target.value : defaultChain;

    // Set URL for chain.json
    let fieldUrl =
      'https://cdn.jsdelivr.net/gh/cosmos/chain-registry@master/' + v + '/chain.json';

    // Get chain.json file and filter out irrelevant data
    axios.get(fieldUrl).then((res) => {
      let result = { ...res.data };
      delete result.$schema;
      setCurrentChain(result.chain_name);
      setCurrentChainData(result);
    });

    // Set url for assetlist.json
    fieldUrl =
      'https://cdn.jsdelivr.net/gh/cosmos/chain-registry@master/' + v + '/assetlist.json';

    // Get chain.json file and filter out irrelevant data
    axios.get(fieldUrl).then((res) => {
      let result = { ...res.data };
      delete result.$schema;
      setCurrentAssetData(result);
    });
  }
  
  // Returns the header and the AddToKeplr and ChainData components.
  // The header contains a dropdown, which is populated by looping 
  // over the elements in chainList, which is just an obj with the 
  // folders from the GitHub repo.
  return (
    <div className='app bg-gray-700 transition-all ease-in-out duration-300'>
      <header className='sticky z-10 top-0 px-5 py-1 bg-gray-800 shadow-lg' >
        <div className="flex justify-between align-center flex-col md:flex-row ">
          <div className="py-1">
            <h1 className='text-xl font-bold tracking-wider text-gray-100 sm:'>Cosmos Chain Registry</h1>
          </div>
          <div className="py-1">
            <select className='capitalize bg-gray-100 font-bold py-1 px-2 rounded hover:bg-white' id='blockchains' onChange={fetchChainData} value={currentChain}>
              {chainList.map((chain) => {
                return (
                  <option key={chain.name} value={chain.name}>
                    {chain.name}
                  </option>
                  );
              })}

            </select>
            <AddToKeplr currentChainData={currentChainData} currentAssetData={currentAssetData}/>
          </div>
        </div>
      </header>
      <ChainData currentChainData={currentChainData} />
      <footer className="fixed bottom-0  w-full">
      <a href="https://github.com/cosmos/chain-registry" target="_blank" rel="noreferrer" className=" absolute right-0 bottom-0">
          <img src={githubIcon} alt="GitHub Repo" className="m-2 inline-block align-left h-7 brightness-75 hover:scale-110 hover:brightness-90 active:scale-125 active:brightness-100 transition-all ease-in-out duration-150" ></img>
      </a> 
      </footer>
    </div>
  );
}

export default App;
