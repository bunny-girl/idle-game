const _skills = [
  {
    id: '001',
    name: 'Skill 01',
    level: 0,
    status: 0,
    max: 100
  },
  {
    id: '002',
    name: 'Skill 02',
    level: 0,
    status: 0,
    max: 100
  }
];

const getSkills = cb => {
  cb(_skills)
};

export default {
  getSkills,
}
