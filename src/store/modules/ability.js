import Ability from '../../../api/Abilily'

const state = {
  abilities: [],
};

const getters = {
  abilities: state => state.abilities,
};

const mutations = {
  updateAbilities(state) {
    state.abilities = Ability.getAbilities();
  },
};

const actions = {
  addMasteryForAbility({state, commit, rootState}) {
    let {skills, current} = rootState.skills;
    let {level, abilityId, readyForUpgrade} = skills.find(item => item.id === current) || {level: 0, abilityId: []};

    if (readyForUpgrade === false) {

      let shallUpgrade = false;
      state.abilities.forEach(a => {
        if (abilityId.includes(a.id)) {
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

  }
};

export default {
  state,
  getters,
  mutations,
  actions,
}
