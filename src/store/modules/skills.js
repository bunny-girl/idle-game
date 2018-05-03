import Skill from '../../../api/Skill'

const state = {
  skills : [],
  current : '001',
};

const getters = {
  allSkills : state => state.skills,
  currentSkillId : state => state.current,
  // currentSkill : state => state.skills.find(item => item.id === state.current)
};

const mutations = {
  setSkills (state, skills) {
    state.skills = skills;
  },
  addStatusForSkill (state){
    let currentSkill = state.skills.find(item => item.id === state.current);
    currentSkill.status ++;
  },
  setCurrentSkill (state, skillId){
    state.current = skillId;
  }
};

const actions = {
  getAllSkills ({commit}) {
    Skill.getSkills(skills => {
      commit('setSkills', skills)
    })
  }
};

export default {
  state,
  actions,
  getters,
  mutations,
}
