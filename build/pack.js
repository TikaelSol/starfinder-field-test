import { compilePack } from "@foundryvtt/foundryvtt-cli";
import fs from "fs";
import path from "path";

const directories = await fs.promises.readdir("packs");
for (const directory of directories) {
  await compilePack(path.join("packs", directory), path.join("dist/packs", directory));
}
