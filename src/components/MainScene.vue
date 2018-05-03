<template>
  <div>
    <Coin></Coin>
    <Clicker></Clicker>
  </div>
</template>

<script>
  import Coin from './Coin.vue'
  import Clicker from './Clicker.vue'

  export default {
    name: 'HelloWorld',
    components: {
      Coin,
      Clicker
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
