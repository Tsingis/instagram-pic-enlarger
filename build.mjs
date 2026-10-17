import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { build } from "esbuild"

const root = path.dirname(fileURLToPath(import.meta.url))
const releaseDir = path.join(root, "release")

await build({
  entryPoints: {
    background: path.join(root, "src", "background.ts"),
    content: path.join(root, "src", "content.ts"),
  },
  bundle: true,
  format: "iife",
  minify: true,
  outdir: releaseDir,
  platform: "browser",
})

fs.cpSync(path.join(root, "public"), releaseDir, { recursive: true })
