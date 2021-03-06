import _skill_data from '../../../data/skill';

const BASE = 1, AUTO_FACTOR = 1, MANUAL_FACTOR = 0.3, AUTO_RATE = 0.3, MANUAL_RATE = 0.3;

const state = {
  _skill: [],
  current: 's001',
};

const getters = {
  skills: (state) => {
    return state._skill.map(s => {
      let cloned;
      let {name, data, abilities, unlock, rank} = _skill_data[s.id];
      let levelData = data[s.level];

      cloned = {
        id: s.id,
        level: s.level,
        mastery: s.mastery,
        name,
        max: levelData.max,
        addition: levelData.addition,
        multi: levelData.multi,
        title: levelData.title,
        cost: levelData.cost,
        abilities,
        unlock,
        rank,
        readyForUpgrade: function () {
          return this.mastery >= this.max && this.max > 0
        }
      };
      return cloned;
    });
  },

  getSkillById: (state, getters) => (id) => {
    return getters.skills.find(item => item.id === id)
  },

  currentSkillId: state => state.current,

  currentSkill: (state, getters) => {
    return getters.skills.find(item => item.id === state.current)
  },

  skillPower: (state, getters) => {
    let res = {
      addition: 0,
      multi: 0,
    };

    getters.skills.map(({addition, multi}) => {
      res.addition += parseInt(addition) || 0;
      res.multi += parseInt(multi) || 0;
    });

    return res;
  },

  power: (state, getters) => {
    let skillPower = getters.skillPower;
    let base = (BASE + skillPower.addition) * (1 + skillPower.multi);
    let manual = Math.round(MANUAL_FACTOR * base * 100) / 100;
    let auto = Math.round(AUTO_FACTOR * base * 100) / 100;

    return {
      manual,
      auto,
    };
  }
};

const mutations = {
  loadSkills(state, skills) {
    if (skills) {
      for (let prop in state) {
        if (state.hasOwnProperty(prop)) {
          state[prop] = skills[prop];
        }
      }
    } else {
      for (let prop in _skill_data) {
        if (_skill_data.hasOwnProperty(prop)) {
          state._skill.push({
            id: prop,
            level: 0,
            mastery: 0,
          })
        }
      }

      state.current = state._skill[0].id;
    }
  },

  upgradeSkills(state, {id, max}) {
    let current = state._skill.find(item => item.id === id);
    current.mastery -= max;
    current.level++;
  },

  addMasteryForSkill(state, skill) {
    let current = state._skill.find(item => item.id === skill.id);
    current.mastery += skill.mastery;
  },

  setCurrentSkill(state, payload) {
    state.current = payload.skillId;
  }
};

const actions = {
  addMasteryForSkillCore({commit, state}, payload) {
    commit('addMasteryForSkill', payload);
  },

  addMasteryForSkill({commit, state, getters, rootGetters, dispatch}, payload) {
    let current;
    current = (payload && payload.id) ? getters.getSkillById(payload.id) : getters.currentSkill;
    if (!current.readyForUpgrade()) {
      let mastery =
        (payload && payload.mastery) ?
          payload.mastery :
          rootGetters.getMasterySumByArr(current.abilities);
      mastery = Math.min(mastery, current.max - current.mastery);
      dispatch('addMasteryForSkillCore', {
        mastery,
        id: (payload && payload.id) ? payload.id : state.current
      })
    }
  },

  addMasteryForSkillAuto({commit, state, dispatch}) {
    if (Math.random() < AUTO_RATE) {
      dispatch('addMasteryForSkill');
    } else {
      //do nothing.
    }
  },

  addMasteryForSkillManual({commit, state, dispatch}) {
    if (Math.random() < MANUAL_RATE) {
      dispatch('addMasteryForSkill');
    } else {
      //do nothing.
    }
  },

  upgradeSkill({commit, state}, skill) {
    commit('costCoins', skill.cost);
    commit('upgradeSkills', {
      id: skill.id,
      max: skill.max
    })
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
}
