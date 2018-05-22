<template>
  <div>
    <div v-for="ability in abilities">
      <el-row>
        <el-col :span="12">
          <span>{{ability.name}}[Lv. {{ability.level + 1}}]</span> : {{ability.mastery}} / {{ability.max}}
        </el-col>
        <el-col :span="12">
          <el-progress :percentage="Math.round(ability.mastery / ability.max * 100)" :show-text="false"></el-progress>
        </el-col>
      </el-row>
      <hr/>
    </div>
  </div>
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

<style>

</style>
