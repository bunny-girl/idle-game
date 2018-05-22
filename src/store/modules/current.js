const state = {
  coin: 0,
  days: 0,
};

const getters = {
  coins: state => state.coin,
  time: state => {
    return {
      year: Math.floor(state.days / 365),
      day: state.days % 365,
    }
  }
};

const mutations = {
  clicker_action(state, payload) {
    state.coin += payload.addition;
    state.coin = Math.round(state.coin * 100) / 100;
    state.days += 1;
  },
  costCoins(state, cost) {
    state.coin -= cost;
  }
};

const actions = {
  clicker_action({state, commit, getters}){
    let {click : addition} = getters.power;
    commit('clicker_action', {addition})
  },
  clicker_action_auto({state, commit, getters}){
    let {auto : addition} = getters.power;
    commit('clicker_action', {addition})
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
