import Ability from '../../../api/Abilily'

const state = {
  abilities : [],
};

const getters = {
  abilities: state => state.abilities,
};

const mutations = {
  updateAbilities(state) {
    state.abilities = Ability.getAbilities();
  },

  // addMasteryForAbility(state, ) {
  //
  // }
};

const actions = {
  addMasteryForAbility({state, commit, rootState}){
    let {skills, current} = rootState.skills;
    let {level, abilityId, readyForUpgrade} = skills.find(item => item.id === current) || {level : 0, abilityId : []};

    if(readyForUpgrade === false){

      let upgradeAbilities = [];
      state.abilities.forEach(a => {
        if(abilityId.includes(a.id)){
          a.mastery += level + 1;

          if(a.mastery >= a.max){
            upgradeAbilities.push(a.id);
            // Ability.upgrade(state.abilities, a.id);
          }
        }
      });
      if(upgradeAbilities.length > 0){
        upgradeAbilities.map(a => {
          Ability.upgrade(state.abilities, a);
        });
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
