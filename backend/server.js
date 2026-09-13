import express from "express";
import cors from "cors";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = Number(globalThis.process?.env?.PORT || 8080);
const FRONTEND_ORIGIN = globalThis.process?.env?.FRONTEND_ORIGIN || "*";

const workersFile = path.join(__dirname, "data", "workers.json");
const contactLogFile = path.join(__dirname, "data", "contact-submissions.json");

function readJson(filePath, fallback) {
  try {
    const raw = fs.readFileSync(filePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeJson(filePath, value) {
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2), "utf8");
}

app.use(cors({ origin: FRONTEND_ORIGIN === "*" ? true : FRONTEND_ORIGIN }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", function (_req, res) {
  res.json({
    status: "ok",
    service: "shramik-backend",
    timestamp: new Date().toISOString(),
  });
});

app.get("/api/workers", function (req, res) {
  const workers = readJson(workersFile, []);
  const query = String(req.query.q || "").trim().toLowerCase();
  const city = String(req.query.city || "").trim().toLowerCase();
  const role = String(req.query.role || "").trim().toLowerCase();
  const limit = Math.max(1, Math.min(100, Number(req.query.limit || 20)));

  const filtered = workers.filter(function (worker) {
    const textPass =
      !query ||
      String(worker.name || "").toLowerCase().includes(query) ||
      String(worker.role || "").toLowerCase().includes(query) ||
      String(worker.city || "").toLowerCase().includes(query) ||
      (Array.isArray(worker.skills) && worker.skills.some(function (skill) { return String(skill).toLowerCase().includes(query); }));

    const cityPass = !city || String(worker.city || "").toLowerCase() === city;
    const rolePass = !role || String(worker.role || "").toLowerCase() === role;

    return textPass && cityPass && rolePass;
  });

  res.json({
    count: filtered.length,
    items: filtered.slice(0, limit),
  });
});

app.get("/api/workers/:id", function (req, res) {
  const workers = readJson(workersFile, []);
  const id = Number(req.params.id);
  const worker = workers.find(function (entry) { return Number(entry.id) === id; });

  if (!worker) {
    res.status(404).json({ message: "worker not found" });
    return;
  }

  res.json(worker);
});

app.post("/api/contact", function (req, res) {
  const name = String(req.body?.name || "").trim();
  const phone = String(req.body?.phone || "").trim();
  const message = String(req.body?.message || "").trim();

  if (!name || !phone || !message) {
    res.status(400).json({ message: "name, phone, and message are required" });
    return;
  }

  const submissions = readJson(contactLogFile, []);
  const next = {
    id: Date.now(),
    name,
    phone,
    message,
    createdAt: new Date().toISOString(),
  };

  submissions.unshift(next);
  writeJson(contactLogFile, submissions.slice(0, 500));

  res.status(201).json({
    message: "saved",
    submissionId: next.id,
  });
});

app.use(function (_req, res) {
  res.status(404).json({ message: "route not found" });
});

app.listen(PORT, function () {
  console.log(`shramik backend listening on http://localhost:${PORT}`);
});
