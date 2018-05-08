<template>
  <div>
    <Coin></Coin>
    <Clicker></Clicker>
    <status></status>
    <SkillStatus></SkillStatus>
    <ability-status></ability-status>
  </div>
</template>

<script>
  import Coin from './Coin.vue'
  import Clicker from './Clicker.vue'
  import SkillStatus from './SkillStatus.vue'
  import Status from './Status.vue'
  import AbilityStatus from './AbilityStatus.vue'

  export default {
    name: 'HelloWorld',
    components: {
      Coin,
      Clicker,
      SkillStatus,
      Status,
      AbilityStatus,
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    },
    created() {
      this.$store.commit('updateSkills');
      this.$store.commit('updateAbilities');
      this.$store.commit('updatePower');
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
