import {
  http,
  type HttpTransport,
  type PublicClient,
  createPublicClient,
  fallback,
} from "viem";
import { type Chain, base, foundry, mainnet } from "viem/chains";
import { INFURA_KEY } from "./setup";

///////////////////////////////////////
// Transport configuration
///////////////////////////////////////

function infura(chain: Chain): HttpTransport | undefined {
  if (!INFURA_KEY) return undefined;
  const name = {
    1: "mainnet",
    3: "ropsten",
    4: "rinkeby",
    5: "goerli",
    42: "kovan",
  }[chain.id];

  return name ? http(`https://${name}.infura.io/v3/${INFURA_KEY}`) : undefined;
}

function transports(chain: Chain) {
  const fallbacks: HttpTransport[] = [infura(chain), http()].filter(
    (x) => x !== undefined,
  ) as HttpTransport[];
  return fallback(fallbacks, { rank: true });
}

const chains: Chain[] = [foundry, mainnet, base];

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
