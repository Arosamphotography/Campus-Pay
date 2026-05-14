import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const PORT = 19876;
const HEALTHZ_URL = `http://localhost:${PORT}/api/healthz`;
const TIMEOUT_MS = 15_000;
const POLL_INTERVAL_MS = 250;

const serverEntry = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "dist/index.mjs",
);

const server = spawn("node", ["--enable-source-maps", serverEntry], {
  env: { ...process.env, PORT: String(PORT), NODE_ENV: "production" },
  stdio: "pipe",
});

let stderr = "";
server.stderr.on("data", (chunk) => { stderr += chunk.toString(); });

server.on("exit", (code) => {
  if (code !== null && code !== 0) {
    console.error("Server exited unexpectedly:", stderr);
    process.exit(1);
  }
});

function cleanup(exitCode) {
  server.kill();
  process.exit(exitCode);
}

async function poll() {
  const deadline = Date.now() + TIMEOUT_MS;

  while (Date.now() < deadline) {
    try {
      const res = await fetch(HEALTHZ_URL);
      if (!res.ok) {
        console.error(`Health check returned HTTP ${res.status}`);
        cleanup(1);
      }
      const body = await res.json();
      if (body?.status !== "ok") {
        console.error(`Unexpected response body: ${JSON.stringify(body)}`);
        cleanup(1);
      }
      console.log(`Smoke test passed — GET /api/healthz → ${JSON.stringify(body)}`);
      cleanup(0);
    } catch {
      await new Promise((r) => setTimeout(r, POLL_INTERVAL_MS));
    }
  }

  console.error(`Server did not respond within ${TIMEOUT_MS}ms.\nServer stderr:\n${stderr}`);
  cleanup(1);
}

poll();
