<template>
  <ul>
    <li>
      Auto : + {{power.auto}}
    </li>
    <li>
      Click : + {{power.manual}}
    </li>
    <li>
      Time : {{time.year}} 年 {{time.day}} 天
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
        'time',
      ])
    },
    created() {
    }
  }
</script>
