/*TRANSACTIONS CONSIST OF TWO PARTS:- INPUT AND OUTPUT
    1. INPUT SPECIFIES WHERE THE COINS ARE COMING FROM AND SPECIFY WHETHER THE COINS ACTUALLY 
       EXIST AT ALL WITH THE SENDER
    2. OUTPUT SPECIFY WHERE THE COINS ARE SENT AND THE AMOUNT OF COINS THAT ARE SENT
*/

/*EACH MEMBER OF THE TxOUT WILL CONSIST OF :-
    1. ADDRESS (32 BYTE STRING IE THE PUBLIC KEY)
    2. COIN (THE NUMBER OF COINS IN THE TRANSACTION)
*/

class TxOut {
  public address: string;
  public amount: number;

  constructor(address: string, amount: number) {
    this.address = address;
    this.amount = amount;
  }
}

export default TxOut;
