import Block from "./Block";
import { genHash, checkBlockIntegrity, checkBlockchainIntegrity } from "./util";

//DEFINED THE DIFFICULTY AS A CONSTANT
const DIFFICULTY: number = 0;

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
      DIFFICULTY
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
    const newBlock: Block = new Block(
      index,
      data,
      timestamp,
      previousHash,
      DIFFICULTY
    );
    return newBlock;
  }

  //TO ADD BLOCK
  addBlock(newBlock: Block): void {
    const index: number = newBlock.getIndex();
    const previousBlock: Block = this.getBlock(index - 1);
    if (checkBlockIntegrity(previousBlock, newBlock)) {
      this.blockChain.push(newBlock);
      console.log("Sucessfully Added new Block to the chain");
    } else {
      console.log(
        "Could not verify Block Integrity. Addition operation Aborted"
      );
    }
  }

  /* 
  FUNCTION TO UPDATE BLOCKCHAIN. WE UPDATE THE BLOCKCHAIN IF:
    1. THE NEW BLOCKCHAIN IS A VALID ONE
    2. THE NEW BLOCKCHAIN IS LONGER IN LENGTH
  */
  updateBlockchain(newBlockhain: Blockchain): void {
    if (
      checkBlockchainIntegrity(newBlockhain) &&
      newBlockhain.getLength() > this.getLength()
    ) {
      this.blockChain = newBlockhain.getBlockchain();
      console.log("Updated the Blockchain");
    } else {
      console.log("Update Operation Failed");
    }
  }
}

export default Blockchain;
