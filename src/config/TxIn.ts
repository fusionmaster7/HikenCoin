/*TRANSACTIONS CONSIST OF TWO PARTS:- INPUT AND OUTPUT
    1. INPUT SPECIFIES WHERE THE COINS ARE COMING FROM AND SPECIFY WHETHER THE COINS ACTUALLY 
       EXIST AT ALL WITH THE SENDER
    2. OUTPUT SPECIFY WHERE THE COINS ARE SENT AND THE AMOUNT OF COINS THAT ARE SENT
*/

/*EACH MEMBER OF THE TxOUT WILL CONSIST OF :-
    1. SIGNATURE(GENERATED FROM THE PRIVATE KEY)
    2. TxOut INDEX
    3. TxOut ID
*/

class TxIn {
  public signature: string;
  public txOutIndex: number;
  public txOutId: number;

  constructor(signature: string, txOutIndex: number, txOutId: number) {
    this.signature = signature;
    this.txOutIndex = txOutIndex;
    this.txOutId = txOutId;
  }
}

export default TxIn;
