<template>
  <div>
    <skill-status v-for="skill in skills" :skill-data="skill" :key="skill.id"></skill-status>
  </div>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'
  import SkillStatus from './SkillStatus'

  export default {
    name: 'SkillPanel',
    components: {SkillStatus},
    computed: {
      ...
        mapGetters(['skills']),
    }
  }
</script>
