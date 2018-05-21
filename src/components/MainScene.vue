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
            <skill-panel></skill-panel>
          </el-tab-pane>
          <el-tab-pane label="属性">
            <ability-status></ability-status>
          </el-tab-pane>
          <el-tab-pane label="培训">
            建设中
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import Coin from './Coin.vue'
  import Clicker from './Clicker.vue'
  import SkillPanel from './SkillPanel.vue'
  import Status from './Status.vue'
  import AbilityStatus from './AbilityStatus.vue'

  export default {
    name: 'HelloWorld',
    components: {
      Coin,
      Clicker,
      SkillPanel,
      Status,
      AbilityStatus,
    },
    created() {
      this.$store.commit('updateSkills');
      this.$store.commit('updateAbilities');
      this.$store.commit('updatePower');
    }
  }
</script>
