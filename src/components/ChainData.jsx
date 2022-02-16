import { stringify } from 'flatted';
import React from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const renderValue = (ccd) => {
  let val = JSON.stringify(ccd).replace(/[{",}]/g, '')
  console.log(val);

  switch(true) {
    case (val == 'live'):
      return (
        <div className="capitalize">
          {val}
             <span className="mx-1 relative inline-flex rounded-full h-3 w-3 bg-emerald-500"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span></span>
        </div>
      );
    case ((/^genesis_url/).test(val)):
      return (
        <div>
          <div className="px-2 py-1 bg-gray-800 text-gray-300 font-mono rounded-md">
            <a href={ccd.genesis_url} target="_blank" className="hover:bg-emerald-800">
              {ccd.genesis_url}
            </a>
          </div>
        </div>
      );
    case ((/^git_repo/).test(val)):
      return (
        <div>
          <label className="px-2">GitHub Repo:</label>
          <div className="my-1 mb-5 px-2 py-1 bg-gray-800 text-gray-300 font-mono rounded-md">
            <a href={ccd.git_repo} target="_blank" className="hover:bg-emerald-800">
              {ccd.git_repo}
            </a>
          </div>
          <label className="px-2">Binaries:</label>
          <div className="my-1 px-2 py-1 bg-gray-800 text-gray-300 font-mono rounded-md">
            {Object.keys(ccd.binaries).map((el) => (
              <div>{el}:&nbsp;
                <a href={String(ccd.binaries[el])} target="_blank" className="hover:bg-emerald-800">
                  {String(ccd.binaries[el])}
                </a>
              </div>
            ))}
          </div>
        </div>
      );//{JSON.stringify(ccd.binaries)}
    case ((/^seeds/).test(val)):
      return (
        <div>
          <label className="px-2">Seeds:</label>
          <div className="my-1 mb-5 px-2 py-1 bg-gray-800 text-gray-300 font-mono rounded-md">
            {Object.keys(ccd.seeds).map((el) => (
              <div className="inline-block">{String(ccd.seeds[el].address)},&nbsp;
              </div>
            ))}
          </div>
          <label className="px-2">Persistent Peers:</label>
          <div className="my-1 px-2 py-1 bg-gray-800 text-gray-300 font-mono rounded-md">
            {Object.keys(ccd.persistent_peers).map((el) => (
              <div className="inline-block">{String(ccd.persistent_peers[el].address)},&nbsp;
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return (
        <div>
          {val}
        </div>
      );
  }
}

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
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
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
                    <tr key={idx} className="hover:bg-cyan-900">
                      <td className="px-6 py-4 w-1/6">
                        <div className="text-sm font-medium text-gray-200 capitalize">{el.replace("_"," ")}</div>
                      </td>
                      <td className="px-6 py-4 w-5/6 break-all">
                      <div className="text-sm text-gray-200 ">{renderValue(currentChainData[el])}</div>
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
