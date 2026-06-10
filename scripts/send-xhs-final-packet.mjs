import { execFileSync } from "node:child_process";
import fs from "node:fs";

const packet = process.argv[2] || "content/xiaohongshu/mobile-publish/001-手机发布版.txt";
const cover =
  process.argv[3] ||
  "https://raw.githubusercontent.com/shamozhizhou325-creator/ai-side-lab/main/content/xiaohongshu/covers/001-launch-cover-v2.png";

if (!fs.existsSync(packet)) {
  console.error(`Missing publish packet: ${packet}`);
  process.exit(1);
}

const content = fs.readFileSync(packet, "utf8").trim();

function extractBlock(label) {
  const pattern = new RegExp(`【${label}】\\n([\\s\\S]*?)(?=\\n【|$)`);
  return content.match(pattern)?.[1]?.trim() || "";
}

const title = extractBlock("标题");
const body = extractBlock("正文");
const tags = extractBlock("话题");
const record = extractBlock("发布后立刻记录");

const messages = [
  "【AI副业实验室｜小红书最终发布包】下面分条发送，方便手机逐条复制。",
  `【1 封面下载】\n${cover}`,
  `【2 标题】\n${title}`,
  `【3 正文】\n${body}`,
  `【4 话题】\n${tags}`,
  `【5 发布后记录】\n${record}`,
  "【6 安全提醒】发布前不要添加收款码、手机号、微信号、夸大收益或私密截图。",
];

for (const message of messages) {
  execFileSync(process.execPath, ["scripts/send-feishu-message.mjs", message], {
    stdio: "inherit",
  });
}
