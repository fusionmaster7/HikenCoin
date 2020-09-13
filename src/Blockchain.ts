import Block from "./Block";
import sha256 from "crypto-js/sha256";

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
    const genesisPreviousHash: string = sha256(message).toString();
    const genesisBlock: Block = new Block(
      0,
      "Genesis Block",
      Date.now(),
      genesisPreviousHash
    );
    this.blockChain.push(genesisBlock);
  }

  //TO GET LENGTH
  getLength(): number {
    return this.blockChain.length;
  }

  //TO GET PREVIOUS BLOCK
  getBlock(index: number): Block {
    return this.blockChain[index];
  }

  //TO GENERATE BLOCK
  generateBlock(data: string): Block {
    const index: number = this.blockChain.length;
    const timestamp: number = Date.now();
    const previousBlock: Block = this.blockChain[index - 1];
    const previousHash: string = previousBlock.getHash();
    const newBlock: Block = new Block(index, data, timestamp, previousHash);
    return newBlock;
  }

  /*
  TO CHECK THE INTEGRITY OF BLOCK:
    1. Index of current block must be greater than previous block
    2. Previous Hash of current block must be equal to Hash of previous block
    3. Hash of the block must be valid
  */
  checkBlockIntegrity(previousBlock: Block, currentBlock: Block): boolean {
    const prevIndex: number = previousBlock.getIndex();
    const currentIndex: number = currentBlock.getIndex();
    if (currentIndex <= prevIndex) {
      console.log("Index Test Failed");
      return false;
    }

    const previousBlockHash: string = previousBlock.getHash();
    const currentBlockPreviousHash: string = currentBlock.getPreviousHash();
    const currentBlockHash: string = currentBlock.getHash();
    if (previousBlockHash !== currentBlockPreviousHash) {
      console.log("Previous Hash Test Failed");
      return false;
    }

    /*
    WE REGENERATE THE HASH FOR THE CURRENT BLOCK TO
    CHECK IF DATA HAS BEEN ALTERED IE HASH OF THE BLOCK IS VALID
    OR NOT
    */
    const newGeneratedHash: string = currentBlock.genHash();
    if (newGeneratedHash !== currentBlockHash) {
      console.log("Hash Verification Test Failed");
      return false;
    }
    return true;
  }

  //TO ADD BLOCK
  addBlock(newBlock: Block): void {
    const index: number = newBlock.getIndex();
    const previousBlock: Block = this.getBlock(index - 1);
    if (this.checkBlockIntegrity(newBlock, previousBlock)) {
      this.blockChain.push(newBlock);
      console.log("Sucessfully Added new Block to the chain");
    } else {
      console.log(
        "Could not verify Block Integrity. Addition operation Aborted"
      );
    }
    this.blockChain.push(newBlock);
  }

  //TO CHECK INTEGRITY OF THE ENTIRE BLOCKCHAIN
  checkBlockchainIntegrity(): boolean {
    let isValid: boolean = true;
    for (let i: number = 1; i < this.getLength(); i++) {
      const currentBlock: Block = this.getBlock(i);
      const previousBlock: Block = this.getBlock(i - 1);
      if (!this.checkBlockIntegrity(previousBlock, currentBlock)) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }
}

export default Blockchain;
