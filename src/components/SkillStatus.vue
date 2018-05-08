<template>
  <ul>
    <li v-for="skill in skills">
      <span v-show="skill.id === currentSkill">&gt;</span>
      <span @click="setCurrentSkill(skill.id)">{{skill.name}}</span> : {{skill.mastery}} / {{skill.max}} [{{skill.title}}]
      <button v-show="skill.readyForUpgrade" @click="upgradeSkill(skill)"
              :disabled="skill.cost > coin">Upgrade - {{skill.cost}}
      </button>
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'

  export default {
    name: 'SkillStatus',
    computed: {
      ...
        mapGetters({
          skills: 'skillList',
          currentSkill: 'currentSkillId',
          coin: 'coins',
        })
    },
    methods: {
      ...mapMutations([
        'setCurrentSkill'
      ]),
      ...mapActions([
        'upgradeSkill'
      ])
    }
  }
</script>
