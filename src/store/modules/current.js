import Status from '../../../api/Status';

const state = {
  coin: 0,
  click: 0,
  auto: 0,
};

const getters = {
  coins: state => state.coin,
  click: state => state.click,
  auto: state => state.auto,
};

const mutations = {
  clicker_action(state) {
    state.coin += state.click;
  },
  updatePower(state){
    let power = Status.getTotalPower();
    state.click = power.click;
    state.auto = power.auto;
  },
  costCoins(state, cost){
    state.coin -= cost;
  }
};

const actions = {};

export default {
  state,
  getters,
  mutations,
}
