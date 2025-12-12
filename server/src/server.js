import express from "express";
import cors from "cors";
import cron from "node-cron";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT || 4000;

const REMOTE_URL =
  "https://qhx5aibhvd5isncu65zoyqlobu0rqbxj.lambda-url.ca-central-1.on.aws/";

// Simple in memory cache for daily prices and catering details
let dailyPrices = null;
let dailyUpdatedAt = null;
/** @type {Map<string, { data: unknown; updatedAt: Date }>} */
const cateringCache = new Map();

async function fetchDailyPrices() {
  console.log("[prices] Fetching latest daily prices from remote endpoint");
  const res = await fetch(REMOTE_URL);
  if (!res.ok) {
    throw new Error("Failed to fetch daily prices");
  }
  const json = await res.json();
  dailyPrices = json;
  dailyUpdatedAt = new Date();
}

function isSundayDataFresh() {
  if (!dailyUpdatedAt) return false;
  const now = new Date();
  const diffMs = now.getTime() - dailyUpdatedAt.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays < 7;
}

// Schedule a refresh every Sunday at 6:00 (disabled under test)
if (process.env.NODE_ENV !== "test") {
  cron.schedule("0 6 * * 0", async () => {
    try {
      await fetchDailyPrices();
      console.log("[prices] Daily prices cache refreshed for the new week");
    } catch (err) {
      console.error("[prices] Failed to refresh weekly prices", err);
    }
  });
}

// Menu storage on disk
const menuFilePath = path.join(__dirname, "..", "data", "menu.json");
const seedFilePath = path.join(__dirname, "..", "data", "menu-seed.json");

function ensureMenuFile() {
  if (!fs.existsSync(menuFilePath)) {
    console.log("[menu] Seeding menu.json from menu-seed.json");
    const seed = fs.readFileSync(seedFilePath, "utf-8");
    fs.writeFileSync(menuFilePath, seed, "utf-8");
  }
}

function readMenu() {
  ensureMenuFile();
  const raw = fs.readFileSync(menuFilePath, "utf-8");
  return JSON.parse(raw);
}

function writeMenu(menu) {
  fs.writeFileSync(menuFilePath, JSON.stringify(menu, null, 2), "utf-8");
}

/**
 * Build and configure an Express application.
 * Exported for tests, while the CLI entry point at the bottom starts the server.
 */
export function createApp() {
  const app = express();

  app.use(cors());
  app.use(express.json());

  // Routes

  app.get("/api/prices/daily", async (req, res) => {
    try {
      if (!dailyPrices || !isSundayDataFresh()) {
        await fetchDailyPrices();
      }
      res.json({
        updatedAt: dailyUpdatedAt,
        source: "xtrek-node-cache",
        payload: dailyPrices
      });
    } catch (err) {
      console.error("[prices] Error fetching daily prices", err);
      res.status(500).json({ error: "Failed to load daily prices" });
    }
  });

  app.post("/api/prices/catering", async (req, res) => {
    const { cafeteria_id } = req.body || {};
    const validIds = ["britannia", "glebe", "mitigomijokan", "versant"];
    if (!validIds.includes(cafeteria_id)) {
      return res.status(400).json({ error: "Invalid cafeteria_id" });
    }

    try {
      const cached = cateringCache.get(cafeteria_id);
      if (cached) {
        const ageMs = Date.now() - cached.updatedAt.getTime();
        const ageHours = ageMs / (1000 * 60 * 60);
        if (ageHours < 24) {
          return res.json({
            updatedAt: cached.updatedAt,
            source: "xtrek-node-cache",
            payload: cached.data
          });
        }
      }

      const remoteRes = await fetch(REMOTE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cafeteria_id })
      });
      if (!remoteRes.ok) {
        throw new Error("Remote catering request failed");
      }
      const json = await remoteRes.json();
      const now = new Date();
      cateringCache.set(cafeteria_id, { data: json, updatedAt: now });
      res.json({
        updatedAt: now,
        source: "xtrek-node-cache",
        payload: json
      });
    } catch (err) {
      console.error("[catering] Error fetching catering data", err);
      res.status(500).json({ error: "Failed to load catering information" });
    }
  });

  app.get("/api/menu", (req, res) => {
    try {
      const menu = readMenu();
      res.json(menu);
    } catch (err) {
      console.error("[menu] Error reading menu", err);
      res.status(500).json({ error: "Failed to read menu" });
    }
  });

  app.put("/api/menu", (req, res) => {
    try {
      const menu = req.body;
      if (!Array.isArray(menu)) {
        return res.status(400).json({ error: "Menu must be an array" });
      }
      writeMenu(menu);
      res.json({ status: "ok" });
    } catch (err) {
      console.error("[menu] Error writing menu", err);
      res.status(500).json({ error: "Failed to save menu" });
    }
  });

  // Ensure menu file exists on startup
  try {
    ensureMenuFile();
  } catch (err) {
    console.error("[menu] Error seeding menu file", err);
  }

  return app;
}

// If this module is run directly, start the HTTP server.
// During tests we import createApp() instead and skip listen().
if (process.env.NODE_ENV !== "test") {
  const app = createApp();
  app.listen(port, () => {
    console.log(
      `xtrek cafeterias Node API listening on http://localhost:${port}`
    );
  });
}

export default createApp;
