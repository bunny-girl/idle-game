import Ability from '../../../api/Abilily'

const state = {
  abilities: [],
};

const AUTO_FACTOR = 0.1;

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
  addMasteryForAbility({state, commit, rootState, dispatch}) {
    let {skills, current} = rootState.skills;
    let {level, abilities, readyForUpgrade} = skills.find(item => item.id === current) || {level: 0, abilityId: []};

    if (readyForUpgrade === false) {

      let shallUpgrade = false;
      state.abilities.forEach(a => {
        if (abilities.includes(a.id)) {
          a.mastery += level + 1;

          if (a.mastery >= a.max) {
            shallUpgrade = true;
          }
        }
      });
      if (shallUpgrade) {
        Ability.upgrade(state.abilities);
        commit('updateAbilities');
        dispatch('updateSkills');
      }
    }
  },
  addMasteryForAbilityAuto({dispatch}) {
    if (Math.random() < AUTO_FACTOR) {
      dispatch('addMasteryForAbility');
    } else {
      //do nothing.
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
}
