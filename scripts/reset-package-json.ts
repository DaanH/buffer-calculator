import { readFileSync, writeFileSync } from "fs";

// This pipeline script resets the package.json file for scripts changes. We need these scripts to build succesfully.

const scripts = {
    dev: "vite && prettier **/* --write",
    preview: "vite preview",
    build: "vite build",
    "build-for-pro1": "vite build --mode cms"
};

const file = readFileSync("package.json");
const packageJson = JSON.parse(file.toString());
packageJson.scripts = scripts;

writeFileSync("package.json", Buffer.from(JSON.stringify(packageJson)));
