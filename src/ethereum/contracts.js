import { Transaction } from "ethereumjs-tx";
import Web3 from "web3";
import { abi as mintABI } from "./NFT.json";

const rinkebyInfuraUrl =
  "https://rinkeby.infura.io/v3/c808b650ae2c4f7e8691e9086cae0e94";
const rinkebyContractAddress = "0x605c7f1b7bd41aacc77da46be77c36622da86d33";
const walletAccountAddress = "0x5cC377D9c84136E708C612b00a2617DF635f83ae";
const web3 = new Web3(new Web3.providers.HttpProvider(rinkebyInfuraUrl));
const privateKey = Buffer.from(
  "3c90126762f743ef8eadf39cd65da5b6c044b46239cf2d4806f039aa31c14be1",
  "hex"
);

export const mintNft = (address, tokenId) => {
  return new Promise((resolve,reject) => {
    if (!Web3.utils.isAddress(address)) {
        reject({ success: false, error: "Invalid Address!" });
      }
      const contract = new web3.eth.Contract(mintABI, rinkebyContractAddress);
      try {
        const functionAbi = contract.methods.mint(address, tokenId).encodeABI();
    
        web3.eth.getTransactionCount(walletAccountAddress, (err, txCount) => {
          // Build the transaction
          const txObject = {
            nonce: web3.utils.toHex(txCount),
            to: rinkebyContractAddress,
            value: web3.utils.toHex(web3.utils.toWei("0", "ether")),
            gasLimit: web3.utils.toHex(2100000),
            gasPrice: web3.utils.toHex(web3.utils.toWei("10", "gwei")),
            data: functionAbi,
          };
    
          // Sign the transaction
          const tx = new Transaction(txObject, { chain: 'rinkeby' });
          tx.sign(privateKey);
    
          const serializedTx = tx.serialize();
          const raw = "0x" + serializedTx.toString("hex");
    
          console.log(raw);
    
          // Broadcast the transaction
          web3.eth.sendSignedTransaction(raw, (err, txHash) => {
            if(txHash) {
                resolve({ success: true, txHash: txHash });
            } else {
                resolve({ success: false, error: 'failed to mint!' });
            }
            
          });
        });
      } catch (err) {
        reject({ success: false, error: err });
      }
  })
};
