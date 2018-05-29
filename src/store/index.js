import Vue from 'vue'
import Vuex from 'vuex'
import skills from './modules/skills'
import current from './modules/current'
import ability from './modules/ability'
import training from './modules/training'
import Helper from 'ls-sl'

Vue.use(Vuex);

let res;

export default new Vuex.Store({
  modules:{
    skills,
    current,
    ability,
    training,
  },
  // plugins:[saveloader],
  actions:{
    loadGame({state, dispatch, commit}){
      let gameData = JSON.parse(Helper.load('idle_data')) || {};
      commit('loadSkills', gameData.skills);
      commit('loadAbilities', gameData.ability);
      commit('loadCurrent', gameData.current);
      dispatch('loadTraining', gameData.training);
    },
    saveGame({state}){
      let res = Helper.save("idle_data", state);
      console.log(res);
      console.log('Game saved');
    },
    clearGame({}){
      Helper.clear('idle_data');
      location.reload();
    }
  }
})
