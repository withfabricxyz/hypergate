import type { PublicClient } from "viem";
import type { AccountBalances } from "../types";

export abstract class Gate {
  private _address: string;
  private _assetId?: string;
  constructor(
    protected client: PublicClient,
    assetRef: string,
  ) {
    [this._address, this._assetId] = assetRef.split("/");
  }

  address(): `0x${string}` {
    return this._address as `0x${string}`;
  }

  assetId(): string | undefined {
    return this._assetId;
  }

  assetIdNum(): number | undefined {
    return this._assetId ? Number(this._assetId) : undefined;
  }

  assetIdBigInt(): bigint | undefined {
    return this._assetId ? BigInt(this._assetId) : undefined;
  }

  async balances(accounts: `0x${string}`[]): Promise<AccountBalances> {
    const calls = this.calls(accounts);
    const results = await this.client.multicall({ contracts: calls });
    const balances: AccountBalances = {};
    results.forEach((result, i) => {
      // TODO: errors should be a separate field
      balances[accounts[i]] = result.error ? 0n : (result.result as bigint);
    });
    return balances;
  }

  async activeHolders(accounts: `0x${string}`[]): Promise<`0x${string}`[]> {
    return this.balances(accounts).then((balances) => {
      return accounts.filter((account) => balances[account] > 0n);
    });
  }

  abstract calls(accounts: `0x${string}`[]): any[];
}
