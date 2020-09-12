import Block from "./src/Block";
import sha256 from "crypto-js/sha256";

const message: string = "Hardik";
const myObj: Block = new Block(
  0,
  "Singh",
  Date.now(),
  sha256(message).toString()
);
