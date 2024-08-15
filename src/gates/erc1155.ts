import { parseAbi } from "viem";
import { Gate } from "./gate";

const abi = parseAbi([
  "function balanceOf(address account, uint256 id) view returns (uint256)",
]);

export class ERC1155Gate extends Gate {
  calls(accounts: `0x${string}`[]): any[] {
    const assetId = this.assetIdBigInt();
    if (!assetId) {
      throw new Error("ERC1155Gate requires an asset ID");
    }
    return accounts.map((account) => {
      return {
        address: this.address(),
        abi: abi,
        functionName: "balanceOf",
        args: [account, assetId],
      };
    });
  }
}
