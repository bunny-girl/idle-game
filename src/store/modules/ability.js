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
};

export default {
  state,
  getters,
  mutations,
}
