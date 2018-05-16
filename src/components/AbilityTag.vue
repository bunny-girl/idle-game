<template>
  <el-tag type="info">{{ability.name}} {{ability.level + 1}}</el-tag>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: "AbilityTag",
    props: ['ability-id'],
    computed: {
      ability(){
        return this.$store.getters.getAbilityById(this.abilityId)
      }
    }
  }
</script>

<style scoped>

</style>
