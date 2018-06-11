import {randomPick} from '../../plugin/util';

const LEVEL_DATA = [
  {
    lvl: 0,
    title: '入门',
    cost: 88,
    timeLeft: 30,
  },
  {
    lvl: 0,
    title: '初级',
    cost: 888,
    timeLeft: 90,
  },
  {
    lvl: 0,
    title: '中级',
    cost: 8888,
    timeLeft: 365,
  },
];

const getLevel = () => {
  return randomPick(LEVEL_DATA, 1)[0];
};

const state = {
  current: {
    id: '',
    type: '',
    level: '',
    title: '',
    timeLeft: 0,
  },
  isStopped: false,
  listRefreshTime: 30,
  trainingList: [],
};

const getters = {};

const mutations = {

  train(state) {
    state.current.timeLeft -= 1;
  },

  refreshCountDown(state){
    state.listRefreshTime -= 1;
  },

  finishTraining(state) {
    state.current = {
      id: '',
      type: '',
      level: '',
      title: '',
      timeLeft: 0,
    };
  },

  getTrainingList(state, list) {
    state.trainingList = list;
    state.listRefreshTime = 30;
  },

  registerTrainingItem(state, item) {
    state.current.id = item.id;
    state.current.type = item.type;
    state.current.level = item.level;
    state.current.title = item.title;
    state.current.timeLeft = item.timeLeft;
  },
};

const actions = {
  loadTraining({state, dispatch}, training) {
    if (training) {
      for (let prop in state) {
        if (state.hasOwnProperty(prop)) {
          state[prop] = training[prop];
        }
      }
    } else {
      dispatch('getTrainingList');
    }
  },

  registerTrainingItem({state, commit}, item) {
    //todo Confirm;
    commit('costCoins', item.cost);
    commit('registerTrainingItem', item);
  },

  train({state, dispatch, commit}, isOT = false) {
    if(!isOT){
      commit('refreshCountDown');
    }

    if (state.current && state.current.id && state.current.type && state.current.timeLeft > 0) {
      let mastery = 0;//todo
      if (state.current.type === 'skill') {
        dispatch('addMasteryForSkill', {id: state.current.id, mastery});
      }
      if (state.current.type === 'ability') {
        dispatch('addMasteryForAbilityCore', {level: mastery, abilities: [state.current.id]});
      }

      commit('train');

      if (state.current.timeLeft === 0) {
        commit('finishTraining')
      }

      if (state.listRefreshTime === 0) {
        dispatch('getTrainingList')
      }
    }
  },

  overTimeTraining({state, dispatch}){
    dispatch('train', true);
  },

  getTrainingList({state, commit, rootGetters}) {
    let skills = rootGetters.skills;
    let abilities = rootGetters.abilities;

    let skill = randomPick(skills, 2);
    let ability = randomPick(abilities, 2);

    let res = [];

    skill.map(s => {
      let data = getLevel();
      res.push({
        id: s.id,
        type: 'skill',
        level: data.lvl,
        title: `${data.title}${s.name}培训`,
        cost: data.cost,
        timeLeft: data.timeLeft,
      })
    });

    ability.map(a => {
      let data = getLevel();
      res.push({
        id: a.id,
        type: 'ability',
        level: data.lvl,
        title: `${data.title}${a.name}培训`,
        cost: data.cost,
        timeLeft: data.timeLeft,
      })
    });

    commit('getTrainingList', res);
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
}
