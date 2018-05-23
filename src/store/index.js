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
    loadGame({state}){
      console.log(state);
      console.log(Helper.load('idle_data'))
    }
  }
})
