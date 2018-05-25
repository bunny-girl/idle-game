const fs = require('fs'),
  parser = require('papaparse');


const getContent = path => {
  let content = fs.readFileSync(path, 'utf-8');

  content = content.replace(/\sid/, 'id');

  return parser.parse(content, {header: true, trimHeader: true});
};

let {data: data_main} = getContent('./skill_data.csv');

let {data: data_sub} = getContent('./skill_level.csv');

let obj = {};

const getLevels = str => {
  if (!str.includes('#')) {
    return [];
  }
  let arr = str.split(';');
  let res = [];
  arr.map(item => {
    if (!item.includes('#')) {
      return;
    }
    let props = item.split('#');
    res.push({
      id : props[0],
      level : props[1]
    })
      // [props[0]] = {level: props[1]};
  });
  return res;
};

data_main.map(data => {
  obj[data.id] = {
    name: data.name,
    abilities: data.abilities.split(';'),
    unlock: {
      ability: getLevels(data.unlock_ability),
      skill: getLevels(data.unlock_skill),
      coin : data.coin ? parseInt(data.coin) : 0,
    },
    rank : data.rank,
    data : [],
  };
});

data_sub.map(data => {
  obj[data.id].data.push(data);
});

fs.writeFileSync('skill.json', JSON.stringify(obj));

let abilities = fs.readFileSync('./ability.csv', 'utf-8').split('\n').map(item => item.replace('\r', ''));

let res = {};

abilities.map((item, index) => {
  res['a' + (index + 1 + '').padStart(3, '0')] = {
    name : item
  }
});

fs.writeFileSync('ability.json', JSON.stringify(res));
