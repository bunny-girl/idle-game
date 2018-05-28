const state = {
  current : {
    id : '',
    type : '',
    level : '',
    timeLeft : 0,
  },
  listRefreshTime : '',
  trainingList : [],
};

const getters = {
  currentTraining(){},
};

const mutations = {
  train(state){
    state.current.timeLeft -= 1;
  },

  finishTraining(state){
    state.current = {
      id : '',
      type : '',
      level : '',
      timeLeft : 0,
    };
  }
};

const actions = {
  train({state, dispatch, commit}){
    if(state.current && state.current.id && state.current.type && state.current.level && state.current.timeLeft > 0){
      let mastery = 0;//todo
      if(state.current.type === 'skill'){
        dispatch('addMasteryForSkillCore', {id : state.current.id, mastery });
      }
      if(state.current.type === 'ability'){
        dispatch('addMasteryForAbilityCore', {level : mastery, abilities : [state.current.id]});
      }
      commit('train');

      if(state.current.timeLeft === 0){
        commit('finishTraining')
      }
    }
  },

  // getTrainingList({state, commit, rootGetter}){
  //   let skills = rootGetter
  // }
};

export default {
  state,
  getters,
  mutations,
  actions,
}
