import Status from '../../../api/Status';

const state = {
  coin: 0,
  click: 0,
  auto: 0,
  days: 0,
};

const getters = {
  coins: state => state.coin,
  click: state => state.click,
  auto: state => state.auto,
  time: state => {
    return {
      year: Math.floor(state.days / 365),
      day: state.days % 365,
    }
  }
};

const mutations = {
  clicker_action(state) {
    state.coin += state.click;
    state.coin = Math.round(state.coin * 100) / 100;
    state.days += 1;
  },
  clicker_action_auto(state) {
    state.coin += state.auto;
    state.coin = Math.round(state.coin * 100) / 100;
    state.days += 1;
  },
  updatePower(state) {
    let power = Status.getTotalPower();
    state.click = power.click;
    state.auto = power.auto;
  },
  costCoins(state, cost) {
    state.coin -= cost;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
}
