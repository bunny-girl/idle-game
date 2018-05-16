import Skill from '../../../api/Skill'

let currentSkill, masteryAddition;

const AUTO_FACTOR = 0.1;

const state = {
  skills: [],
  current: '001',
};

const getters = {
  skillList: state => state.skills,
  currentSkillId: state => state.current,
};

const mutations = {
  updateSkills(state) {
    state.skills = Skill.getSkills();
    currentSkill = state.skills.find(item => item.id === state.current);
  },

  addMasteryForSkill(state) {
    currentSkill.mastery += currentSkill.masteryAddition;
  },

  setCurrentSkill(state, skillId) {
    state.current = skillId;
    currentSkill = state.skills.find(item => item.id === state.current);
  },

  couldUpgrade(state) {
    currentSkill.readyForUpgrade = true;
  }
};

const actions = {
  addMasteryForSkill({commit, state}) {
    if(!currentSkill.readyForUpgrade){
      commit('addMasteryForSkill');

      if (currentSkill.max > 0 && currentSkill.mastery >= currentSkill.max) {
        commit('couldUpgrade');
      }
    }
  },

  addMasteryForSkillAuto({commit, state, dispatch}) {
    if(Math.random() > AUTO_FACTOR){
      dispatch('addMasteryForSkill');
    }else{
      //do nothing.
    }
  },

  upgradeSkill({commit, state}, skill){
    commit('costCoins', skill.cost);
    Skill.upgrade(state.skills, skill.id);
    commit('updateSkills');
    commit('updatePower');
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
