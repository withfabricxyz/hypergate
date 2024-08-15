import { parseAbi } from "viem";
import { ERC721Gate } from "./erc721";

const abi = parseAbi([
  "function balanceOf(address account) view returns (uint256)",
  "function tierBalanceOf(uint16 tierId, address account) view returns (uint256)",
]);

export class STPV2Gate extends ERC721Gate {
  calls(accounts: `0x${string}`[]): any[] {
    const assetId = this.assetIdNum();
    if (assetId) {
      return accounts.map((account) => {
        return {
          address: this.address(),
          abi: abi,
          functionName: "tierBalanceOf",
          args: [assetId, account],
        };
      });
    }
    return super.calls(accounts);
  }
}
