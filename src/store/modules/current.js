const state = {
  coin: 0,
};

const getters = {
  coins : state => state.coin
  // allSkills : state => state.skills
};

const mutations = {
  clicker_action(state) {
    state.coin++;
  }
};


export default {
  state,
  getters,
  mutations,
}
