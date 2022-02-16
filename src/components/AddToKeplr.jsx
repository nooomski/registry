import React from 'react';

const AddToKeplr = ({ currentChainData, currentAssetData }) => {
    //const keys = Object.keys(currentChainData);
    //console.log(currentChainData.chain_id);

    if (Object.keys(currentChainData).length !== 0) {
        
        try {
            var obj = {};
            obj.chainId = currentChainData.chain_id;
            obj.chainName = currentChainData.chain_name;
            obj.rpc = currentChainData.apis.rpc[0].address;
            obj.rest = currentChainData.apis.rest[0].address;
            obj.bip44 = {};
            obj.bip44.coinType = currentChainData.slip44;
            obj.coinType = currentChainData.slip44;
            
            let p = currentChainData.bech32_prefix;
            obj.bech32Config = {};
            obj.bech32Config.bech32PrefixAccAddr    = p;
            obj.bech32Config.bech32PrefixAccPub     = p + "pub";
            obj.bech32Config.bech32PrefixValAddr    = p + "valoper";
            obj.bech32Config.bech32PrefixValPub     = p + "valoperpub";
            obj.bech32Config.bech32PrefixConsAddr   = p + "valcons";
            obj.bech32Config.bech32PrefixConsPub    = p + "valconspub";
            
            if (Object.keys(currentAssetData).length !== 0) {
                obj.currencies = [];
                obj.currencies[0] = {};
                obj.currencies[0].coinDenom = currentAssetData.assets[0].denom_units[1].denom;
                obj.currencies[0].coinMinimalDenom = currentAssetData.assets[0].denom_units[0].denom;
                obj.currencies[0].coinDecimals = currentAssetData.assets[0].denom_units[1].exponent;
                obj.currencies[0].coinGeckoId = currentAssetData.assets[0].coingecko_id;

                obj.feeCurrencies = obj.currencies

                obj.stakeCurrency = {};
                obj.stakeCurrency.coinDenom = obj.currencies[0].coinDenom;
                obj.stakeCurrency.coinMinimalDenom = obj.currencies[0].coinMinimalDenom;
                obj.stakeCurrency.coinDecimals = obj.currencies[0].coinDecimals;
                obj.stakeCurrency.coinGeckoId = obj.currencies[0].coinGeckoId;
            }

            obj.gasPriceStep = {};
            obj.gasPriceStep.low = "0.01";
            obj.gasPriceStep.average = "0.025";
            obj.gasPriceStep.high = "0.03";

            obj.features = [];
            console.log("chain obj created")
        }
        catch (err) {
            console.log(err.message);
        }
    }
    //console.log(obj);

    const addKeplr = async (e) => {
        console.log('adding to keplr');
        try {
            await window.keplr.experimentalSuggestChain(obj);
            console.log('success!')
        }
        catch(err) {
            console.log(err.message);
        }
    }
    
    return (
        <button className='bg-gray-600 hover:bg-gray-700 text-gray-100 font-bold py-1 px-4 ml-4 rounded' id='keplrAdd' onClick={addKeplr}>Add to Keplr</button>
    )
}

export default AddToKeplr;