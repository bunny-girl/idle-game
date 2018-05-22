<template>
  <p>
    <el-button @click="click_action" type="primary" :disabled="isAuto">干活</el-button>
    <el-switch
      style="display: block"
      v-model="isAuto"
      active-color="#13ce66"
      :disabled="power.auto<0.1"
      active-text="开启"
      @change="checkStatus"
      inactive-text="关闭">
    </el-switch>
  </p>
</template>

<script>
  import {mapGetters} from 'vuex'

  let autoTimer;

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
        this.$store.dispatch('addMasteryForAbility');
        this.$store.dispatch('addMasteryForSkill');
      },
      checkStatus() {
        if (this.isAuto) {
          autoTimer = setInterval(() => {
            this.autoInc()
          }, 1000);
        } else {
          clearInterval(autoTimer)
        }
      },
      autoInc() {
        this.$store.dispatch('clicker_action_auto');
        this.$store.dispatch('addMasteryForAbilityAuto');
        this.$store.dispatch('addMasteryForSkillAuto');
      }
    }
  }
</script>
