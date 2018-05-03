<template>
  <ul>
    <li v-for="skill in skills">
      {{skill.name}} : {{skill.status}} / {{skill.max}}
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    name : 'Status',
    computed : mapGetters({
      skills : 'allSkills'
    })
  }
</script>
