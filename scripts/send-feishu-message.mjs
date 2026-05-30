import crypto from "node:crypto";

const webhook = process.env.FEISHU_WEBHOOK_URL;
const secret = process.env.FEISHU_WEBHOOK_SECRET;
const text = process.argv.slice(2).join(" ").trim();

if (!webhook) {
  console.error("Missing FEISHU_WEBHOOK_URL.");
  process.exit(1);
}

if (!text) {
  console.error("Usage: node scripts/send-feishu-message.mjs 'message'");
  process.exit(1);
}

const payload = {
  msg_type: "text",
  content: { text },
};

if (secret) {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const sign = crypto
    .createHmac("sha256", `${timestamp}\n${secret}`)
    .update("")
    .digest("base64");
  payload.timestamp = timestamp;
  payload.sign = sign;
}

const response = await fetch(webhook, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await response.text();
if (!response.ok) {
  console.error(body);
  process.exit(1);
}

console.log(body);
