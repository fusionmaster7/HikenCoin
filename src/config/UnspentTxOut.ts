/*CLASS DEFINITION FOR UNSPENT TRANSACTION OUTPUTS*/

class UnspentTxOut {
  public readonly txOutId: string;
  public readonly txOutIndex: string;
  public readonly address: string;
  public readonly amount: number;

  constructor(
    txOutId: string,
    txOutIndex: string,
    address: string,
    amount: number
  ) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }
}

export default UnspentTxOut;
