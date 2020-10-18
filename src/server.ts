import express = require("express");
import { checkBlockchainIntegrity, updateBlockchain } from "./config/util";
import Blockchain from "./config/Blockchain";
import router from "./routes/router";

const PORT: number | string = process.env.PORT || 8000;

/*const app: express.Application = express();

app.use(router);

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
*/

const chain1: Blockchain = new Blockchain();
const chain2: Blockchain = new Blockchain();

chain1.addBlock(chain1.generateBlock("First chain First Block"));
chain1.addBlock(chain1.generateBlock("First chain Second Block"));

chain2.addBlock(chain2.generateBlock("Second chain First Block"));
chain2.addBlock(chain2.generateBlock("Second chain Second Block"));
chain2.addBlock(chain2.generateBlock("Second chain Third Block"));

console.log(checkBlockchainIntegrity(chain1));
console.log(checkBlockchainIntegrity(chain2));

updateBlockchain(chain1, chain2);
console.log(chain1.blockChain[1].data);
