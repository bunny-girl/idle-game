import ls from 'ls-sl'

const _skills = [
  {
    id: '001',
    level: 0,
    mastery: 0,
  },
  {
    id: '002',
    level: 0,
    mastery: 0,
  }
];

const _skill_data = {
  '001': {
    name : 'Skill 01',
    data: [
      {
        max: 5,
        addition: 0,
        multi: 0,
        unlock: {}
      },
      {
        max: -1,
        addition: 2,
        multi: 0.1,
        unlock: {}
      },
    ]
  },
  '002': {
    name : 'Skill 02',
    data: [
      {
        max: 5,
        addition: 0,
        multi: 0,
        unlock: {}
      },
      {
        max: -1,
        addition: 2,
        multi: 0.1,
        unlock: {}
      }
    ]
  },
};

let currentSkills;

const getSkills = () => {
  currentSkills = _skills.map(s => {
    let cloned;
    let {name, data} = _skill_data[s.id];
    let levelData = data[s.level];
    cloned = {
      id : s.id,
      level : s.level,
      mastery : s.mastery,
      name,
      max : levelData.max,
      addition : levelData.addition,
      multi : levelData.multi,
    };
    return cloned;
  });
  return currentSkills;
};

const getSkillPower = () => {
  let res = {
    addition : 0,
    multi : 0,
  };

  currentSkills.map(({addition, multi}) => {
    res.addition += parseInt(addition) || 0;
    res.multi += parseInt(multi) || 0;
  });
  return res;
};

const initData = (data, cb) => {};

const upgrade = ({skills, current}) => {
  _skills.forEach(skill => {
    let tempSkill = skills.find(({id}) => id === skill.id);
    skill.mastery = tempSkill.mastery;
    skill.level = tempSkill.level;
  });
  let currentSkill = skills.find(({id}) => id === current);
  let currentSkillState = _skills.find(({id}) => id === current);
  currentSkill.mastery -= currentSkill.max;
  currentSkillState.mastery = currentSkill.mastery;
  currentSkillState.level ++;
};

export default {
  getSkills,
  initData,
  upgrade,
  getSkillPower,
}
