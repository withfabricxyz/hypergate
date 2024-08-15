import { getPublicClient } from "../config/viem";
import type { CAIP19 } from "../types";
import { ERC20Gate } from "./erc20";
import { ERC721Gate } from "./erc721";
import { ERC1155Gate } from "./erc1155";
import type { Gate } from "./gate";
import { STPV2Gate } from "./stpv2";

function parseCAIP19(caip19: CAIP19): {
  chainId: number;
  assetNamepace: string;
  assetRef: string;
} {
  const matcher = caip19.match(/eip155:(\d+)\/(.+):(.+)/);
  if (!matcher) {
    throw new Error("Invalid CAIP19 asset");
  }
  const [, chainId, assetNamepace, assetRef] = matcher;
  return { chainId: Number.parseInt(chainId), assetNamepace, assetRef };
}

export function buildGate(caip19: CAIP19): Gate {
  const { chainId, assetNamepace, assetRef } = parseCAIP19(caip19);
  const client = getPublicClient(chainId);

  switch (assetNamepace) {
    case "erc20":
      return new ERC20Gate(client, assetRef);
    case "erc721":
      return new ERC721Gate(client, assetRef);
    case "stpv2":
      return new STPV2Gate(client, assetRef);
    case "erc1155":
      return new ERC1155Gate(client, assetRef);
    default:
      throw new Error("Unsupported asset");
  }
}
