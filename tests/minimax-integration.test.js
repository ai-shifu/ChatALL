/**
 * Integration tests for MiniMax API via OpenAI-compatible endpoint.
 *
 * Requires MINIMAX_API_KEY environment variable to be set.
 *
 * Run: MINIMAX_API_KEY=<key> node tests/minimax-integration.test.js
 */

const https = require("https");

const API_KEY = process.env.MINIMAX_API_KEY;
const BASE_URL = "https://api.minimax.io/v1";

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
  return fn();
}

function chatCompletion(model, messages, options = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(`${BASE_URL}/chat/completions`);

    const body = JSON.stringify({
      model,
      messages,
      temperature: options.temperature || 1.0,
      max_tokens: options.max_tokens || 100,
      stream: false,
    });

    const req = https.request(
      url,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve({ status: res.statusCode, body: JSON.parse(data) });
          } catch (e) {
            resolve({ status: res.statusCode, body: data });
          }
        });
      },
    );

    req.on("error", reject);
    req.setTimeout(60000, () => {
      req.destroy();
      reject(new Error("Request timed out"));
    });
    req.write(body);
    req.end();
  });
}

async function run() {
  if (!API_KEY) {
    console.error("ERROR: MINIMAX_API_KEY environment variable is not set");
    process.exit(1);
  }

  // ─── Test 1: MiniMax-M3 basic completion ─────────────────────
  await describe("MiniMax-M3 basic chat completion", async () => {
    try {
      const result = await chatCompletion("MiniMax-M3", [
        { role: "user", content: "Say hello in exactly one word." },
      ]);

      assert(result.status === 200, `Status code is 200 (got ${result.status})`);
      assert(result.body.choices, "Response has choices array");
      assert(
        result.body.choices.length > 0,
        "Response has at least one choice",
      );
      assert(
        result.body.choices[0].message,
        "First choice has a message",
      );
      assert(
        typeof result.body.choices[0].message.content === "string",
        "Message content is a string",
      );
      assert(
        result.body.choices[0].message.content.length > 0,
        `Got response: "${result.body.choices[0].message.content.substring(0, 50)}"`,
      );
      assert(
        result.body.model,
        `Model in response: ${result.body.model}`,
      );
    } catch (err) {
      assert(false, `Request failed: ${err.message}`);
    }
  });

  // ─── Test 2: MiniMax-M2.7 basic completion ────────────────────
  await describe("MiniMax-M2.7 basic chat completion", async () => {
    try {
      const result = await chatCompletion("MiniMax-M2.7", [
        { role: "user", content: "Say hello in exactly one word." },
      ]);

      assert(result.status === 200, `Status code is 200 (got ${result.status})`);
      assert(result.body.choices, "Response has choices array");
      assert(
        result.body.choices.length > 0,
        "Response has at least one choice",
      );
      assert(
        result.body.choices[0].message,
        "First choice has a message",
      );
      assert(
        typeof result.body.choices[0].message.content === "string",
        "Message content is a string",
      );
      assert(
        result.body.choices[0].message.content.length > 0,
        `Got response: "${result.body.choices[0].message.content.substring(0, 50)}"`,
      );
      assert(
        result.body.model,
        `Model in response: ${result.body.model}`,
      );
    } catch (err) {
      assert(false, `Request failed: ${err.message}`);
    }
  });

  // ─── Test 3: MiniMax-M2.7-highspeed basic completion ─────────
  await describe("MiniMax-M2.7-highspeed basic chat completion", async () => {
    try {
      const result = await chatCompletion("MiniMax-M2.7-highspeed", [
        { role: "user", content: "What is 3+3? Answer with just the number." },
      ]);

      assert(result.status === 200, `Status code is 200 (got ${result.status})`);
      assert(result.body.choices, "Response has choices array");
      assert(
        result.body.choices.length > 0,
        "Response has at least one choice",
      );
      assert(
        result.body.choices[0].message.content.length > 0,
        `Got response: "${result.body.choices[0].message.content.substring(0, 50)}"`,
      );
    } catch (err) {
      assert(false, `Request failed: ${err.message}`);
    }
  });

  // ─── Test 4: MiniMax-M2.7-highspeed alternate completion ──────────
  await describe("MiniMax-M2.7-highspeed alternate basic chat completion", async () => {
    try {
      const result = await chatCompletion("MiniMax-M2.7-highspeed", [
        { role: "user", content: "What is 2+2? Answer with just the number." },
      ]);

      assert(result.status === 200, `Status code is 200 (got ${result.status})`);
      assert(result.body.choices, "Response has choices array");
      assert(
        result.body.choices.length > 0,
        "Response has at least one choice",
      );
      assert(
        result.body.choices[0].message.content.length > 0,
        `Got response: "${result.body.choices[0].message.content.substring(0, 50)}"`,
      );
    } catch (err) {
      assert(false, `Request failed: ${err.message}`);
    }
  });

  // ─── Test 5: Temperature handling ──────────────────────────────
  await describe("Temperature handling", async () => {
    try {
      // Test with valid temperature (1.0)
      const result = await chatCompletion(
        "MiniMax-M2.7-highspeed",
        [{ role: "user", content: "Hi" }],
        { temperature: 1.0, max_tokens: 10 },
      );
      assert(
        result.status === 200,
        `Temperature 1.0 works (status ${result.status})`,
      );

      // Test with valid low temperature (0.1)
      const result2 = await chatCompletion(
        "MiniMax-M2.7-highspeed",
        [{ role: "user", content: "Hi" }],
        { temperature: 0.1, max_tokens: 10 },
      );
      assert(
        result2.status === 200,
        `Temperature 0.1 works (status ${result2.status})`,
      );
    } catch (err) {
      assert(false, `Request failed: ${err.message}`);
    }
  });

  // ─── Test 6: Multi-turn conversation ───────────────────────────
  await describe("Multi-turn conversation", async () => {
    try {
      const result = await chatCompletion("MiniMax-M2.7-highspeed", [
        { role: "user", content: "Remember the number 42." },
        {
          role: "assistant",
          content: "I'll remember the number 42.",
        },
        {
          role: "user",
          content: "What number did I ask you to remember? Reply with just the number.",
        },
      ]);

      assert(result.status === 200, `Status code is 200 (got ${result.status})`);
      assert(
        result.body.choices[0].message.content.includes("42"),
        `Response includes "42": "${result.body.choices[0].message.content.substring(0, 100)}"`,
      );
    } catch (err) {
      assert(false, `Request failed: ${err.message}`);
    }
  });

  // ─── Test 7: System message ────────────────────────────────────
  await describe("System message support", async () => {
    try {
      const result = await chatCompletion("MiniMax-M2.7-highspeed", [
        {
          role: "system",
          content: "You are a helpful assistant. Always end your response with the word PINEAPPLE.",
        },
        { role: "user", content: "Say hi." },
      ]);

      assert(result.status === 200, `Status code is 200 (got ${result.status})`);
      assert(
        result.body.choices[0].message.content.length > 0,
        `Got response with system message: "${result.body.choices[0].message.content.substring(0, 100)}"`,
      );
    } catch (err) {
      assert(false, `Request failed: ${err.message}`);
    }
  });

  // ─── Summary ───────────────────────────────────────────────────
  console.log(`\n${"─".repeat(50)}`);
  console.log(`Results: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    process.exit(1);
  } else {
    console.log("All integration tests passed!");
  }
}

run().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
