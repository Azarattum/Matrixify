import { log } from "./src/logger.ts";
import app from "./src/server.ts";

const port = 8080;
app.listen({ port });
log(`Listening on http://127.0.0.1:${port}`);
