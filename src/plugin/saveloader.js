const _ = require('lodash');

const saveloader = store => {
  store.subscribe((mutation, state) => {
    // let currentState = _.cloneDeep(state);
    // console.log(currentState);
  })
};

export default saveloader
