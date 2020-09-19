import { createHash } from "crypto";
import { hexToBinary } from "../config/util";

test("Hex to Binary Test", () => {
  const message: string = "abcde";
  const hexString: string = createHash("sha256").update(message).digest("hex");
  const binaryString: string = parseInt(hexString, 16).toString(2);
  expect(hexToBinary(hexString)).toBe(binaryString);
});
