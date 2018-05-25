<template>
  <div>
    需要
    <span v-show="ability.length > 0">
      <el-tag :type="a.levelRequirement >= a.level ? 'warning' : 'success'" v-for="a in ability" :key="a.id">{{a.name}} {{a.levelRequirement}}</el-tag>
      &nbsp;
    </span>

    <span v-show="skill.length > 0">
      <el-tag :type="a.levelRequirement >= a.level ? 'warning' : 'success'" v-for="a in skill" :key="a.id">{{a.name}} {{a.levelRequirement}}</el-tag>
      &nbsp;
    </span>

    <el-tag v-show="coin>0" type="warning" :v-show="coin > 0">资金 : {{coin}}&nbsp;</el-tag>
    以解锁
  </div>
</template>

<script>
  export default {
    name: "Requirement",
    props: ['unlock'],
    computed: {
      coin() {
        return this.unlock.coin
      },
      ability() {
        return this.unlock.ability.map(item => {
          let obj = this.$store.getters.getAbilityById(item.id);
          obj.levelRequirement = item.level;
          return obj;
        })
      },
      skill() {
        return this.unlock.skill.map(item => {
          let obj = this.$store.getters.getSkillById(item.id);
          obj.levelRequirement = item.level;
          return obj;
        })
      }
    }
  }
</script>

<style scoped>
  div {
    color: white;
  }
</style>
