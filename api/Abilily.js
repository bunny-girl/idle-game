import _ability_data from '../data/ability.json'

let _ability = [];

const createDefault = () => {
  for(let prop in _ability_data){
    if(_ability_data.hasOwnProperty(prop)){
      _ability.push({
        id: prop,
        level: 0,
        mastery: 0,
      })
    }
  }
};

createDefault();

const getAbilityDetail = abilityArr => {
  let res = {
    nameArr: [],
    masteryAddition: 1
  };

  abilityArr.map(a => {
    let currentData = _ability_data[a];
    let current = _ability.find(data => data.id === a);
    res.nameArr.push(currentData.name);
    res.masteryAddition += current.level;
  });

  return res;
};

const getAbilities = () => {
  return _ability.map(a => {
    let {name} = _ability_data[a.id];
    return {
      id: a.id,
      name,
      level: a.level,
      mastery: a.mastery,
      max : Math.pow(10, a.level + 1)
    }
  })
};

const upgrade = (abilities) => {
  _ability.forEach(a => {
    let tempAbility = abilities.find(({id}) => id === a.id);
    a.mastery = tempAbility.mastery;
    if(a.mastery >= tempAbility.max){
      a.mastery -= tempAbility.max;
      a.level = tempAbility.level + 1;
    }else{
      a.level = tempAbility.level;
    }
  });
};

export default {
  getAbilityDetail,
  getAbilities,
  upgrade,
}
