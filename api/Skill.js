import Ability from './Abilily'

import _skill_data from '../data/skill';

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
  },
  {
    id: '003',
    level: 0,
    mastery: 0,
  }
];

let currentSkills;

const getSkills = () => {
  currentSkills = _skills.map(s => {
    let cloned;
    let {name, data, abilities, unlock} = _skill_data[s.id];
    let levelData = data[s.level];

    let {masteryAddition} = Ability.getAbilityDetail(abilities);

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
      abilities,
      masteryAddition,
      unlock,
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
