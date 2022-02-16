import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

import copyIcon from '../copyicon.png';

const copyText = (t) => {
  console.log("copying");

  try {
    const el = document.createElement('textarea');
    el.value = t.target.parentNode.textContent;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    console.log("copy success!")
  }
  catch(err) {
    console.log("couldn't copy :(")
  }
}

const DataBlock = ({ data }) => {
  return (
    <div>
      <div className="group px-2 py-1 bg-gray-800 text-gray-300 text-xs font-mono shadow-inner rounded-md hover:-my-1 hover:py-2 transition-all ease-in-out duration-150">
        <img src={copyIcon} alt="Copy to Clipboard" className="opacity-5 group-hover:opacity-100 hover:scale-110 hover:brightness-110 active:scale-125 active:brightness-150 inline-block float-right float-top h-5 -mt-0.5 transition-all ease-in-out duration-150" 
          onClick={copyText}></img>
        {data}
        </div>
    </div>
  );
}

export default DataBlock;
