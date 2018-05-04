<template>
  <button @click="click_action">Click</button>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    name : 'Clicker',
    methods : {
      click_action(){
        this.$store.commit('clicker_action');
        this.$store.dispatch('addMasteryForSkill');
      }
    }
  }
</script>
