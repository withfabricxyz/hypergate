import { Elysia } from "elysia";
import { gatingController } from "./controllers/gateController";

export const app = new Elysia().group("/gating", (api) =>
  api.use(gatingController()),
);
