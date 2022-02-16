import React, { useState } from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

//Components
import RenderValue from './RenderValue';

const hoverCopyIcon = () => {
  return (
    <div id="copyIcon">
      Hovering right meow!
      <span role="img" aria-label="cat">
        🐱
      </span>
    </div>
  );
};

const ChainData = ({ currentChainData }) => {
  const keys = Object.keys(currentChainData);
  let val;

  return (
    <div>
      {keys.map((el, idx) => {
        console.log(idx + " " + String(el) + ": " + String(currentChainData[el]));
        //return <h1 key={idx}>{el}: {String(currentChainData[el])}</h1>;
      })}

      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-900">
              <table className="min-w-full divide-y divide-gray-900">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Field
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-700 divide-y divide-gray-600">
                  {keys.map((el, idx) => (
                    <tr key={idx} className="">
                      <td className="px-6 py-4 w-1/6">
                        <div className="text-sm font-medium text-gray-200 capitalize">{el.replace("_"," ")}</div>
                      </td>
                      <td className="px-6 py-4 w-5/6 break-all">
                      <div className="text-sm text-gray-200"><RenderValue subChainData={currentChainData[el]} /></div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  
  /* return (
    <div>
      {currentChainData.length === undefined ? (
        <pre>{JSON.stringify(currentChainData, undefined, 2).replace(/[{",}]/g, '')}</pre>
      ) : (
        <h1 className='m-5 text-xl font-bold'>Nothing selected</h1>
      )}
    </div>
  ); */
};

export default ChainData;
