import { compilePack } from "@foundryvtt/foundryvtt-cli";
import { existsSync } from "fs";
import fs from "fs/promises";
import path from "path";

// Clean output directory, or create build directory
const outDir = path.resolve(process.cwd(), "build");
if (existsSync(outDir)) {
    const filesToClean = (await fs.readdir(outDir)).map((dirName) => path.resolve(outDir, dirName));
    for (const file of filesToClean) {
        await fs.rm(file, { recursive: true });
    }
} else {
    await fs.mkdir(outDir);
}

// Build packs
const packFolders = await fs.readdir("packs");
for (const pack of packFolders) {
    await compilePack(`packs/${pack}`, path.resolve(outDir, `packs/${pack}`));
}

// Copy files and folders to output
const files = ["art", "assets", "fonts", "lang", "scripts", "styles", "module.json", "ORCLicense.md"];
for (const file of files) {
    await fs.cp(file, path.resolve(outDir, file), { recursive: true });
}
