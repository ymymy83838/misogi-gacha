const tasks = [
  {
    id: "plank",
    text: "プランク{{time}}秒",
    unique: false,
    variables: {
      time: ["90", "120", "150"],
    },
  },
  {
    id: "legrays",
    text: "レッグレイズ{{time}}秒",
    unique: false,
    variables: {
      time: ["90", "120", "150"],
    },
  },
  // {
  //   id: 'rope',
  //   text: 'なわとび{{time}}回',
  //   unique: false,
  //   variables: {
  //     time: ['50', '100', '200'],
  //   },
  // },
  {
    id: "squat",
    text: "スクワット{{time}}回",
    unique: false,
    variables: {
      time: ["10", "20", "30"],
    },
  },
  {
    id: "saving",
    text: "同居人貯金{{amount}}円",
    unique: false,
    variables: {
      amount: ["100", "300", "500"],
    },
  },
  {
    id: "sing",
    text: "歌配信でリクエスト曲を歌う(コメント欄で募集)",
    unique: false,
  },
  {
    id: "dispose",
    text: "服・靴・バッグ・帽子等を1つ捨てる",
    unique: false,
  },
  {
    id: "monomane",
    text: "モノマネを1つ新たに習得する",
    unique: true,
  },
  {
    id: "roleplay",
    text: "キャラなりきり10分: {{age}}歳/{{attribute}}/{{personality}}",
    unique: true,
    variables: {
      age: ["5", "10", "15", "20", "25", "30", "45", "80"],
      attribute: [
        "猫",
        "犬",
        "メイド",
        "アイドル",
        "新人アイドル",
        "吸血鬼",
        "妖精",
        "鬼",
        "天使",
        "悪魔",
        "学生",
        "教師",
        "宇宙人",
        "幼女",
        "老人",
        "双子",
        "AI",
        "異世界人",
        "歌姫",
        "勇者",
        "魔王",
        "騎士",
        "魔族",
        "神様",
        "女神",
        "錬金術師",
        "幻獣",
        "獣人",
        "スライム",
        "半分機械",
        "精霊",
        "妖怪",
        "貴族",
        "王族",
        "王子",
        "王女",
        "勇者",
        "僧侶",
        "商人",
        "海賊",
        "兵士",
        "侍",
        "剣士",
        "狩人",
        "賢者",
        "盗賊",
        "料理人",
        "科学者",
        "研究者",
        "医者",
        "看護師",
        "探偵",
        "刑事",
        "魔法使い",
        "旅人",
        "守護者",
        "病弱",
        "元悪役",
        "記憶喪失",
        "異世界転生者",
        "殺人鬼",
        "ストーカー",
        "ハッカー",
        "占い師",
        "バンドマン",
        "営業マン",
        "同居人",
      ],
      personality: [
        "ツンデレ",
        "ヤンデレ",
        "クール",
        "元気",
        "おっとり",
        "真面目",
        "ドジっ子",
        "サイコパス",
        "毒舌",
        "お姉さん系",
        "お兄さん系",
        "小悪魔",
        "無口",
        "テンション高い",
        "ギャグキャラ",
        "ネガティブ",
        "照れ屋",
        "甘えん坊",
        "キザ",
        "天然",
        "熱血",
        "冷静沈着",
        "お調子者",
        "ひねくれ者",
        "陽キャ",
        "陰キャ",
        "純粋",
        "現実主義",
        "理想主義",
        "人見知り",
        "博愛主義",
        "慎重",
        "楽観主義",
        "野心家",
        "依存系",
        "サバサバ系",
        "天真爛漫",
        "妄想家",
        "世話焼き",
        "無関心",
        "怒りっぽい",
        "泣き虫",
        "落ち着きがない",
        "二重人格",
        "ポンコツ",
        "天才肌",
        "不思議ちゃん",
        "潔癖症",
        "中二病",
        "シスコン",
        "ブラコン",
        "ストイック",
        "皮肉屋",
        "芸術家肌",
        "自信過剰",
        "無感情",
        "やる気ゼロ",
      ],
    },
  },
];

function randomFrom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillVariables(task) {
  let text = task.text;
  if (task.variables) {
    for (const [key, options] of Object.entries(task.variables)) {
      text = text.replace(`{{${key}}}`, randomFrom(options));
    }
  }
  return text;
}

function draw(count) {
  const available = tasks.slice();
  const results = [];

  for (let i = 0; i < count; i++) {
    // if unique tasks are exhausted, replenish with non-unique ones
    if (available.length === 0) {
      available.push(...tasks.filter((t) => !t.unique));
    }

    const idx = Math.floor(Math.random() * available.length);
    const task = available[idx];
    if (task.unique) {
      available.splice(idx, 1);
    }
    results.push(fillVariables(task));
  }

  return results;
}

const btn = document.getElementById("drawBtn");
btn.addEventListener("click", () => {
  const count = parseInt(document.getElementById("drawCount").value, 10) || 1;
  const results = draw(count);
  const list = document.getElementById("results");
  list.innerHTML = "";
  results.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    list.appendChild(li);
  });
});
