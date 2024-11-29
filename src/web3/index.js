const ethers = require("ethers");
const SafeLockModuleABI = require("./SafeLockModuleABI.json");
const config = require("../config");

const target_address = "0xCF8390A74c59e008df3f6154bECf798402301698";

const provider = new ethers.JsonRpcProvider(config.ALCHEMY_URL);
const signer = new ethers.Wallet(config.PRIVATE_KEY, provider);

const contract = new ethers.Contract(target_address, SafeLockModuleABI, signer);

async function lock(toAddress, spinValue) {
    try {
        const tx = await contract.lock.populateTransaction(toAddress, spinValue);
        const signedTx = await signer.sendTransaction(tx);

        console.log("Transaction sent:", signedTx.hash);

        provider.once(signedTx.hash, (transaction) => {
            console.log("Transaction mined:", transaction.hash);
            console.log("Block number:", transaction.blockNumber);
        });

        return signedTx;
    } catch (error) {
        console.error("Error revealing spin:", error);
        throw error;
    }
}

module.exports = {
    lock,
};
