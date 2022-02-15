import { stringify } from 'flatted';
import React from 'react';

const ChainData = ({ currentChain }) => {
  /* const keys = Object.keys(currentChain);
  //let val = Object.values(currentChain);
  return (
    <div>
      {keys.map((el, idx) => {
        console.log(String(el));
        return <h1 key={idx}>{el}: {currentChain[0]}</h1>;
      })}
    </div>
  ); */
  
  /* return (
    <div>
      {currentChain.length === undefined ? (
        <pre>{JSON.stringify(currentChain, undefined, 2).replace(/[{",}]/g, '')}</pre>
      ) : (
        <h1 className='m-5 text-xl font-bold'>Nothing selected</h1>
      )}
    </div>
  ); */
};

export default ChainData;
