import fs from "node:fs";
import { execFileSync } from "node:child_process";

const repo = "shamozhizhou325-creator/ai-side-lab";
const issueNumber = "1";
const stateDir = ".codex-state";
const stateFile = `${stateDir}/mobile-command-last-comment-id`;
const validCommands = [
  "同意发布",
  "暂停",
  "今天没空",
  "改标题",
  "改封面",
  "重写",
  "复盘",
  "状态",
];

function readLastId() {
  if (!fs.existsSync(stateFile)) return "";
  return fs.readFileSync(stateFile, "utf8").trim();
}

function writeLastId(id) {
  fs.mkdirSync(stateDir, { recursive: true });
  fs.writeFileSync(stateFile, `${id}\n`, { mode: 0o600 });
}

function comments() {
  const raw = execFileSync(
    "gh",
    ["api", `repos/${repo}/issues/${issueNumber}/comments`, "--paginate"],
    { encoding: "utf8" },
  );
  return JSON.parse(raw);
}

function normalize(body) {
  const firstLine = body.split(/\r?\n/).map((line) => line.trim()).find(Boolean) || "";
  return validCommands.find((command) => firstLine.includes(command)) || "";
}

const action = process.argv[2] || "check";

if (action === "mark") {
  const id = process.argv[3];
  if (!id) {
    console.error("Usage: node scripts/mobile-command.mjs mark <comment-id>");
    process.exit(1);
  }
  writeLastId(id);
  console.log(`Marked ${id}`);
  process.exit(0);
}

const lastId = readLastId();
const latest = comments()
  .map((comment) => ({
    id: String(comment.id),
    author: comment.user?.login || "",
    createdAt: comment.created_at,
    url: comment.html_url,
    body: comment.body || "",
    command: normalize(comment.body || ""),
  }))
  .filter((comment) => comment.command)
  .at(-1);

if (!latest || latest.id === lastId) {
  console.log(JSON.stringify({ status: "none" }));
  process.exit(0);
}

console.log(JSON.stringify({ status: "new", ...latest }, null, 2));
