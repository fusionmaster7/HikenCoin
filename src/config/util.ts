//HERE WE STORE UTILITY FUNCTIONS
import { createHash } from "crypto";
import Block from "./Block";
import Blockchain from "./Blockchain";

//FUNCTION TO GENERATE SHA-2 HASH FROM MESSAGE STRING
export const genHash = (message: string): string => {
  return createHash("sha256").update(message).digest("hex");
};

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
  const currentBlockMessage: string = currentBlock.createMessage();
  const newGeneratedHash: string = genHash(currentBlockMessage);
  if (newGeneratedHash !== currentBlockHash) {
    console.log("Hash Verification Test Failed");
    return false;
  }
  return true;
};

//FUNCTION TO CHECK INTEGRITY OF BLOCKCHAIN
export const checkBlockchainIntegrity = (chain: Blockchain): boolean => {
  let isValid: boolean = true;
  for (let i: number = 1; i < chain.getLength(); i++) {
    const currentBlock: Block = chain.getBlock(i);
    const previousBlock: Block = chain.getBlock(i - 1);
    if (checkBlockIntegrity(previousBlock, currentBlock) === false) {
      isValid = false;
      break;
    }
  }
  return isValid;
};

/* 
  FUNCTION TO UPDATE BLOCKCHAIN. WE UPDATE THE BLOCKCHAIN IF:
    1. THE NEW BLOCKCHAIN IS A VALID ONE
    2. THE NEW BLOCKCHAIN IS LONGER IN LENGTH
*/
export const updateBlockchain = (
  currentBlockchain: Blockchain,
  newBlockchain: Blockchain
): void => {
  if (
    checkBlockchainIntegrity(newBlockchain) &&
    newBlockchain.getCummulativeDifficulty() >
      currentBlockchain.getCummulativeDifficulty()
  ) {
    currentBlockchain.blockChain = [...newBlockchain.getBlockchain()];
    console.log("Updated the Blockchain");
  } else {
    console.log("Update Operation Failed");
  }
};

/*
  FUNCTION TO GET READJUSTED DIFFICULTY
    1. TIME TAKEN TO CALCULATE A BLOCK = TIMESTAMP OF CURRENT BLOCK-TIMESTAMP OF PREVIOUS BLOCK
    2. IDEALLY TIME TAKEN SHOULD BE = BLOCK_GENERATION_INTERVAL*DIFFICULTY_ADJUSTMENT_INTERVAL
    3. IF ACTUAL TIME TAKEN IS 2*(IDEAL TIME TAKEN),WE READJUST THE BLOCK DIFFICULTY
*/
export const getAdjustedDifficulty = (
  currentBlock: Block,
  previousBlockTimestamp: number,
  CURRENT_DIFFICULTY: number,
  BLOCK_GENERATION_INTERVAL: number,
  DIFFICULTY_ADJUSTMENT_INTERVAL: number
): number => {
  const currentBlockTimestamp: number = currentBlock.getTimestamp();
  const timeTaken: number = currentBlockTimestamp - previousBlockTimestamp;
  return timeTaken >=
    2 * BLOCK_GENERATION_INTERVAL * DIFFICULTY_ADJUSTMENT_INTERVAL
    ? CURRENT_DIFFICULTY - 1
    : CURRENT_DIFFICULTY;
};

/*FUNCTION TO VALIDATE TIMESTAMP*/
export const validateTimestamp = (
  currentTimestamp: number,
  previousTimestamp: number
): boolean => {
  //DIFFERENCE OF ATMOST 60 SECONDS
  const idealDifference: number = 60000;
  return (
    currentTimestamp - previousTimestamp <= idealDifference &&
    Date.now() - currentTimestamp <= 60
  );
};
