<template>
  <div :class="isCurrent ? 'currentSkill' : ''" @click="setCurrentSkill(skill.id)">
    <div class="popover" v-show="isLocked"></div>
    <el-row align="middle" type="flex">
      <el-col :span="3">
        <!--<icon-play v-show="isCurrent"></icon-play>-->
        <i class="el-icon-refresh" v-show="isCurrent"></i>
        <!--<i class="el-icon-delete" v-show="isLocked"></i>-->
        <span>{{skill.name}}</span>
        <!--<span>{{isLocked}}</span>-->
      </el-col>
      <el-col :span="19">
        <el-progress
          :percentage="percentage"
          :show-text="false"
          :stroke-width="11"
          style="vertical-align: center"
          :status="skill.readyForUpgrade ? 'success' : ''"></el-progress>
      </el-col>
      <el-col :span="2">
        <el-button
          type="primary"
          icon="el-icon-caret-top"
          size="mini"
          v-show="skill.readyForUpgrade"
          @click="upgradeSkill(skill)"
          :disabled="skill.cost > coin">
        </el-button>
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
  </div>
</template>

<script>
  import {mapActions, mapGetters, mapMutations} from 'vuex'
  import AbilityTag from './AbilityTag'
  import {IconPlay} from '@vuikit/icons'

  export default {
    name: 'SkillStatus',
    components: {AbilityTag, IconPlay},
    props: ['skill-data'],
    computed: {
      ...
        mapGetters({
          currentSkill: 'currentSkillId',
          coin: 'coins',
          abilities: 'abilities',
        }),
      isLocked() {
        let coinLocked = (this.skill.unlock.coin && this.skill.unlock.coin < this.coin);
        let abilityLocked = true;
        let tempAbilityData = this.skill.unlock.ability;
        if (tempAbilityData) {
          for (let a in tempAbilityData) {
            if (tempAbilityData.hasOwnProperty(a)) {
              let temp = this.abilities.find(_a => _a.id === a);
              // console.log(abilityLocked);
              abilityLocked = abilityLocked && temp && temp.level >= tempAbilityData[a].level;
            }
          }
        }
        abilityLocked = !abilityLocked;
        console.log(coinLocked);
        console.log(abilityLocked);
        return coinLocked || abilityLocked;
      },
      skill() {
        return this.skillData;
      },
      isCurrent() {
        return this.skill.id === this.currentSkill;
      },
      percentage() {
        let tempData = this.skill;
        return tempData.max > 0 ? Math.round(tempData.mastery / tempData.max * 100) : 100;
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
  .popover {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    background: rgba(0,0,0,0.2);
    z-index: 100;
  }
</style>
