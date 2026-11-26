// Japan Data Atlas — the hand-in program (Node 22, standard library only).
//
// What it does, in order:
//   1. Works out where it lives (the repository root) and where the entry
//      goes (MAKEFUN_OUTPUT_DIR, or /output inside the grader).
//   2. Copies the finished site (app/) and its screenshots (screenshots/)
//      into the output directory, replacing anything already there.
//   3. Asks the vendored make.fun library to summarise the entry as
//      dossier.json, with the same caps the scorer uses, so a local run
//      fails exactly where the scorer would.
//
// Run it from the repository root:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { cpSync, existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { buildDossier } from "./vendor/makefun-frontend.ts";

// The caps the scorer applies to this bounty (see the kit's RULES.txt):
// at most 4 screenshots of 256 KiB each, app/ at most 993 entries and
// 16 MiB, and the judge's text at most 160 KiB.
const DOSSIER_CAPS = {
  text_max_bytes: 163840,
  screenshots: { max: 4, max_bytes: 262144 },
  app_max_files: 993,
  app_max_bytes: 16777216,
};

function freshDir(path) {
  // Start clean so a stale file from an earlier run can never leak in.
  rmSync(path, { recursive: true, force: true });
  mkdirSync(path, { recursive: true });
}

function handIn(repoRoot, outputDir) {
  const appDir = join(repoRoot, "app");
  const shotsDir = join(repoRoot, "screenshots");
  if (!existsSync(appDir)) {
    throw new Error("no app/ directory beside main.ts — nothing to hand in");
  }
  if (!existsSync(shotsDir)) {
    throw new Error("no screenshots/ directory beside main.ts — nothing to hand in");
  }

  freshDir(outputDir);
  cpSync(appDir, join(outputDir, "app"), { recursive: true });
  cpSync(shotsDir, join(outputDir, "screenshots"), { recursive: true });

  // buildDossier reads only what was just copied, and refuses an entry
  // the scorer would refuse — so this write is the check, not just output.
  const dossier = buildDossier(outputDir, DOSSIER_CAPS);
  writeFileSync(join(outputDir, "dossier.json"), dossier);
  return dossier.length;
}

const repoRoot = fileURLToPath(new URL(".", import.meta.url));
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

try {
  const bytes = handIn(repoRoot, outputDir);
  console.log(`handed in: app/ + screenshots/ copied to ${outputDir}, dossier.json (${bytes} bytes)`);
} catch (err) {
  console.error(`hand-in failed: ${err instanceof Error ? err.message : err}`);
  process.exit(1);
}
