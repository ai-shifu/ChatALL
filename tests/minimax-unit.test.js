/**
 * Unit tests for MiniMax provider integration in ChatALL.
 *
 * Run: node tests/minimax-unit.test.js
 */

const fs = require("fs");
const path = require("path");

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ ${message}`);
    failed++;
  }
}

function describe(name, fn) {
  console.log(`\n${name}`);
  fn();
}

// ─── Bot files exist ───────────────────────────────────────────────
describe("Bot files exist", () => {
  const botsDir = path.join(__dirname, "..", "src", "bots", "minimax");

  assert(
    fs.existsSync(path.join(botsDir, "MiniMaxAPIBot.js")),
    "MiniMaxAPIBot.js exists",
  );
  assert(
    fs.existsSync(path.join(botsDir, "MiniMaxM25Bot.js")),
    "MiniMaxM25Bot.js exists",
  );
  assert(
    fs.existsSync(path.join(botsDir, "MiniMaxM25HighspeedBot.js")),
    "MiniMaxM25HighspeedBot.js exists",
  );
});

// ─── Bot file contents ────────────────────────────────────────────
describe("MiniMaxAPIBot.js contents", () => {
  const content = fs.readFileSync(
    path.join(__dirname, "..", "src", "bots", "minimax", "MiniMaxAPIBot.js"),
    "utf-8",
  );

  assert(
    content.includes('import { ChatOpenAI } from "@langchain/openai"'),
    "Uses ChatOpenAI from @langchain/openai",
  );
  assert(
    content.includes("https://api.minimax.io/v1"),
    "Default base URL is https://api.minimax.io/v1",
  );
  assert(
    content.includes("minimaxApi.apiKey"),
    "Uses minimaxApi.apiKey from store",
  );
  assert(
    content.includes("minimaxApi.temperature"),
    "Uses minimaxApi.temperature from store",
  );
  assert(
    content.includes("minimaxApi.alterUrl"),
    "Supports custom API URL via alterUrl",
  );
  assert(content.includes("streaming: true"), "Streaming is enabled");
  assert(
    content.includes('static _brandId = "minimaxApi"'),
    'Brand ID is "minimaxApi"',
  );
});

describe("MiniMaxM25Bot.js contents", () => {
  const content = fs.readFileSync(
    path.join(__dirname, "..", "src", "bots", "minimax", "MiniMaxM25Bot.js"),
    "utf-8",
  );

  assert(
    content.includes('static _model = "MiniMax-M2.5"'),
    'Model is "MiniMax-M2.5"',
  );
  assert(
    content.includes("extends MiniMaxAPIBot"),
    "Extends MiniMaxAPIBot",
  );
  assert(
    content.includes('static _className = "MiniMaxM25Bot"'),
    'Class name is "MiniMaxM25Bot"',
  );
});

describe("MiniMaxM25HighspeedBot.js contents", () => {
  const content = fs.readFileSync(
    path.join(
      __dirname,
      "..",
      "src",
      "bots",
      "minimax",
      "MiniMaxM25HighspeedBot.js",
    ),
    "utf-8",
  );

  assert(
    content.includes('static _model = "MiniMax-M2.5-highspeed"'),
    'Model is "MiniMax-M2.5-highspeed"',
  );
  assert(
    content.includes("extends MiniMaxAPIBot"),
    "Extends MiniMaxAPIBot",
  );
  assert(
    content.includes('static _className = "MiniMaxM25HighspeedBot"'),
    'Class name is "MiniMaxM25HighspeedBot"',
  );
});

// ─── Settings component ───────────────────────────────────────────
describe("Settings component", () => {
  const settingsPath = path.join(
    __dirname,
    "..",
    "src",
    "components",
    "BotSettings",
    "MiniMaxAPIBotSettings.vue",
  );
  assert(fs.existsSync(settingsPath), "MiniMaxAPIBotSettings.vue exists");

  const content = fs.readFileSync(settingsPath, "utf-8");
  assert(
    content.includes("CommonBotSettings"),
    "Uses CommonBotSettings component",
  );
  assert(
    content.includes("apiKey"),
    "Has API key setting",
  );
  assert(
    content.includes("temperature"),
    "Has temperature setting",
  );
  assert(
    content.includes("pastRounds"),
    "Has pastRounds setting",
  );
  assert(
    content.includes("alterUrl"),
    "Has alterUrl setting for custom API endpoint",
  );
});

// ─── Store configuration ──────────────────────────────────────────
describe("Store configuration", () => {
  const storeContent = fs.readFileSync(
    path.join(__dirname, "..", "src", "store", "index.js"),
    "utf-8",
  );

  assert(
    storeContent.includes("minimaxApi:"),
    "minimaxApi state exists in store",
  );
  assert(
    storeContent.includes("setMiniMaxApi"),
    "setMiniMaxApi mutation exists",
  );

  // Check default values
  const stateMatch = storeContent.match(
    /minimaxApi:\s*\{[^}]+\}/s,
  );
  if (stateMatch) {
    const stateBlock = stateMatch[0];
    assert(
      stateBlock.includes('apiKey: ""'),
      "Default apiKey is empty string",
    );
    assert(
      stateBlock.includes("temperature: 1"),
      "Default temperature is 1",
    );
    assert(
      stateBlock.includes("pastRounds: 5"),
      "Default pastRounds is 5",
    );
    assert(
      stateBlock.includes('alterUrl: ""'),
      "Default alterUrl is empty string",
    );
  } else {
    assert(false, "Could not parse minimaxApi state block");
  }
});

// ─── Bot registration ─────────────────────────────────────────────
describe("Bot registration in index.js", () => {
  const indexContent = fs.readFileSync(
    path.join(__dirname, "..", "src", "bots", "index.js"),
    "utf-8",
  );

  assert(
    indexContent.includes(
      'import MiniMaxM25Bot from "./minimax/MiniMaxM25Bot"',
    ),
    "MiniMaxM25Bot is imported",
  );
  assert(
    indexContent.includes(
      'import MiniMaxM25HighspeedBot from "./minimax/MiniMaxM25HighspeedBot"',
    ),
    "MiniMaxM25HighspeedBot is imported",
  );
  assert(
    indexContent.includes("MiniMaxM25Bot.getInstance()"),
    "MiniMaxM25Bot is registered in all array",
  );
  assert(
    indexContent.includes("MiniMaxM25HighspeedBot.getInstance()"),
    "MiniMaxM25HighspeedBot is registered in all array",
  );

  // Check API tag
  assert(
    indexContent.includes('bots.getBotByClassName("MiniMaxM25Bot")'),
    "MiniMaxM25Bot is in botTags",
  );
  assert(
    indexContent.includes('bots.getBotByClassName("MiniMaxM25HighspeedBot")'),
    "MiniMaxM25HighspeedBot is in botTags",
  );
});

// ─── i18n entries ─────────────────────────────────────────────────
describe("i18n entries", () => {
  const enLocale = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "src", "i18n", "locales", "en.json"),
      "utf-8",
    ),
  );

  assert(enLocale.minimaxApi, "minimaxApi key exists in en.json");
  assert(
    enLocale.minimaxApi.name === "MiniMax API",
    'name is "MiniMax API"',
  );
  assert(
    enLocale.minimaxApi["MiniMax-M25"] === "MiniMax-M2.5",
    "MiniMax-M2.5 model name is correct",
  );
  assert(
    enLocale.minimaxApi["MiniMax-M25-highspeed"] === "MiniMax-M2.5-highspeed",
    "MiniMax-M2.5-highspeed model name is correct",
  );

  // Check Chinese locale
  const zhLocale = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "..", "src", "i18n", "locales", "zh.json"),
      "utf-8",
    ),
  );
  assert(zhLocale.minimaxApi, "minimaxApi key exists in zh.json");
});

// ─── Logo files ───────────────────────────────────────────────────
describe("Logo files", () => {
  const logosDir = path.join(__dirname, "..", "public", "bots");

  assert(
    fs.existsSync(path.join(logosDir, "minimax-logo.svg")),
    "minimax-logo.svg exists",
  );
});

// ─── README entries ───────────────────────────────────────────────
describe("README entries", () => {
  const readme = fs.readFileSync(
    path.join(__dirname, "..", "README.md"),
    "utf-8",
  );
  assert(readme.includes("MiniMax"), "MiniMax is mentioned in README.md");
  assert(
    readme.includes("https://www.minimax.io/"),
    "MiniMax link is in README.md",
  );
});

// ─── Summary ──────────────────────────────────────────────────────
console.log(`\n${"─".repeat(50)}`);
console.log(`Results: ${passed} passed, ${failed} failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log("All unit tests passed!");
}
