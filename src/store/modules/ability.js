import Ability from '../../../api/Abilily'

const state = {
  abilities: [],
};

const AUTO_FACTOR = 0.2;

const getters = {
  abilities: state => state.abilities,
  getAbilityById: (state) => (id) => {
    return state.abilities.find(a => a.id === id)
  },
  getMasterySumByArr : (state) => (arr) => {
    let sum = 1;
    arr.map(item => {
      let current = state.abilities.find(data => data.id === item);
      sum += current.level;
    });
    return sum;
  }
};

const mutations = {
  updateAbilities(state) {
    state.abilities = Ability.getAbilities();
  },
};

const actions = {
  addMasteryForAbilityCore({state, commit, dispatch}, skills){
    let shallUpgrade = false;
    state.abilities.forEach(a => {
      if (skills.abilities.includes(a.id)) {
        a.mastery += skills.level + 1;

        if (a.mastery >= a.max) {
          shallUpgrade = true;
        }
      }
    });
    if (shallUpgrade) {
      Ability.upgrade(state.abilities);
      commit('updateAbilities');
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
  training({dispatch}){
    dispatch('addMasteryForAbilityCore')
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
