import Skill from './Skill';
const BASE = 1;

const getTotalPower = () => {
  let skillPower = Skill.getSkillPower();
  let click = (BASE + skillPower.addition) * (1 + skillPower.multi);
  let auto = 0;
  return {
    click,
    auto,
  };
};

export default {
  getTotalPower
}
