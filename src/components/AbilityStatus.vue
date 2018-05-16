<template>
  <ul>
    <li v-for="ability in abilities">
      <el-progress :percentage="Math.round(ability.mastery / ability.max * 100)" :show-text="false"></el-progress>
      <span>{{ability.name}} @ {{ability.level + 1}}</span> : {{ability.mastery}} / {{ability.max}}
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'AbilityStatus',
    computed: {
      ...
        mapGetters({
          abilities: 'abilities'
        })
    },
    methods: {}
  }
</script>

<style>

</style>
