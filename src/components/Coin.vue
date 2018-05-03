<template>
  <p>
    {{coin}}
  </p>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name : 'Coin',
    computed : mapState([
      'coin'
    ])
  }
</script>
