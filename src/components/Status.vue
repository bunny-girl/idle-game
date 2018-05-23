<template>
  <ul>
    <li>
      Auto : + {{power.auto}}
    </li>
    <li>
      Click : + {{power.manual}}
    </li>
    <li>
      Time : {{days | yearFromDays}}
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters} from 'vuex'

  export default {
    name: 'Status',
    computed: {
      ...mapGetters([
        'power',
        'days',
      ])
    },
    created() {
    }
  }
</script>
