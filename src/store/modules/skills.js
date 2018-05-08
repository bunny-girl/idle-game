import Skill from '../../../api/Skill'

let currentSkill;

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
    currentSkill.mastery++;
  },

  setCurrentSkill(state, skillId) {
    state.current = skillId;
    currentSkill = state.skills.find(item => item.id === state.current);
  },
};

const actions = {
  addMasteryForSkill({commit, state}){
    commit('addMasteryForSkill');

    if (currentSkill.max > 0 && currentSkill.mastery >= currentSkill.max) {
      Skill.upgrade(state);
      commit('updateSkills');
      commit('updatePower');
    }
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
