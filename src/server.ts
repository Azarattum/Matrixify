import { Application } from "oak";
import { frontend } from "./frontend.ts";
import { logger } from "./logger.ts";
import { api } from "./api.ts";

const app = new Application();
app.use(logger);
app.use(api);
app.use(frontend);

export default app;
