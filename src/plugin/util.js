import _ from 'lodash';

const randomPick = (arr, num = 1) => {
  let res = null;

  if(isArray(arr)){
    let tempArr = _.clone(arr);
    res = tempArr.sort(() => {return Math.random() > 0.5}).slice(0, num);
  }

  return res;
};

const isArray = obj => {
  return Object.prototype.toString.call(obj) === '[object Array]';
};

export {
  randomPick,
  isArray,
}
