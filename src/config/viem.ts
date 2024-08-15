import {
  http,
  type HttpTransport,
  type PublicClient,
  createPublicClient,
  fallback,
} from "viem";
import { type Chain, arbitrum, base, foundry, mainnet, optimism, sepolia, zora } from "viem/chains";
import { INFURA_KEY } from "./setup";

///////////////////////////////////////
// Transport configuration
///////////////////////////////////////

function infura(chain: Chain): HttpTransport | undefined {
  if (!INFURA_KEY) return undefined;
  const name = {
    [mainnet.id]: "mainnet",
    [base.id]: "base-mainnet",
    [optimism.id]: "optimism-mainnet",
    [arbitrum.id]: "arbitrum-mainnet",
    [sepolia.id]: "sepolia",
  }[chain.id];

  return name ? http(`https://${name}.infura.io/v3/${INFURA_KEY}`) : undefined;
}

function transports(chain: Chain) {
  const fallbacks: HttpTransport[] = [infura(chain), http()].filter(
    (x) => x !== undefined,
  ) as HttpTransport[];
  return fallback(fallbacks, { rank: true });
}

const chains: Chain[] = [foundry, mainnet, base, optimism, arbitrum, sepolia, zora];

const clientCache = new Map<number, PublicClient>();

///////////////////////////////////////

export function getPublicClient(chainId: number): PublicClient {
  if (!clientCache.has(chainId)) {
    const chain = chains.find((c) => c.id === chainId);
    if (!chain) {
      throw new Error(`Chain ${chainId} not found`);
    }
    clientCache.set(
      chainId,
      createPublicClient({
        batch: {
          multicall: true,
        },
        chain,
        transport: transports(chain),
      }),
    );
  }

  return clientCache.get(chainId) as PublicClient;
}
