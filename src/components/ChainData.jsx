import React from 'react';

//Components
import RenderValue from './RenderValue';

const ChainData = ({ currentChainData }) => {
  const keys = Object.keys(currentChainData);

  // Create some rows and loop over all elements in chain.json and 
  // create a RenderValue component to display the contents.
  return (
    <div>
      <div className="flex flex-col">
        <div className=" overflow-x-auto">
          <div className="py-2 align-middle inline-block min-w-full">
            <div className="shadow overflow-hidden border-b border-gray-900">
              <table className="min-w-full divide-y divide-gray-900">
                <thead className="bg-gray-700">
                  <tr>
                    <th
                      key="field"
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider"
                    >
                      Field
                    </th>
                    <th
                      key="value"
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
};

export default ChainData;
