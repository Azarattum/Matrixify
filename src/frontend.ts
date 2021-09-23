import { Middleware } from "oak";

const frontend: Middleware = async (context, next) => {
  const { request } = context;
  if (request.url.pathname.endsWith("/")) {
    request.url.pathname += "index.html";
  }

  const root = `${Deno.cwd()}/public`;
  try {
    await context.send({ root });
  } catch {
    next();
  }
};

export { frontend };
