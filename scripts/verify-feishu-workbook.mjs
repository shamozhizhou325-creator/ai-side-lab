import { FileBlob, SpreadsheetFile } from "@oai/artifact-tool";

const file = "outputs/AI副业实验室-飞书运营驾驶舱.xlsx";
const workbook = await SpreadsheetFile.importXlsx(await FileBlob.load(file));

for (const range of [
  "项目说明!A1:B12",
  "实验看板!A1:K4",
  "发布日历!A1:I5",
  "用户反馈!A1:H4",
  "数据复盘!A1:L5",
]) {
  const result = await workbook.inspect({
    kind: "table",
    range,
    include: "values,formulas",
    tableMaxRows: 12,
    tableMaxCols: 12,
  });
  console.log(`--- ${range}`);
  console.log(result.ndjson);
}

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
  summary: "formula error scan",
});
console.log("--- errors");
console.log(errors.ndjson);
