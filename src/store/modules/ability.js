import Ability from '../../../api/Abilily'

const state = {
  abilities: [],
};

const AUTO_FACTOR = 0.1;

const getters = {
  abilities: state => state.abilities,
  getAbilityById: (state) => (id) => {
    console.log(id);
    return state.abilities.find(a => a.id === id)
  }
};

const mutations = {
  updateAbilities(state) {
    state.abilities = Ability.getAbilities();
  },
};

const actions = {
  addMasteryForAbility({state, commit, rootState}) {
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
