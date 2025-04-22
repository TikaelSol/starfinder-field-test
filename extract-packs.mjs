import { extractPack } from "@foundryvtt/foundryvtt-cli";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

const outDir = path.resolve(process.cwd(), "build");
const packsCompiled = path.resolve(outDir, "packs/");
if (!existsSync(packsCompiled)) {
    console.error("Packs directory does not exist in the build");
}

const packFolders = await fs.readdir(packsCompiled);

const replacer = (key, value) => {
      if (key === "createdTime") return undefined
      if (key === "modifiedTime") return undefined
      if (key === "lastModifiedBy") return undefined
      return value
}

console.log("Cleaning packs");
for (const pack of packFolders) {
    const files = await fs.readdir(`packs/${pack}`, { withFileTypes: true });
    const jsonFiles = files
        .filter((f) => f.isFile() && f.name.toLowerCase().endsWith(".json"))
        .map((f) => f.name);
    for (const file of jsonFiles) {
        await fs.rm(path.resolve("packs", pack, file));
    }
}

for (const pack of packFolders) {
    console.log(`Extracting pack: ${pack}`);
    await extractPack(path.resolve(packsCompiled, pack), `packs/${pack}`, {jsonOptions: {replacer: replacer, space: 2}});
}

console.log("Extraction Complete");
