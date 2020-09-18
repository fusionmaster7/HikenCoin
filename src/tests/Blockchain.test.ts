import Blockchain from "../config/Blockchain";
import Block from "../config/Block";
import { checkBlockchainIntegrity } from "../config/util";

test("Check add operation", () => {
  interface Values {
    size1: number;
    size2: number;
  }
  const expectedValues: Values = { size1: 2, size2: 2 };
  let size1: number;
  let size2: number;
  const chain: Blockchain = new Blockchain();
  chain.addBlock(chain.generateBlock("First Block"));
  size1 = chain.getLength();
  const newBlock: Block = chain.generateBlock("Second Block");
  newBlock.index = 1;
  chain.addBlock(newBlock);
  size2 = chain.getLength();
  const results: Values = { size1: size1, size2: size2 };
  expect(results).toEqual(expectedValues);
});

test("Check BlockChain integrity Valid", () => {
  const chain: Blockchain = new Blockchain();
  chain.addBlock(chain.generateBlock("First Block"));
  expect(checkBlockchainIntegrity(chain)).toBe(true);
});

test("Check BlockChain integrity Invalid", () => {
  const chain: Blockchain = new Blockchain();
  chain.addBlock(chain.generateBlock("First Block"));
  chain.blockChain[1].index = 0;
  expect(checkBlockchainIntegrity(chain)).toBe(false);
});
