# AI副业实验室

每周实测一个低成本副业项目，把过程、工具、模板和结果公开复盘。

## 当前定位

不卖焦虑，不承诺收益。用小红书内容、免费模板、网页小工具和周复盘，验证哪些 AI 副业方向真的有人需要。

## 第一阶段目标

- 上线一个公开网站
- 发布 3 个免费模板
- 准备 1 个低价付费包雏形
- 发布第一批小红书笔记
- 用 30 天验证真实反馈

公开网站：

https://ai-side-lab-zeta.vercel.app

## 目录

- `index.html`：第一版网站
- `styles.css`：页面样式
- `app.js`：小工具逻辑
- `templates/free`：免费模板
- `templates/paid`：付费包雏形
- `content/xiaohongshu`：小红书草稿
- `content/xiaohongshu/covers`：小红书封面图
- `data/feishu`：飞书导入表
- `ops`：运营与合规检查
- `scripts/build-feishu-workbook.mjs`：生成飞书/Excel 运营驾驶舱工作簿
- `scripts/verify-feishu-workbook.mjs`：验证工作簿关键表格

## 飞书后台

飞书作为项目运营驾驶舱使用。桌面项目文件夹里已有合并好的工作簿：

`/Users/lee/Desktop/AI副业实验室/05-数据复盘/AI副业实验室-飞书运营驾驶舱.xlsx`

也可以分别导入 `data/feishu` 里的 CSV：

- `experiments.csv`：实验看板
- `publish-calendar.csv`：发布日历
- `feedback-log.csv`：用户反馈
- `metrics-review.csv`：数据复盘

## 合规原则

- 不承诺收益
- 不教灰产
- 不涉及投资建议
- 不虚构案例
- 不公开隐私和收款码
- 所有内容都按“个人实验记录”表达
