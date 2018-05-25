<template>
  <el-button type="primary" @click="clearGame()">
    重启
  </el-button>
</template>

<script>
  export default {
    name: 'Option',
    methods: {
      clearGame() {
        this.$store.dispatch('clearGame');
      }
    }
  }
</script>
