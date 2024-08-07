import { extractPack } from "@foundryvtt/foundryvtt-cli";
import fs from "fs";
import path from "path";

const directories = await fs.promises.readdir("dist/packs");
for (const directory of directories) {
  await extractPack(path.join("dist/packs", directory), path.join("packs", directory));
}
