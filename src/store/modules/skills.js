import Skill from '../../../api/Skill'

let currentSkill, masteryAddition;

const BASE = 1, AUTO_FACTOR = 0.2;

const state = {
  skills: [],
  current: 's001',
};

const getters = {
  skillList: state => state.skills,
  currentSkillId: state => state.current,
  currentSkill : state => {
    state.skills.find(item => item.id === state.current)
  },
  skillPower: (state) => {
    let res = {
      addition: 0,
      multi: 0,
    };

    state.skills.map(({addition, multi}) => {
      res.addition += parseInt(addition) || 0;
      res.multi += parseInt(multi) || 0;
    });

    return res;
  },
  power: (state, getters) => {
    let skillPower = getters.skillPower;
    let manual = (BASE + skillPower.addition) * (1 + skillPower.multi);
    let auto = Math.round(AUTO_FACTOR * manual * 100) / 100;

    return {
      manual,
      auto,
    };
  }
};

const mutations = {
  updateSkills(state) {
    state.skills = Skill.getSkills();
    currentSkill = state.skills.find(item => item.id === state.current);
  },

  addMasteryForSkill(state) {
    currentSkill.mastery += currentSkill.masteryAddition;
    currentSkill.mastery = Math.min(currentSkill.mastery, currentSkill.max);
  },

  setCurrentSkill(state, payload) {
    state.current = payload.skillId;
    currentSkill = state.skills.find(item => item.id === state.current);
  },

  couldUpgrade(state) {
    currentSkill.readyForUpgrade = true;
  }
};

const actions = {
  addMasteryForSkill({commit, state}) {
    if (!currentSkill.readyForUpgrade) {
      commit('addMasteryForSkill');

      if (currentSkill.max > 0 && currentSkill.mastery >= currentSkill.max) {
        commit('couldUpgrade');
      }
    }
  },

  updateSkills({commit, state}) {
    Skill.syncSkill(state.skills);
    commit('updateSkills');
  },

  addMasteryForSkillAuto({commit, state, dispatch}) {
    if (Math.random() < AUTO_FACTOR) {
      dispatch('addMasteryForSkill');
    } else {
      //do nothing.
    }
  },

  upgradeSkill({commit, state}, skill) {
    commit('costCoins', skill.cost);
    Skill.upgrade(state.skills, skill.id);
    commit('updateSkills');
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
}
