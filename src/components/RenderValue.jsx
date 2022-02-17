import React from 'react';

// Components
import DataBlock from './DataBlock';

const RenderValue = ({ subChainData }) => {
  // Convert subfield to string
  let val = JSON.stringify(subChainData).replace(/[{",}]/g, '')

  // Generate different output layout based on the value
  switch(true) {

    // Create little icon for Live chains
    case (val === 'live'):
      return (
        <div className="capitalize">
          {val}
             <span className="mx-1 relative inline-flex rounded-full h-3 w-3 bg-emerald-500"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span></span>
        </div>
      );
    
    // Parse fee token & min gas price
    case ((/^fee_tokens/).test(val)):
      return (
        <div>
          {(subChainData.fee_tokens[0].denom !== undefined) ? (
            <div>Token: {subChainData.fee_tokens[0].denom}</div>
          ) : (
            <div>Token: not specified</div>
          )}
           {(subChainData.fee_tokens[0].fixed_min_gas_price !== undefined) ? (
            <div>Fixed Minimum Gas Price: {subChainData.fee_tokens[0].fixed_min_gas_price}</div>
          ) : (
            <div>Fixed Minimum Gas Price: not specified</div>
          )}
        </div>
      );
    
    // Genesis URL link
    case ((/^genesis_url/).test(val)):
      return (
        <DataBlock data={(
          <a href={subChainData.genesis_url} target="_blank" rel="noreferrer" className="hover:bg-emerald-800">
            {subChainData.genesis_url}
          </a>
        )}/>
      );
    
    // Split Repo & Binaries into two sections with links.
    case ((/^git_repo|binaries/).test(val)):
      return (
        <div>
          <div className="px-2 mb-1">GitHub Repo:</div>
          {(subChainData.git_repo !== undefined) ? (
            <DataBlock data={(
              <a href={subChainData.git_repo} target="_blank" rel="noreferrer" className="hover:bg-emerald-800">
                {subChainData.git_repo}
              </a>
            )}/>
          ) : (
            <DataBlock data="not listed" />
          )}
          <div className="px-2 mb-1 mt-5">Binaries:</div>
          {(subChainData.binaries !== undefined) ? (
            <DataBlock data=
              {Object.keys(subChainData.binaries).map((el, idx) => (
                <div key={idx}>{el}:&nbsp;
                  <a href={String(subChainData.binaries[el])} target="_blank" rel="noreferrer" className="hover:bg-emerald-800">
                    {String(subChainData.binaries[el])}
                  </a>
                </div>
              ))}
            />
          ) : (
            <DataBlock data="none listed" />
          )}
        </div>
      );
    
    // Split Peers into two sections, comma seperated
    case ((/^seeds|persistent_peers/).test(val)):
      return (
        <div>
          <div className="px-2 mb-1">Seeds:</div>
          {(subChainData.seeds !== undefined) ? (
            <DataBlock data=
              {Object.keys(subChainData.seeds).map((el, idx, ar) => (
                <div key={idx} className="inline-block">
                  {String(subChainData.seeds[el].address)}{(idx + 1 === ar.length) ? (<span>&nbsp;</span>) : (<span>,&nbsp;</span>)}
                </div>
              ))}
            />
          ) : (
            <DataBlock data="none listed" />
          )}
          <div className="px-2 mb-1 mt-5">Persistent Peers:</div>
          {(subChainData.persistent_peers !== undefined) ? (
            <DataBlock data=
              {Object.keys(subChainData.persistent_peers).map((el, idx, ar) => (
                <div key={idx} className="inline-block">
                  {String(subChainData.persistent_peers[el].address)}{(idx + 1 === ar.length) ? (<span>&nbsp;</span>) : (<span>,&nbsp;</span>)}
                </div>
              ))}
            />
          ) : (
            <DataBlock data="none listed" />
          )}
        </div>
      );

    // Split APIs into three sections, with links, comma seperated
    case ((/^rpc|rest|grpc/).test(val)):
      return (
        <div>
          <div className="px-2 mb-1">RPC:</div>
          {(subChainData.rpc !== undefined) ? (
            <DataBlock data=
              {Object.keys(subChainData.rpc).map((el, idx, ar) => (
                <div key={idx} className="inline-block">
                  <a href={String(subChainData.rpc[el].address)} target="_blank" rel="noreferrer" className="hover:bg-emerald-800">
                    {String(subChainData.rpc[el].address)}
                  </a>
                  {(idx + 1 === ar.length) ? (<span>&nbsp;</span>) : (<span>,&nbsp;</span>)}
                </div>
              ))}
            />
          ) : (
            <DataBlock data="none listed" />
          )}
          <div className="px-2 mb-1 mt-5">REST:</div>
          {(subChainData.rest !== undefined) ? (
            <DataBlock data=
              {Object.keys(subChainData.rest).map((el, idx, ar) => (
                <div key={idx} className="inline-block">
                  <a href={String(subChainData.rest[el].address)} target="_blank" rel="noreferrer" className="hover:bg-emerald-800">
                    {String(subChainData.rest[el].address)}
                  </a>
                  {(idx + 1 === ar.length) ? (<span>&nbsp;</span>) : (<span>,&nbsp;</span>)}
                </div>
              ))}
            />
          ) : (
            <DataBlock data="none listed" />
          )}
            <div className="px-2 mb-1 mt-5">gRPC:</div>
          {(subChainData.grpc !== undefined) ? (
            <DataBlock data=
              {Object.keys(subChainData.grpc).map((el, idx, ar) => (
                <div key={idx} className="inline-block">
                  <a href={String(subChainData.grpc[el].address)} target="_blank" rel="noreferrer" className="hover:bg-emerald-800">
                    {String(subChainData.grpc[el].address)}
                  </a>
                  {(idx + 1 === ar.length) ? (<span>&nbsp;</span>) : (<span>,&nbsp;</span>)}
                </div>
              ))}
            />
          ) : (
            <DataBlock data="none listed" />
          )}
        </div>
      );
    
    // Print names of each explorer with a link to the main page
    case ((/^kind|tx_page/).test(val)):
      return (
        <div className="capitalize">
          {Object.keys(subChainData).map((el, idx, ar) => (
            <div key={idx} className="inline-block">
              <div>
                <a href={String(subChainData[el].url)} target="_blank" rel="noreferrer" className="hover:text-emerald-200 hover:underline">
                  {String(subChainData[el].kind)}
                </a>
                {(idx + 1 === ar.length) ? (<span>&nbsp;</span>) : (<span>,&nbsp;</span>)}
              </div>
            </div>
          ))}
        </div>
      );

    // Just print the stringified value as a default
    default:
      return (
        <div>
          {val}
        </div>
      );
  }
}

export default RenderValue;
