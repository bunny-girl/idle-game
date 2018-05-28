<template>
  <div>
    <el-card shadow="always">
      <el-row>
        <el-col :span="24">
          {{name}}
        </el-col>
        <el-col :span="24">
          {{coins}}
        </el-col>
        <el-col :span="24">
          {{days | yearFromDays}}
        </el-col>
      </el-row>
    </el-card>
    <el-card shadow="always">
      <el-row>
        <el-col :span="8">
          上班收益:
        </el-col>
        <el-col :span="16">
          {{power.auto}} / 天
        </el-col>
        <el-col :span="8">
          当前工作:
        </el-col>
        <el-col :span="16">
          {{currentSkill.name}} [Lv. {{currentSkill.level}}]
        </el-col>
      </el-row>
      <!--<li>-->
      <!--Time : {{days | yearFromDays}}-->
      <!--</li>-->
    </el-card>
    <el-card shadow="always">
      <el-row>
        <el-col :span="8">
          加班收益
        </el-col>
        <el-col :span="16">
          {{power.manual}} / 次
        </el-col>
        <el-col :span="8"></el-col>
        <el-col :span="16"></el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Status',
    computed: {
      ...mapGetters([
        'power',
        'days',
        'name',
        'coins',
        'currentSkill',
      ]),
    },
    created() {
    }
  }
</script>
