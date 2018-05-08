<template>
  <ul>
    <li v-for="ability in abilities">
      <span @click="setCurrentSkill(ability.id)">{{ability.name}}</span> : {{ability.mastery}} / {{ability.max}}
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
