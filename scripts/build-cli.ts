import { $ } from "bun";
import { Log } from "@orbit/utils/log";

const log = Log.create({ service: "build-cli" });

log.info("Building CLI Executable ...");

const outFileName = "orbit-cli";
const buildFile = "packages/cli/src/index.tsx";
const platform = process.platform;
const arch = process.arch;

const target_platforms = ["win32", "linux", "darwin"];

async function build() {
  if (!target_platforms.includes(platform)) {
    throw new Error(
      `Unsupported platform: ${platform}. Supported platforms are: ${target_platforms.join(
        ", ",
      )}`,
    );
  }

  // Build the CLI executable for Windows x64
  if (platform === "win32") {
    const output =
      await $`bun build ${buildFile} --compile --target=bun-windows-${arch} --minify --outfile ${outFileName.concat(".exe")}`.text();
    log.info(output);
  }

  // Build the CLI executable for Linux x64
  if (platform === "linux") {
    const output =
      await $`bun build ${buildFile} --compile --target=bun-${platform}-${arch} --minify --outfile ${outFileName}`.text();
    log.info(output);
  }

  // Build the CLI executable for Darwin/MacOS x64
  if (platform === "darwin") {
    const output =
      await $`bun build ${buildFile} --compile --target=bun-${platform}-${arch} --minify --outfile ${outFileName}`.text();
    log.info(output);
  }

  log.info("CLI Executable Built Successfully.");
}

build().catch((err) => {
  log.error(`Build failed: ${err}`);
  process.exit(1);
});
