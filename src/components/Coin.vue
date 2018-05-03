<template>
  <p>
    {{coins}}
  </p>
</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: 'Coin',
    computed: {
      ...mapGetters([
        'coins'
      ])
    }
  }
</script>
