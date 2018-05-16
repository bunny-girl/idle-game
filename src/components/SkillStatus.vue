<template>
  <ul>
    <li v-for="skill in skills" :class="skill.id === currentSkill ? 'currentSkill' : ''">
      <el-row align="middle" type="flex">
        <el-col :span="3">
          <span v-show="skill.id === currentSkill">&gt;</span>
          <span @click="setCurrentSkill(skill.id)">{{skill.name}}</span>
          <!--<span>{{isLocked}}</span>-->
        </el-col>
        <el-col :span="19">
          <el-progress
            :percentage="skill.max > 0 ? Math.round(skill.mastery / skill.max * 100) : 100"
            :show-text="false"
            :stroke-width="11"
            style="vertical-align: center"
            :status="skill.readyForUpgrade ? 'success' : ''"></el-progress>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" icon="el-icon-caret-top" size="mini" v-show="skill.readyForUpgrade"
                     @click="upgradeSkill(skill)"
                     :disabled="skill.cost > coin"></el-button>
        </el-col>
      </el-row>
      <p>
        [{{skill.title}}] : {{skill.mastery}} / {{skill.max}}
      </p>
      <p>
        <ability-tag :ability-id="ability" v-for="ability in skill.abilities" :key="ability"></ability-tag>
        <!--<span>合计 {{skill.masteryAddition}} 点熟练度加成。</span>-->
      </p>
      <!--<button>Upgrade - {{skill.cost}}-->
      <hr>
    </li>
  </ul>
</template>

<script>
  import {mapMutations, mapGetters, mapActions} from 'vuex'
  import AbilityTag from './AbilityTag'

  export default {
    name: 'SkillStatus',
    components: {AbilityTag},
    computed: {
      ...
        mapGetters({
          skills: 'skillList',
          currentSkill: 'currentSkillId',
          coin: 'coins',
        }),
      isLocked () {
        return false;
      }
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
<style>
  li {
    list-style: none;
  }
</style>
