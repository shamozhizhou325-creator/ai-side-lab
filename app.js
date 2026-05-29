const blockedClaims = ["稳赚", "保证收益", "躺赚", "暴富", "零风险", "月入过万"];

const presets = {
  "普通副业实验": {
    offer: "免费清单或网页小工具",
    signal: "收藏、评论、私信、模板领取",
    angle: "把模糊想法拆成可验证的一周动作"
  },
  "本地门店": {
    offer: "门店活动文案包",
    signal: "老板愿意提供真实场景并试用",
    angle: "帮门店把活动、套餐和回访话术整理清楚"
  },
  "内容创作者": {
    offer: "选题库和复盘表",
    signal: "收藏、转发、主动询问下一期",
    angle: "降低选题和发布前检查的重复劳动"
  },
  "跨境卖家": {
    offer: "商品卖点整理模板",
    signal: "卖家愿意提供一个 SKU 测试",
    angle: "把产品信息整理成更清晰的内容素材"
  },
  "求职简历": {
    offer: "简历项目描述优化表",
    signal: "用户愿意提交一段经历来改写",
    angle: "把经历变成结构清楚、可被筛选的表达"
  }
};

function cleanInput(text) {
  return blockedClaims.reduce((acc, word) => acc.replaceAll(word, "低成本验证"), text);
}

function text(id, fallback) {
  const value = document.querySelector(id)?.value?.trim();
  return cleanInput(value || fallback);
}

function buildTitles(idea, audience, stage, presetName) {
  const preset = presets[presetName] || presets["普通副业实验"];
  return [
    `我准备用7天验证：${idea}是否真的有人需要`,
    `第1个AI实验：先做一个${preset.offer}，看${audience}的真实反馈`,
    `${stage}：今天把${idea}拆成了3个可执行动作`,
    `不先做大产品，我先用一个小工具测试${audience}的需求`,
    `如果只看真实反馈，${idea}第一周该怎么做？`,
    `我把${idea}做成了一个实验，而不是一个口号`,
    `给${audience}的AI行动清单：先验证，再投入`,
    `这次实验可能不成立，所以我先设了3个退出条件`
  ];
}

function buildStructure(idea, audience, presetName) {
  const preset = presets[presetName] || presets["普通副业实验"];
  return [
    `开头：说明我观察到的具体问题，例如“${audience}不是缺工具，而是缺一个能开始的小结构”。`,
    `过程：展示我把“${idea}”拆成了哪些输入、输出和检查项。`,
    `交付：本周先提供${preset.offer}，让用户用最小成本试一次。`,
    `验证：只看${preset.signal}，不拿想象中的需求做判断。`,
    `复盘：记录哪里有用、哪里太泛、下一版要删掉什么。`
  ];
}

function buildValidation(presetName) {
  const preset = presets[presetName] || presets["普通副业实验"];
  return [
    `核心判断：${preset.angle}。`,
    `有效信号：${preset.signal}。`,
    "继续条件：至少出现3个具体反馈，且有人愿意提供真实场景。",
    "停止条件：只有泛泛点赞，没有问题、没有领取、没有试用动作。",
    "下一步：把反馈最多的场景做成更窄的模板或轻服务。"
  ];
}

function buildChecklist() {
  return [
    "不承诺结果，不暗示轻松获得收益。",
    "不发布收款码、手机号、微信号等隐私信息。",
    "不写诱导投资、账号交易、平台违规操作。",
    "不虚构客户、订单、收入或平台数据。",
    "涉及工具时说明适用范围和限制。",
    "正文保留实验口吻，不把个人经验包装成确定结论。"
  ];
}

function section(title, items, ordered = false) {
  const tag = ordered ? "ol" : "ul";
  return `
    <div class="output-section">
      <h3>${title}</h3>
      <${tag}>
        ${items.map((item) => `<li>${item}</li>`).join("")}
      </${tag}>
    </div>
  `;
}

function renderOutput() {
  const idea = text("#idea", "一个AI副业想法");
  const audience = text("#audience", "想低成本尝试AI副业的新手");
  const stage = text("#stage", "启动记录");
  const presetName = text("#preset", "普通副业实验");

  document.querySelector("#output").innerHTML = [
    section("标题候选", buildTitles(idea, audience, stage, presetName), true),
    section("正文骨架", buildStructure(idea, audience, presetName), true),
    section("验证设计", buildValidation(presetName)),
    section("发布前检查", buildChecklist())
  ].join("");
}

document.querySelector("#titleTool").addEventListener("submit", (event) => {
  event.preventDefault();
  renderOutput();
});

renderOutput();
