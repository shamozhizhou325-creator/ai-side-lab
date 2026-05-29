from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "content" / "xiaohongshu" / "covers"
DESKTOP = Path("/Users/lee/Desktop/AI副业实验室/03-内容选题/发布素材")
W, H = 1242, 1656
FONT = "/System/Library/AssetsV2/com_apple_MobileAsset_Font8/86ba2c91f017a3749571a82f2c6d890ac7ffb2fb.asset/AssetData/PingFang.ttc"


def font(size, index=0):
    return ImageFont.truetype(FONT, size=size, index=index)


def center(draw, text, y, fnt, fill=(20, 20, 20)):
    box = draw.textbbox((0, 0), text, font=fnt)
    x = (W - (box[2] - box[0])) / 2
    draw.text((x, y), text, font=fnt, fill=fill)


def rounded(draw, xy, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=outline, width=width)


def cover_002():
    img = Image.new("RGB", (W, H), "#f6f1e8")
    d = ImageDraw.Draw(img)
    for x in range(0, W, 54):
        d.line((x, 0, x, H), fill="#e5dccd", width=1)
    for y in range(0, H, 54):
        d.line((0, y, W, y), fill="#e5dccd", width=1)
    d.rectangle((0, 0, W, 92), fill="#111111")
    center(d, "AI副业实验 001", 26, font(34), "#ffffff")
    center(d, "我先做了一个", 220, font(76, 8))
    center(d, "小红书标题生成器", 330, font(82, 8))
    rounded(d, (128, 560, W - 128, 1048), 34, "#ffffff", "#111111", 3)
    items = ["输入一个想法", "生成10个标题", "附带发布前检查"]
    for i, item in enumerate(items):
        y = 640 + i * 126
        d.ellipse((190, y + 12, 236, y + 58), fill="#10b981")
        d.text((205, y + 8), "✓", font=font(34, 8), fill="#ffffff")
        d.text((270, y), item, font=font(48, 8), fill="#111111")
    center(d, "不是先做大产品", 1180, font(48, 8), "#111111")
    center(d, "先看有没有人真的需要", 1255, font(48, 8), "#111111")
    rounded(d, (210, 1420, W - 210, 1510), 45, "#111111")
    center(d, "第1周：验证需求", 1440, font(42, 8), "#ffffff")
    return img


def cover_003():
    img = Image.new("RGB", (W, H), "#eef5f2")
    d = ImageDraw.Draw(img)
    d.rectangle((0, 0, W, H), fill="#eef5f2")
    for x in range(110, W - 110, 170):
        d.line((x, 150, x, H - 170), fill="#d5e3dc", width=2)
    for y in range(150, H - 170, 170):
        d.line((110, y, W - 110, y), fill="#d5e3dc", width=2)
    center(d, "AI副业启动清单", 190, font(86, 8))
    center(d, "先免费放出来", 312, font(70, 8), "#0f766e")
    rounded(d, (120, 520, W - 120, 1160), 34, "#ffffff", "#0f766e", 4)
    rows = [
        "7天内能不能做出可见版本",
        "第一个用户到底是谁",
        "成本是否低于100元",
        "失败后能不能留下资产",
        "有没有平台或法律风险",
    ]
    for i, row in enumerate(rows):
        y = 605 + i * 102
        d.rounded_rectangle((190, y, 242, y + 52), 12, fill="#0f766e")
        d.text((204, y + 2), str(i + 1), font=font(34, 8), fill="#ffffff")
        d.text((275, y - 2), row, font=font(40, 8), fill="#111111")
    center(d, "不是证明一定能赚钱", 1260, font(46, 8), "#111111")
    center(d, "是先少走弯路", 1332, font(54, 8), "#111111")
    rounded(d, (260, 1460, W - 260, 1536), 38, "#0f766e")
    center(d, "适合从0开始验证想法", 1476, font(36, 8), "#ffffff")
    return img


def save_all():
    OUT.mkdir(parents=True, exist_ok=True)
    DESKTOP.mkdir(parents=True, exist_ok=True)
    covers = {
        "002-title-tool-cover.png": cover_002(),
        "003-free-template-cover.png": cover_003(),
    }
    for name, img in covers.items():
        img.save(OUT / name)
        img.save(DESKTOP / name)
        print(OUT / name)


if __name__ == "__main__":
    save_all()
