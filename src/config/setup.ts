// Which chains should be enabled
export const ENABLED_CHAINS = (process.env.ENABLED_CHAINS || "1,8453")
  .split(",")
  .map(Number);

// Infura key (optional)
export const INFURA_KEY = process.env.INFURA_KEY;

// Alchemy key (optional)
export const ALCHEMY_KEY = process.env.ALCHEMY_KEY;

// Quicknode key (optional)
export const QUICKNODE_KEY = process.env.QUICKNODE_KEY;

// Port to listen on
export const PORT = process.env.PORT || 3000;

// Exeuction mode (timed or ondemand)
export const EXECUTION_MODE = process.env.EXECUTION_MODE || "ondemand";

export function setup() {
  // biome-ignore lint/suspicious/noExplicitAny: monkey patching
  (BigInt.prototype as any).toJSON = function () {
    return this.toString();
  };

  // Normalize to UTC
  process.env.TZ = "UTC";
}
