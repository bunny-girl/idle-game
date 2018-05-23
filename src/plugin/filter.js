let yearFromDays = days => {
  if(typeof days === 'number'){
    // console.log(days);
    let year = Math.floor(days / 365);
    let day = days % 365;
    return `${year} 年 ${day} 天`
  }
};

export {
  yearFromDays,
}
