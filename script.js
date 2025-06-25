const tasks = [
  { id: 'plank', text: 'プランク100秒', unique: false },
  { id: 'saving', text: '500円貯金', unique: false },
  {
    id: 'roleplay',
    text: 'キャラなりきり: {{age}}歳, 性格: {{personality}}, 属性: {{attribute}}',
    unique: false,
    variables: {
      age: ['10', '15', '20', '25', '30'],
      personality: ['ツンデレ', 'ヤンデレ', 'クール', '元気', 'おっとり'],
      attribute: ['猫耳', 'メイド', 'アイドル', '忍者', '吸血鬼']
    }
  },
  { id: 'pushups', text: '腕立て伏せ20回', unique: false },
  { id: 'sing', text: 'カラオケで1曲熱唱', unique: true },
  { id: 'tweet', text: '禊の様子をTwitterで報告', unique: true },
  { id: 'drawing', text: '30分間お絵描き配信', unique: false }
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
      available.push(...tasks.filter(t => !t.unique));
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

const btn = document.getElementById('drawBtn');
btn.addEventListener('click', () => {
  const count = parseInt(document.getElementById('drawCount').value, 10) || 1;
  const results = draw(count);
  const list = document.getElementById('results');
  list.innerHTML = '';
  results.forEach(text => {
    const li = document.createElement('li');
    li.textContent = text;
    list.appendChild(li);
  });
});
