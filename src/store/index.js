import Vue from 'vue'
import Vuex from 'vuex'
import skills from './modules/skills'
import current from './modules/current'
import ability from './modules/ability'
import Helper from 'ls-sl'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    skills,
    current,
    ability,
  },
  // plugins:[saveloader],
  actions:{
    loadGame({state, dispatch, commit}){
      let gameData = JSON.parse(Helper.load('idle_data')) || {};
      commit('loadSkills', gameData.skills);
      commit('loadAbilities', gameData.ability);
      commit('loadCurrent', gameData.current);
    },
    saveGame({state}){
      let res = Helper.save("idle_data", state);
      console.log(res);
      console.log('Game saved');
    }
  }
})
