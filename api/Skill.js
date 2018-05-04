const _skills = [
  {
    id: '001',
    level: 0,
    status: 0,
  },
  {
    id: '002',
    level: 0,
    status: 0,
  }
];

const _skill_data = {
  '001': {
    name : 'Skill 01',
    data: [
      {
        max: 10,
        addition: 0,
        multi: 0,
        unlock: {}
      },
      {
        max: 20,
        addition: 2,
        multi: 0.1,
        unlock: {}
      }
    ]
  },
  '002': {
    name : 'Skill 02',
    data: [
      {
        max: 11,
        addition: 0,
        multi: 0,
        unlock: {}
      },
      {
        max: 22,
        addition: 2,
        multi: 0.1,
        unlock: {}
      }
    ]
  },
};

const getSkills = () => {
  return _skills.map(s => {
    let cloned;
    let {name, data} = _skill_data[s.id];
    let levelData = data[s.level];
    cloned = {
      id : s.id,
      level : s.level,
      status : s.status,
      name,
      max : levelData.max,
      addition : levelData.addition,
      multi : levelData.multi,
    };
    return cloned;
  });
};

const initData = (data, cb) => {};

export default {
  getSkills,
  initData,
}
