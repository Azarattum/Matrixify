import { log } from "./logger.ts";

function ffmpeg() {
  const shell = Deno.build.os === "windows" ? ["cmd", "/C"] : ["bash", "-c"];
  let command = "ffmpeg -y";

  const execute = async (command: string) => {
    const process = Deno.run({ cmd: [...shell, command], stderr: "null" });
    return await process.status();
  };

  return {
    addInput(path: string) {
      command += ` -i ${path}`;
    },
    addFilter(filter: string) {
      if (Deno.build.os === "linux") filter = `"${filter}"`;
      command += ` -filter_complex ${filter}`;
    },
    async run(output: string) {
      command += ` ${output}`;
      log(`Ffmpeg executed "${command}"`);
      const status = JSON.stringify(await execute(command));
      log(`Ffmpeg status "${status}"`);
    },
  };
}

async function overlay(source: string, overlay: string) {
  const file = await Deno.makeTempFile({ suffix: ".jpg" });
  const transform = ffmpeg();
  transform.addInput(source);
  transform.addInput(overlay);
  transform.addFilter("overlay=(W-w)/2:0");
  await transform.run(file);

  return file;
}

export { overlay };
