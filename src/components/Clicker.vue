<template>
  <el-button @click="click_action" type="primary">干活</el-button>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'
  export default {
    name : 'Clicker',
    methods : {
      click_action(){
        this.$store.commit('clicker_action');
        this.$store.dispatch('addMasteryForAbility');
        this.$store.dispatch('addMasteryForSkill');
      }
    }
  }
</script>
