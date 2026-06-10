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
const message = [
  "【AI副业实验室｜小红书最终发布包】",
  "",
  "状态：待 Jack 手机端确认发布",
  "",
  `封面下载：${cover}`,
  "",
  content,
  "",
  "安全提醒：发布前不要添加收款码、手机号、微信号、夸大收益或私密截图。",
].join("\n");

execFileSync(
  process.execPath,
  ["scripts/send-feishu-message.mjs", message],
  { stdio: "inherit" },
);
