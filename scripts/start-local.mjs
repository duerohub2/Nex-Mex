#!/usr/bin/env node
import { spawn } from "node:child_process";

const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const children = [];
let stopping = false;

function launch(label, args) {
  const child = spawn(npmCommand, args, {
    stdio: "inherit",
    env: {
      ...process.env,
      HOST: process.env.HOST || "127.0.0.1",
      PORT: process.env.PORT || "3000",
      DEMO_ADAPTER_PORT: process.env.DEMO_ADAPTER_PORT || "18789",
    },
  });
  children.push(child);
  child.on("error", (error) => {
    console.error(`[${label}] Gagal dijalankan:`, error.message);
    shutdown(1);
  });
  child.on("exit", (code) => {
    if (!stopping && code !== 0) {
      console.error(`[${label}] Berhenti dengan kode ${code ?? "tidak diketahui"}.`);
      shutdown(code || 1);
    }
  });
  return child;
}

function shutdown(code = 0) {
  if (stopping) return;
  stopping = true;
  for (const child of children) {
    if (!child.killed) child.kill("SIGTERM");
  }
  setTimeout(() => process.exit(code), 300).unref();
}

process.on("SIGINT", () => shutdown(0));
process.on("SIGTERM", () => shutdown(0));

console.log("\nNEX-MEX LOCAL — MODE DEMO");
console.log("Gateway demo : ws://127.0.0.1:18789");
console.log("Kantor       : http://127.0.0.1:3000");
console.log("Tekan Ctrl+C untuk menghentikan kedua proses.\n");

launch("Demo Gateway", ["run", "demo-gateway"]);
launch("NEX-MEX Web", ["run", "dev"]);
