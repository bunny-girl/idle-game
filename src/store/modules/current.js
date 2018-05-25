const state = {
  coin: 0,
  days: 0,
  totalCoins : 0,
  auto: {
    coin: 0,
    days: 0,
  },
  manual: {
    coin: 0,
    days: 0,
  },
};

const getters = {
  coins: state => state.coin,
  days: state => state.days,
  'currentStatic' :  state => state,
};

const mutations = {
  loadCurrent(state, current) {
    if(current){
      for(let prop in state){
        if(state.hasOwnProperty(prop)){
          state[prop] = current[prop];
        }
      }
    }
  },

  clicker_action(state, payload) {
    state.coin += payload.addition;
    state.coin = Math.round(state.coin * 100) / 100;
    state.days += 1;

    state.totalCoins += payload.addition;

    state[payload.type].days += 1;
    state[payload.type].coin += payload.addition;
  },
  costCoins(state, cost) {
    state.coin -= cost;
  }
};

const actions = {
  clicker_action({state, commit, getters}, isAuto) {
    let type = isAuto ? 'auto' : 'manual';
    let addition = getters.power[type];
    commit('clicker_action', {addition, type});

    if(state.days >= 365 * 1){
      // commit()
    }
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
}
