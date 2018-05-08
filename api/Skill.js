import Ability from './Abilily'

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
    name: 'Skill 01',
    abilities: [
      '001', '003'
    ],
    data: [
      {
        max: 5,
        addition: 0,
        multi: 0,
        unlock: {},
        cost: 5,
        title: '新手'
      },
      {
        max: -1,
        addition: 2,
        multi: 0.1,
        unlock: {},
        title: '入门'
      },
    ]
  },
  '002': {
    name: 'Skill 02',
    abilities: [
      '001', '002'
    ],
    data: [
      {
        max: 5,
        addition: 0,
        multi: 0,
        unlock: {},
        cost: 20,
        title: '新手'
      },
      {
        max: -1,
        addition: 2,
        multi: 0.1,
        unlock: {},
        title: '入门'
      }
    ]
  },
};

let currentSkills;

const getSkills = () => {
  currentSkills = _skills.map(s => {
    let cloned;
    let {name, data, abilities} = _skill_data[s.id];
    let levelData = data[s.level];

    let {nameArr: abilityList, masteryAddition} = Ability.getAbilityDetail(abilities);

    cloned = {
      id: s.id,
      level: s.level,
      mastery: s.mastery,
      name,
      max: levelData.max,
      addition: levelData.addition,
      multi: levelData.multi,
      title: levelData.title,
      readyForUpgrade: s.mastery >= levelData.max && levelData.max > 0,
      cost: levelData.cost,
      abilities: abilityList,
      masteryAddition,
    };
    return cloned;
  });
  return currentSkills;
};

const getSkillPower = () => {
  let res = {
    addition: 0,
    multi: 0,
  };

  currentSkills.map(({addition, multi}) => {
    res.addition += parseInt(addition) || 0;
    res.multi += parseInt(multi) || 0;
  });
  return res;
};

const initData = (data, cb) => {
};

const upgrade = (skills, current) => {
  _skills.forEach(skill => {
    let tempSkill = skills.find(({id}) => id === skill.id);
    skill.mastery = tempSkill.mastery;
    skill.level = tempSkill.level;
  });
  let currentSkill = skills.find(({id}) => id === current);
  let currentSkillState = _skills.find(({id}) => id === current);
  currentSkill.mastery -= currentSkill.max;
  currentSkillState.mastery = currentSkill.mastery;
  currentSkillState.level++;
};

export default {
  getSkills,
  initData,
  upgrade,
  getSkillPower,
}
