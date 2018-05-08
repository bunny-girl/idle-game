<template>
  <ul>
    <li>
      Auto : + {{auto}}
    </li>
    <li>
      Click : + {{click}}
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'Status',
    computed: {
      ...mapGetters([
        'auto',
        'click',
      ])
    },
    created() {
    }
  }
</script>
