from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
RISKY = [
    "稳赚",
    "保证收益",
    "躺赚",
    "暴富",
    "零风险",
    "月入过万",
    "闭眼冲",
    "复制就赚钱",
    "刷单",
    "赌博",
    "虚拟币",
    "荐股",
    "代实名",
    "账号买卖",
]

paths = list(ROOT.glob("content/**/*.md")) + list(ROOT.glob("templates/**/*.md"))
failed = False
for path in paths:
    text = path.read_text(encoding="utf-8")
    hits = [word for word in RISKY if word in text]
    if hits:
        failed = True
        print(f"[risk] {path.relative_to(ROOT)}: {', '.join(hits)}")

if failed:
    raise SystemExit(1)

print(f"Checked {len(paths)} files. No risky words found.")
