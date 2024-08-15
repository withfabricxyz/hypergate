import { parseAbi } from "viem";
import { Gate } from "./gate";

const abi = parseAbi([
  "function balanceOf(address account) view returns (uint256)",
]);

export class ERC20Gate extends Gate {
  calls(accounts: `0x${string}`[]): any[] {
    return accounts.map((account) => {
      return {
        address: this.address(),
        abi: abi,
        functionName: "balanceOf",
        args: [account],
      };
    });
  }
}
