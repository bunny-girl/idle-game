import Ability from './Abilily'

import _skill_data from '../data/skill';

const _skills = [];

const createDefault = () => {
  for(let prop in _skill_data){
    if(_skill_data.hasOwnProperty(prop)){
      _skills.push({
        id: prop,
        level: 0,
        mastery: 0,
      })
    }
  }
};

createDefault();

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
  syncSkill(skills);
  let currentSkill = skills.find(({id}) => id === current);
  let currentSkillState = _skills.find(({id}) => id === current);
  currentSkill.mastery -= currentSkill.max;
  currentSkillState.mastery = currentSkill.mastery;
  currentSkillState.level++;
};

const syncSkill = (skills) => {
  _skills.forEach(skill => {
    let tempSkill = skills.find(({id}) => id === skill.id);
    skill.mastery = tempSkill.mastery;
    skill.level = tempSkill.level;
  });
}

export default {
  getSkills,
  initData,
  upgrade,
  getSkillPower,
  syncSkill,
}
