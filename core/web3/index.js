const ethers = require("ethers");
const SafeLockModuleABI = require("./SafeLockModuleABI.json");
const config = require("../plugins/config");

const target_address = "0xCF8390A74c59e008df3f6154bECf798402301698";

const provider = new ethers.JsonRpcProvider(config.ALCHEMY_URL);
const signer = new ethers.Wallet(config.PRIVATE_KEY, provider);

const contract = new ethers.Contract(BRRRATA_ADDRESS, BrrrataABI, signer);

async function reveal(toAddress, spinValue) {
    try {
        const tx = await contract.reveal.populateTransaction(toAddress, spinValue);
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

function isReveal(address) {
    return contract
        .isReveal(address)
        .then((spinValue) => spinValue.toString()) // Convert BigNumber to string
        .catch((error) => {
            console.error("Error getting spin:", error);
            throw error;
        });
}

function getAmount(address) {
    return contract
        .luckyCheese(address)
        .then((spinValue) => spinValue.toString()) // Convert BigNumber to string
        .catch((error) => {
            console.error("Error getting spin:", error);
            throw error;
        });
}

// ---- Events

const { Web3 } = require("web3");

const web3 = new Web3(new Web3.providers.HttpProvider(config.ALCHEMY_URL));
const _contract = new web3.eth.Contract(BrrrataABI, BRRRATA_ADDRESS);

async function getEvents(fromBlock, toBlock, eventName) {
    const time_period = { fromBlock: fromBlock, toBlock: toBlock };
    let eventsDeposit = await _contract.getPastEvents(eventName, time_period);
    return eventsDeposit
        .map((event) => ({
            blockNumber: Number(event.blockNumber.toString()),
            returnValues: event?.returnValues,
            logIndex: event?.logIndex,
            event,
        }))
        .sort((a, b) => a.blockNumber - b.blockNumber);
}

module.exports = {
    isReveal,
    getAmount,
    getEvents,
    BRRRATA_ADDRESS,
    reveal,
};
