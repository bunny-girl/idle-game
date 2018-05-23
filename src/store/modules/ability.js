import _ability_data from '../../../data/ability.json'

const state = {
  _abilities: [],
  abilities: [],
};

const AUTO_FACTOR = 0.2;

const getters = {
  abilities: state => {
    return state._abilities.map(a => {
      let {name} = _ability_data[a.id];
      return {
        id: a.id,
        name,
        level: a.level,
        mastery: a.mastery,
        max: Math.pow(10, a.level + 1)
      }
    })
  },

  getAbilityById: (state, getters) => (id) => {
    return getters.abilities.find(a => a.id === id)
  },

  getMasterySumByArr: (state, getters) => (arr) => {
    let sum = 1;
    arr.map(item => {
      let current = getters.abilities.find(data => data.id === item);
      sum += current.level;
    });
    return sum;
  }
};

const mutations = {
  loadAbilities(state) {
    for (let prop in _ability_data) {
      if (_ability_data.hasOwnProperty(prop)) {
        state._abilities.push({
          id: prop,
          level: 0,
          mastery: 0,
        })
      }
    }
  },

  upgradeAbilities(state, upgradeArr) {
    upgradeArr.forEach(up => {
      let current = state._abilities.find(({id}) => id === up.id);
      current.mastery -= up.max;
      current.level++;
    });
  },

  addMasteryForAbility(state, {id, mastery}) {
    let current = state._abilities.find(item => item.id === id);
    current.mastery += mastery;
  }
};

const actions = {
  addMasteryForAbilityCore({state, commit, dispatch, getters}, skills) {
    let upgradeArr = [];
    getters.abilities.forEach(a => {
      if (skills.abilities.includes(a.id)) {
        commit('addMasteryForAbility', {id: a.id, mastery: skills.level + 1});

        if (a.mastery >= a.max) {
          upgradeArr.push({
            id: a.id,
            max: a.max
          })
        }
      }
    });
    if (upgradeArr.length > 0) {
      commit('upgradeAbilities', upgradeArr);
    }
  },
  addMasteryForAbility({state, commit, rootGetters, rootState, dispatch}) {
    let {current} = rootState.skills;
    let skills = rootGetters.skills;
    let currentSkill = skills.find(item => item.id === current) || {level: 0, abilityId: []};
    let {level, abilities} = currentSkill;

    if (currentSkill.readyForUpgrade() === false) {
      dispatch('addMasteryForAbilityCore', {level, abilities})
    }
  },
  addMasteryForAbilityAuto({dispatch}) {
    if (Math.random() < AUTO_FACTOR) {
      dispatch('addMasteryForAbility');
    } else {
      //do nothing.
    }
  },
  training({dispatch}) {
    dispatch('addMasteryForAbilityCore')
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
