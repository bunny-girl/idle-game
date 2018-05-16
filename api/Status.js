import Skill from './Skill';
const BASE = 1, AUTO_FACTOR = 0.1;

const getTotalPower = () => {
  let skillPower = Skill.getSkillPower();
  let click = (BASE + skillPower.addition) * (1 + skillPower.multi);
  let auto = Math.round(AUTO_FACTOR * click * 100) / 100;
  return {
    click,
    auto,
  };
};

export default {
  getTotalPower
}
