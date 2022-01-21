import React from 'react';

const BlockChain = ({ currentChain }) => {
  return (
    <div>
      {currentChain.length === undefined ? (
        <pre>{JSON.stringify(currentChain, undefined, 2).replace(/[{",}]/g, '')}</pre>
      ) : (
        <h1 className='m-5 text-xl font-bold'>Nothing selected</h1>
      )}
    </div>
  );
};

export default BlockChain;
