import Mcp from "./mcp";

const abi1 = require("./abi_auction.json");

const McpFunc1 = new Mcp();

McpFunc1.Contract.setProvider("http://18.182.45.18:8765");

const tokenAddress1 = "0x208F68b469c5D85267048652dBbA3A458ef2Ee91";
const coreAddress1 = "0x208F68b469c5D85267048652dBbA3A458ef2Ee91";

const Instance1 = new McpFunc1.Contract(
    abi1,
    tokenAddress1
);

const Contract1 = {
    tokenAddress1,
    Instance1,
    coreAddress1
};

export default Contract1;

