<template>
  <el-row>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <p>
          <el-button type="primary" @click="clearGame()">
            重启
          </el-button>
        </p>
        <Coin></Coin>
        <Clicker></Clicker>
        <status></status>
      </div>
    </el-col>
    <el-col :span="18">
      <div class="grid-content bg-purple-light">
        <el-tabs type="border-card">
          <el-tab-pane label="技能">
            <skill-panel></skill-panel>
          </el-tab-pane>
          <el-tab-pane label="属性">
            <ability-status></ability-status>
          </el-tab-pane>
          <el-tab-pane label="培训">
            <training></training>
          </el-tab-pane>
          <el-tab-pane label="成就">
            <achievement-panel></achievement-panel>
          </el-tab-pane>
          <el-tab-pane label="统计">
            <statics></statics>
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
  import Training from './Training'
  import AchievementPanel from './AchievementPanel'
  import Statics from './Statics'

  let autoSaver;

  export default {
    name: 'HelloWorld',
    components: {
      Statics,
      Coin,
      Clicker,
      SkillPanel,
      Status,
      AbilityStatus,
      Training,
      AchievementPanel,
    },
    created() {
      this.$store.dispatch('loadGame');
      this.saveGame();
    },
    methods: {
      saveGame() {
        autoSaver = setInterval(() => {
          this.autoSave()
        }, 10000);
      },
      autoSave() {
        this.$store.dispatch('saveGame');
      },
      clearGame(){
        this.$store.dispatch('clearGame');
      }
    }
  }
</script>
