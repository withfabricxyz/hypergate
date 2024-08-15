import { Elysia } from "elysia";
import { buildGate } from "../gates";
import { AccountBalances, AccountList, type CAIP19, GateQuery } from "../types";

export function gatingController() {
  return new Elysia()
    .post(
      "/balances",
      ({ body }) => {
        return buildGate(body.asset as CAIP19).balances(
          body.accounts as `0x${string}`[],
        );
      },
      {
        body: GateQuery,
        response: {
          200: AccountBalances,
        },
      },
    )

    .post(
      "/active",
      ({ body }) => {
        return buildGate(body.asset as CAIP19).activeHolders(
          body.accounts as `0x${string}`[],
        );
      },
      {
        body: GateQuery,
        response: {
          200: AccountList,
        },
      },
    );
}
