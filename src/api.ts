import { Router } from "oak";
import { overlay } from "./transform.ts";

const router = new Router();

const fileRegex = /^[^/?<>\\:*|"^~#%{}.]+\.(png|gif|jpg|jpeg)$/;

router.post("/api/transform", async (ctx) => {
  const body = await ctx.request.body({ type: "form-data" });
  const data = await body.value.read();

  const file = data.files?.[0];
  const path = file?.filename;
  const name = file?.originalName;
  const valid = name?.match(fileRegex);
  if (!path || !valid) return (ctx.response.status = 400);
  const target = `assets/${name}`;
  await Deno.copyFile(path, target);
  await Deno.remove(path);

  const editted = await overlay(target, "assets/overlay.png");

  const buffer = await Deno.readFile(editted);
  ctx.response.body = buffer;
  ctx.response.headers.set("Content-Type", "image/png");

  await Deno.remove(editted);
  await Deno.remove(target);
});

const api = router.routes();
export { api };
