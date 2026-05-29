import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(".");
const sources = [
  ["项目说明", null],
  ["实验看板", "data/feishu/experiments.csv"],
  ["发布日历", "data/feishu/publish-calendar.csv"],
  ["用户反馈", "data/feishu/feedback-log.csv"],
  ["数据复盘", "data/feishu/metrics-review.csv"],
];

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i += 1;
      } else if (ch === '"') {
        quoted = false;
      } else {
        cell += ch;
      }
      continue;
    }
    if (ch === '"') quoted = true;
    else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else if (ch !== "\r") {
      cell += ch;
    }
  }
  if (cell || row.length) {
    row.push(cell);
    rows.push(row);
  }
  return rows.filter((r) => r.some((v) => v !== ""));
}

function toA1(row, col) {
  let label = "";
  let n = col;
  while (n > 0) {
    const rem = (n - 1) % 26;
    label = String.fromCharCode(65 + rem) + label;
    n = Math.floor((n - 1) / 26);
  }
  return `${label}${row}`;
}

function put(sheet, startRow, startCol, rows) {
  const width = Math.max(...rows.map((row) => row.length));
  const normalized = rows.map((row) => [...row, ...Array(width - row.length).fill("")]);
  const endRow = startRow + rows.length - 1;
  const endCol = startCol + width - 1;
  sheet.getRange(`${toA1(startRow, startCol)}:${toA1(endRow, endCol)}`).values = normalized;
  return { rows: rows.length, cols: width };
}

function styleSheet(sheet, rows, cols, type = "table") {
  const used = sheet.getRange(`A1:${toA1(rows, cols).replace(/\d+$/, "")}${rows}`);
  used.format.wrapText = true;
  used.format.verticalAlignment = "Top";
  used.format.font.name = "Arial";
  used.format.font.size = 10;

  const header = sheet.getRange(`A1:${toA1(1, cols)}`);
  header.format.fill.color = type === "summary" ? "#111111" : "#0f766e";
  header.format.font.color = "#ffffff";
  header.format.font.bold = true;
  header.format.rowHeightPx = 34;

  sheet.freezePanes.freezeRows(1);
  for (let col = 1; col <= cols; col += 1) {
    const width = type === "summary" ? (col === 1 ? 170 : 620) : 150;
    sheet.getRange(`${toA1(1, col).replace(/\d+$/, "")}:${toA1(1, col).replace(/\d+$/, "")}`).format.columnWidthPx = width;
  }
  sheet.getRange(`A1:${toA1(rows, cols)}`).format.rowHeightPx = type === "summary" ? 28 : 44;
}

async function main() {
  const workbook = Workbook.create();
  const summary = workbook.worksheets.add("项目说明");

  const summarySize = put(summary, 1, 1, [
    ["AI副业实验室 - 运营驾驶舱"],
    ["用途", "把内容发布、用户反馈、实验假设、周复盘放到同一套表里，避免凭感觉做项目。"],
    ["官网", "https://ai-side-lab-zeta.vercel.app"],
    ["当前阶段", "第 1 周：验证小红书标题与选题实验器是否有人真实需要"],
    ["合规原则", "不承诺收益；不做敏感内容；不引导灰产；发布前做敏感词和事实检查。"],
    ["每周判断", "具体反馈 >= 3 或有人愿意提供真实场景，继续；否则换方向或缩小场景。"],
    [""],
    ["工作表", "使用方式"],
    ["实验看板", "记录每个副业实验的假设、交付物、成功信号、停止条件。"],
    ["发布日历", "管理小红书发布节奏，记录链接和素材。"],
    ["用户反馈", "把评论、私信、网站访问里的真实需求沉淀成下一步动作。"],
    ["数据复盘", "每 2-3 天填一次，用数据决定继续、调整、停止。"],
  ]);
  styleSheet(summary, summarySize.rows, summarySize.cols, "summary");

  for (const [sheetName, source] of sources.slice(1)) {
    const sheet = workbook.worksheets.add(sheetName);
    const csv = await fs.readFile(path.join(root, source), "utf8");
    const rows = parseCsv(csv);
    const size = put(sheet, 1, 1, rows);
    styleSheet(sheet, size.rows, size.cols);
  }

  await fs.mkdir(path.join(root, "outputs"), { recursive: true });
  const output = await SpreadsheetFile.exportXlsx(workbook);
  const outPath = path.join(root, "outputs", "AI副业实验室-飞书运营驾驶舱.xlsx");
  await output.save(outPath);

  const desktopDir = "/Users/lee/Desktop/AI副业实验室/05-数据复盘";
  await fs.mkdir(desktopDir, { recursive: true });
  await fs.copyFile(outPath, path.join(desktopDir, "AI副业实验室-飞书运营驾驶舱.xlsx"));
  console.log(outPath);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
