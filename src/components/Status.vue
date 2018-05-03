<template>
  <ul>
    <li v-for="skill in skills">
      <span v-show="skill.id === currentSkill">&gt;</span>
      <span @click="setCurrentSkill(skill.id)">{{skill.name}}</span> : {{skill.status}} / {{skill.max}}
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    name : 'Status',
    computed : mapGetters({
      skills : 'allSkills',
      currentSkill : 'currentSkillId'
    }),
    methods : {
      ...mapMutations([
        'setCurrentSkill'
      ])
    },
    created () {
      this.$store.dispatch('getAllSkills')
    }
  }
</script>
