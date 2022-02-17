import React from 'react';

import copyIcon from '../copyicon.png';

// Function to copy text to clipboard
const copyText = (t) => {
  console.log("copying");

  try {
    // Creates a textfield with text from the parent div to select and copy from, then removes it.
    // This is deprecated but still works. The new Clipboard API is not yet supported on all browsers
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

// Generates a "code block" with a copy icon
const DataBlock = ({ data }) => {
  return (
    <div key="">
      <div className="group px-2 py-1 bg-gray-800 text-gray-300 text-xs font-mono shadow-inner rounded-md hover:-my-1 hover:py-2 transition-all ease-in-out duration-150">
        <img src={copyIcon} alt="Copy to Clipboard" className="opacity-5 group-hover:opacity-100 hover:scale-110 hover:brightness-110 active:scale-125 active:brightness-150 inline-block float-right float-top h-5 -mt-0.5 transition-all ease-in-out duration-150" 
          onClick={copyText}></img>
        {data}
        </div>
    </div>
  );
}

export default DataBlock;
