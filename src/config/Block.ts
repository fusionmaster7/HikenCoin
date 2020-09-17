import { genHash } from "./util";

//THE PROOF OF WORK MUST BE DIFFICULT TO SOLVE BUT EASY TO VERIFY

/*EACH BLOCK OBJECT SHOULD HAVE:
    1. Index: The height of block in blockchain
    2. Data: Data included in the block (We are taking simple string data)
    3. Timestamp
    4. Hash: A sha-256 hash from the contents of the block
    5. Previous Hash: A reference to the hash of the previous block
    6. Difficulty: The number of prefix zeroes in the binary conversion of the hash
    7. Nonce: A pseudo-random number used to generate tha sha-2 hash
*/

class Block {
  public index: number;
  public data: string;
  public timestamp: number;
  public hash: string;
  public previousHash: string;
  public difficulty: number;

  constructor(
    index: number,
    data: string,
    timestamp: number,
    previousHash: string,
    difficulty: number
  ) {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.difficulty = difficulty;
    const message: string = this.createMessage();
    this.hash = genHash(message);
  }

  //FUNCTION TO CREATE MESSAGE BASED ON DATA
  public createMessage(): string {
    const message: string =
      this.index + this.data + this.timestamp + this.previousHash;
    return message;
  }

  /*GETTER METHODS BEGIN*/
  getPreviousHash(): string {
    return this.previousHash;
  }

  getIndex(): number {
    return this.index;
  }

  getHash(): string {
    return this.hash;
  }

  getTimestamp(): number {
    return this.timestamp;
  }
  /*GETTER METHODS END*/

  /*SETTER METHODS BEGIN*/
  setDifficulty(newDifficulty: number) {
    this.difficulty = newDifficulty;
  }
  /*SETTER METHODS END*/
}

export default Block;
