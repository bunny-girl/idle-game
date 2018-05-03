const state = {
  // list : ['01', '02'],
  // level : {
  //   '01' : 0,
  //   '02' : 0,
  // },
  // status : {
  //   '01' : 0,
  //   '02' : 0,
  // },
  // max : {
  //   '01' : 0,
  //   '02' : 0,
  // },
  skills : [
    {
      id : '001',
      name : 'Skill 01',
      level : 0,
      status : 0,
      max : 100
    },
    {
      id : '002',
      name : 'Skill 02',
      level : 0,
      status : 0,
      max : 100
    }
  ],
  current : '001',
};

const getters = {
  allSkills : state => state.skills,
  currentSkill : state => state.skills.find(item => item.id === state.current)
};

const mutations = {
  addStatusForSkill (state){
    let currentSkill = state.skills.find(item => item.id === state.current);
    currentSkill.status ++;
  }
};


export default {
  state,
  getters,
  mutations,
}
