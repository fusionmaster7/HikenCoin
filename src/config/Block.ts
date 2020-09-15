import sha256 from "crypto-js/sha256";

/*EACH BLOCK OBJECT SHOULD HAVE:
    1. Index: The height of block in blockchain
    2. Data: Data included in the block (We are taking simple string data)
    3. Timestamp
    4. Hash: A sha-256 hash from the contents of the block
    5. Previous Hash: A reference to the hash of the previous block
*/

class Block {
  public index: number;
  public data: string;
  public timestamp: number;
  public hash: string;
  public previousHash: string;

  constructor(
    index: number,
    data: string,
    timestamp: number,
    previousHash: string
  ) {
    this.index = index;
    this.data = data;
    this.timestamp = timestamp;
    this.previousHash = previousHash;
    this.hash = this.genHash();
  }

  //Function to generate SHA-256 Hash
  public genHash(): string {
    const message: string =
      this.data + this.previousHash + this.index + this.timestamp;
    return sha256(message).toString();
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
}

export default Block;
