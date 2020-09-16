import Block from "./Block";

//HERE WE STORE UTILITY FUNCTIONS

//FUNCTION TO CONVERT A HEX STRING TO BINARY STRING
export const hexToBinary = (hexString: string): string => {
  return parseInt(hexString, 16).toString(2);
};

//FUNCTION TO VERIFY PROOF OF WORK
export const checkValidHash = (
  hashString: string,
  difficulty: number
): boolean => {
  const binaryHashString: string = hexToBinary(hashString);
  const prefix: string = "0".repeat(difficulty);
  return binaryHashString.startsWith(prefix);
};

/*
  TO CHECK THE INTEGRITY OF BLOCK:
    1. Index of current block must be greater than previous block
    2. Previous Hash of current block must be equal to Hash of previous block
    3. Hash of the block must be valid
  */
export const checkBlockIntegrity = (
  previousBlock: Block,
  currentBlock: Block
): boolean => {
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
};
