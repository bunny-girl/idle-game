<template>
  <el-row>
    <el-col :span="6">
      <div class="grid-content bg-purple">
        <status></status>
        <Clicker></Clicker>
      </div>
    </el-col>
    <el-col :span="17" :push="1">
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
          <el-tab-pane label="设置">
            <Option></Option>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import Clicker from './Clicker.vue'
  import SkillPanel from './SkillPanel.vue'
  import Status from './Status.vue'
  import AbilityStatus from './AbilityStatus.vue'
  import Training from './Training'
  import AchievementPanel from './AchievementPanel'
  import Statics from './Statics'
  import Option from './Option'

  let autoSaver;

  export default {
    name: 'HelloWorld',
    components: {
      Statics,
      Clicker,
      SkillPanel,
      Status,
      AbilityStatus,
      Training,
      AchievementPanel,
      Option,
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
      }
    }
  }
</script>
