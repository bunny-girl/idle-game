import Vue from 'vue'
import Vuex from 'vuex'
import skills from './modules/skills'
import current from './modules/current'
import saveloader from '../plugin/saveloader'

Vue.use(Vuex);

export default new Vuex.Store({
  modules:{
    skills,
    current,
  },
  plugins:[saveloader]
})
