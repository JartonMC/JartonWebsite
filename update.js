import { readFileSync } from "fs";
import { join } from "path";

const update = async () => {
  const packageJsonPath = join(process.cwd(), "package.json");
  const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));

  const dependencies = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {}),
  };

  const args = [
    "add",
    ...Object.keys(dependencies).map((dep) => `${dep}@latest`),
  ];

  console.log(`Running: bun ${args.join(" ")}`);

  const proc = Bun.spawn(["bun", ...args], {
    stdout: "pipe",
    stderr: "pipe",
  });

  const stdout = await new Response(proc.stdout).text();
  const stderr = await new Response(proc.stderr).text();

  if (stdout.length > 0) console.log(stdout);
  if (stderr.length > 0) console.error(stderr);

  await proc.exited;

  if (proc.exitCode === 0) {
    console.log("✅ Updated all dependencies to their latest version");
  } else {
    console.error("❌ Bun failed to update packages.");
  }
};

update();
