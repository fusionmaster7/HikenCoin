/*TRANSACTION CLASS CONSISTS OF THE FOLLOWING PARTS:
    1. TRANSACTION ID: HASH CALCULATED FROM THE CONTENT OF THE TRANSACTION
    2. AN ARRAY OF TRANSACTION INPUTS
    3. AN ARRAY OF TRANSACTION OUPTUTS
*/

import { genHash } from "./util";
import TxIn from "./TxIn";
import TxOut from "./TxOut";

class Transaction {
  public txnId: string;
  public txIns: TxIn[];
  public txOuts: TxOut[];

  constructor() {
    this.txnId = this.createTransactionHash();
  }

  createTransactionHash(): string {
    const txInMessage: string = this.txIns
      .map((e) => e.txOutId + e.txOutIndex)
      .reduce((a, b) => a + b, "");

    const txOutMessage: string = this.txOuts
      .map((e) => e.address + e.amount)
      .reduce((a, b) => a + b, "");

    const message: string = txInMessage + txOutMessage;
    return genHash(message);
  }
}

export default Transaction;
