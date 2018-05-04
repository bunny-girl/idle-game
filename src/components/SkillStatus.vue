<template>
  <ul>
    <li v-for="skill in skills">
      <span v-show="skill.id === currentSkill">&gt;</span>
      <span @click="setCurrentSkill(skill.id)">{{skill.name}}</span> : {{skill.mastery}} / {{skill.max}}
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'SkillStatus',
    computed: {
      ...
        mapGetters({
          skills: 'skillList',
          currentSkill: 'currentSkillId'
        })
    },
    methods: {
      ...mapMutations([
        'setCurrentSkill'
      ])
    },
    created() {
      this.$store.commit('updateSkills');
    }
  }
</script>
