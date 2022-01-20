import React from 'react';

const BlockChain = ({ currentChain }) => {
  const keys = Object.keys(currentChain);

  return (
    <div>
      {keys.map((el, idx) => {
        return <h1 key={idx}>{el}</h1>;
      })}
    </div>
  );
};

export default BlockChain;
