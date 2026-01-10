import fs from "fs/promises";
import path from "path";
import os from "os";
import { CACHE_DIR, CONFIG_DIR, DATA_DIR, STATE_DIR } from "./config";
import { Log } from "./log";

const data = DATA_DIR;
const cache = CACHE_DIR;
const config = CONFIG_DIR;
const state = STATE_DIR;

const log = Log.create({ service: "global" });

export namespace Global {
  export const Path = {
    // Allow override via ORBIT_TEST_HOME for test isolation
    get home() {
      return process.env.ORBIT_TEST_HOME || os.homedir();
    },
    data,
    bin: path.join(data, "bin"),
    log: path.join(data, "log"),
    cache,
    config,
    state,
  };
}

await Promise.all([
  fs.mkdir(Global.Path.data, { recursive: true }),
  fs.mkdir(Global.Path.config, { recursive: true }),
  fs.mkdir(Global.Path.state, { recursive: true }),
  fs.mkdir(Global.Path.log, { recursive: true }),
  fs.mkdir(Global.Path.bin, { recursive: true }),
]);

const CACHE_VERSION = "15";

const version = await Bun.file(path.join(Global.Path.cache, "version"))
  .text()
  .catch(() => "0");

if (version !== CACHE_VERSION) {
  try {
    const contents = await fs.readdir(Global.Path.cache);
    await Promise.all(
      contents.map((item) =>
        fs.rm(path.join(Global.Path.cache, item), {
          recursive: true,
          force: true,
        }),
      ),
    );
  } catch (e) {
    log.error(`Failed to clear cache: ${e}`);
  }

  await Bun.file(path.join(Global.Path.cache, "version")).write(CACHE_VERSION);
}
