<template>
  <ul>
    <li v-for="skill in skills">
      <el-progress :percentage="Math.round(skill.mastery / skill.max * 100)" :show-text="false"
                   :status="skill.readyForUpgrade ? 'success' : ''"></el-progress>
      <span v-show="skill.id === currentSkill">&gt;</span>
      <span @click="setCurrentSkill(skill.id)">{{skill.name}}</span> : {{skill.mastery}} / {{skill.max}}
      [{{skill.title}}]
      <el-button type="primary" icon="el-icon-caret-top" size="mini" v-show="skill.readyForUpgrade" @click="upgradeSkill(skill)"
                 :disabled="skill.cost > coin"></el-button>
      <!--<button>Upgrade - {{skill.cost}}-->
      <!--</button>-->
      <br/>
      <span v-for="ability in skill.abilities">
        <el-tag type="info">{{ability}}</el-tag>
      </span>
      <span>合计 {{skill.masteryAddition}} 点熟练度加成。</span>
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
