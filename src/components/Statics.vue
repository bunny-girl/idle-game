<template>
  <div>
    <el-row>
      <el-col :span="8" :push="9">统计面板</el-col>
    </el-row>
    <el-row class="row-fix">
      <el-col :span="9">总收益</el-col>
      <el-col :span="13" :push="2">{{currentStatic['totalCoins']}}</el-col>
    </el-row>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: "Statics",
    computed: {
      ...
        mapGetters([
          'currentStatic',
        ]),
    }
  }
</script>

<style scoped>
  .row-fix {
    /*vertical-align: text-bottom;*/
  }

  .row-fix .el-col {
    line-height: 1.4em;
  }

  .row-fix .el-col:nth-child(odd) {
    text-align: right;
  }
</style>
