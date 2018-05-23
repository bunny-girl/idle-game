const state = {
  coin: 0,
  days: 0,
  auto : {
    coin : 0,
    days : 0,
  },
  manual : {
    coin : 0,
    days : 0,
  },
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

    state[type].days += 1;
    state[type].coin += payload.addition;
  },
  costCoins(state, cost) {
    state.coin -= cost;
  }
};

const actions = {
  clicker_action({state, commit, getters}, isAuto){
    let type = isAuto ? 'auto' : 'manual';
    let addition = getters.power[type];
    commit('clicker_action', {addition, type})
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
