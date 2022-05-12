import Mcp from "./mcp";

const abi2 = require("./abi_auctionBox.json");

const McpFunc2 = new Mcp();

McpFunc2.Contract.setProvider("http://18.182.45.18:8765");

const tokenAddress2 = "0x5687c0d3Ca3C214044FEbB9093F378D9841b1034";
const coreAddress2 = "0x5687c0d3Ca3C214044FEbB9093F378D9841b1034";

const Instance2 = new McpFunc2.Contract(
    abi2,
    tokenAddress2
);

const Contract2 = {
    tokenAddress2,
    Instance2,
    coreAddress2
};

export default Contract2;