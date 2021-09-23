// deno-lint-ignore-file no-explicit-any
import { Middleware } from "https://deno.land/x/oak@v9.0.1/mod.ts";

const log = (...data: any[]) => {
  const timestamp = Date().split(" ")[4];
  console.log(`[${timestamp}]:`, ...data);
};

const logger: Middleware = async (ctx, next) => {
  const { request } = ctx;
  log(`Requested ${request.url.pathname} from ${request.ip}`);
  await next();
};

export { log, logger };
