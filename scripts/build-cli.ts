import { $ } from "bun";
import { findUp } from "find-up";

console.log("Building CLI Executable ...");

const platform = process.platform;
const arch = process.arch;

const target_platforms = ["win32", "linux", "darwin"];

async function build() {
  const pkgDir = await findUp("packages", {
    cwd: import.meta.dir,
    type: "directory",
  });
  const agenieDir = await findUp(".agenie", {
    cwd: import.meta.dir,
    type: "directory",
  });

  const outFileName = `${agenieDir}/data/bin/agenie-cli`;

  const buildFile = `${pkgDir}/cli/src/index.tsx`;
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
    console.log(output);
  }

  // Build the CLI executable for Linux x64
  if (platform === "linux") {
    const output =
      await $`bun build ${buildFile} --compile --target=bun-${platform}-${arch} --minify --outfile ${outFileName}`.text();
    console.log(output);
  }

  // Build the CLI executable for Darwin/MacOS x64
  if (platform === "darwin") {
    const output =
      await $`bun build ${buildFile} --compile --target=bun-${platform}-${arch} --minify --outfile ${outFileName}`.text();
    console.log(output);
  }

  console.log("CLI Executable Built Successfully.");
}

build().catch((err) => {
  console.error(`Build failed: ${err}`);
  process.exit(1);
});
