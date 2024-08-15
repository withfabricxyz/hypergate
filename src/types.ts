import { type Static, t } from "elysia";

export const CAIP19 = t.String({});
export type CAIP19 = `eip155:${number}/${string}:${string}`;

export const TAddress = t.String({});
export type TAddress = `0x${string}`;

export const AccountList = t.Array(TAddress);
export type AccountList = Static<typeof AccountList>;

export const GateQuery = t.Object({
  asset: CAIP19,
  accounts: AccountList,
  blockNumber: t.Optional(t.Numeric()),
});
export type GateQuery = Static<typeof GateQuery>;

export const AccountBalances = t.Record(TAddress, t.BigInt());
export type AccountBalances = Static<typeof AccountBalances>;
