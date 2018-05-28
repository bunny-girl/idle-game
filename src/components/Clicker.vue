<template>
    <el-row justify="center" type="flex">
      <el-col :span="6" class="text-center">
        <el-button @click="click_action" type="primary" icon="el-icon-time">加班</el-button>
      </el-col>
      <!--<el-switch-->
      <!--v-model="isAuto"-->
      <!--active-color="#13ce66"-->
      <!--:disabled="power.auto<0.5"-->
      <!--active-text="开启"-->
      <!--@change="checkStatus"-->
      <!--inactive-text="关闭">-->
      <!--</el-switch>-->
    </el-row>



</template>

<script>
  import {mapGetters} from 'vuex'

  // let autoTimer;

  export default {
    name: 'Clicker',
    data() {
      return {
        isAuto: false,
      }
    },
    computed: {
      ...
        mapGetters([
          'power',
        ])
    },
    methods: {
      click_action() {
        this.$store.dispatch('clicker_action');
        this.$store.dispatch('addMasteryForAbilityManual');
        this.$store.dispatch('addMasteryForSkillManual');
      },
      // checkStatus() {
      //   if (this.isAuto) {
      //     autoTimer = setInterval(() => {
      //       this.autoInc()
      //     }, 1000);
      //   } else {
      //     clearInterval(autoTimer)
      //   }
      // },
      autoInc() {
        this.$store.dispatch('clicker_action', true);
        this.$store.dispatch('addMasteryForAbilityAuto');
        this.$store.dispatch('addMasteryForSkillAuto');
      }
    },
    created() {
      setInterval(() => {
        this.autoInc()
      }, 1000);
    },
  }
</script>
<style>
  .el-col {
  }
</style>
