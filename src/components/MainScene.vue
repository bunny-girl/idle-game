<template>
  <el-row>
    <el-col :span="12">
      <div class="grid-content bg-purple">
        <Coin></Coin>
        <Clicker></Clicker>
        <status></status>
      </div>
    </el-col>
    <el-col :span="12">
      <div class="grid-content bg-purple-light">
        <el-tabs type="border-card">
          <el-tab-pane label="技能">
            <SkillStatus></SkillStatus>
          </el-tab-pane>
          <el-tab-pane label="属性">
            <ability-status></ability-status>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
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
