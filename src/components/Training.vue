<template>
  <el-row>
    <el-col :span="8">
      <el-select v-model="selectedAbility" placeholder="请选择项目">
        <el-option
          v-for="item in options"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-select v-model="difficulty" placeholder="请选择等级">
        <el-option
          v-for="diff in difficulties"
          :key="diff.val"
          :label="diff.label"
          :value="diff.val">
        </el-option>
      </el-select>
    </el-col>
    <el-col :span="8">
      <el-button type="primary" disabled="disabled">
        交钱
      </el-button>
    </el-col>
  </el-row>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "Training",
    computed: {
      ...
        mapGetters({
          'abilities': 'abilities'
        }),
      options() {
        return this.abilities
      },
      difficulties() {
        return [
          {
            val : 0,
            label : '初级'
          },
          {
            val : 1,
            label : '中级'
          },
          {
            val : 2,
            label : '高级'
          },
        ]
      },
    },
    data() {
      return {
        selectedAbility: '',
        difficulty: '',
      }
    },
    methods : {
      startTraining(){}
    }
  }
</script>

<style scoped>

</style>
