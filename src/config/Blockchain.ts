import Block from "./Block";
import { genHash, checkBlockIntegrity, checkValidHash } from "./util";

//DEFINED THE DIFFICULTY AS A CONSTANT
const DIFFICULTY: number = 0;

//DEFINED ALLOWED ATTEMPTS TO VERIFY A BLOCK
const ALLOWED_VALID_ATTEMPTS: number = 10;

/*
GENESIS BLOCK IS THE FIRST BLOCK AND DOES NOT HAVE A PREVIOUS HASH
WE WILL HARDCODE THE GENESIS BLOCK IN THE CONSTRUCTOR
AND INSTEAD OF HAVING NULL VALUE WE WILL GENERATE A RANDOM PREVIOUS HASH
*/

class Blockchain {
  public blockChain: Block[] = [];
  constructor() {
    const randomDate: string = Date.now().toString();
    const randomNumber: string = Math.random().toString();
    const message: string = randomDate + randomNumber;
    const genesisPreviousHash: string = genHash(message);
    const genesisBlock: Block = new Block(
      0,
      "Genesis Block",
      Date.now(),
      genesisPreviousHash,
      DIFFICULTY,
      0
    );
    this.blockChain.push(genesisBlock);
  }

  //TO GET THE BLOCKCHAIN
  getBlockchain(): Block[] {
    return this.blockChain;
  }

  //TO GET LENGTH
  getLength(): number {
    return this.blockChain.length;
  }

  //TO GET BLOCK AT GIVEN INDEX
  getBlock(index: number): Block {
    return this.blockChain[index];
  }

  //TO GENERATE BLOCK
  generateBlock(data: string): Block {
    const index: number = this.blockChain.length;
    const timestamp: number = Date.now();
    const previousBlock: Block = this.getBlock(index - 1);
    const previousHash: string = previousBlock.getHash();
    let nonce: number = 0;
    const newBlock: Block = new Block(
      index,
      data,
      timestamp,
      previousHash,
      DIFFICULTY,
      nonce
    );
    return newBlock;
  }

  //TO ADD BLOCK
  addBlock(newBlock: Block): void {
    const index: number = newBlock.getIndex();
    //const previousBlock: Block = this.getBlock(index - 1);
    const blockDifficulty: number = newBlock.getDifficulty();
    let isValidBlock: boolean = false;
    let blockNonce: number = newBlock.getNonce();
    let validAttempts = 0;
    do {
      newBlock.setNonce(blockNonce);
      newBlock.setHash(genHash(newBlock.createMessage()));
      let blockHash: string = newBlock.getHash();
      isValidBlock = checkValidHash(blockHash, blockDifficulty) ? true : false;
      blockNonce++;
      validAttempts++;
    } while (!isValidBlock && validAttempts <= ALLOWED_VALID_ATTEMPTS);
    if (isValidBlock) {
      this.blockChain.push(newBlock);
      console.log("Successfully Added Block");
    } else {
      console.log("Block Hash could not be verified. Add operation Aborted");
    }
  }
}

export default Blockchain;
