<template>
  <div :class="isCurrent ? 'currentSkill' : ''" @click="activateSkill()" v-show="!isLocked">
    <!--<div class="popover" v-show="isLocked"></div>-->
    <el-row align="middle" type="flex">
      <el-col :span="3">
        <i class="el-icon-refresh" v-show="isCurrent"></i>
        <i class="el-icon-delete" v-show="isLocked"></i>
        <span>{{skill.name}}</span>
      </el-col>
      <el-col :span="2">
        [Lv. {{skill.level}}]
      </el-col>
      <el-col :span="4">
        {{skill.mastery}} / {{skill.max}}
      </el-col>
      <el-col :span="4">
        <el-button
          type="primary"
          size="mini"
          v-show="skill.readyForUpgrade"
          @click="upgradeSkill(skill)"
          :disabled="skill.cost > coin">
          进阶({{skill.cost}})
        </el-button>
      </el-col>
      <el-col :span="11">
        <el-progress
          :percentage="percentage"
          :show-text="false"
          :stroke-width="11"
          style="vertical-align: center"
          :status="skill.readyForUpgrade ? 'success' : ''"></el-progress>
      </el-col>
    </el-row>
    <p>
      <ability-tag :ability-id="ability" v-for="ability in skill.abilities" :key="ability"></ability-tag>
      <span>合计 {{mastery}} 点熟练度加成。</span>
    </p>
    <hr>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import AbilityTag from './AbilityTag'

  export default {
    name: 'SkillStatus',
    components: {AbilityTag},
    props: ['skill-data'],
    computed: {
      ...
        mapGetters({
          currentSkill: 'currentSkillId',
          coin: 'coins',
          abilities: 'abilities',
          skills : 'skillList',
        }),
      mastery() {
        return this.$store.getters.getMasterySumByArr(this.skill.abilities);
      },
      isLocked() {
        let coinLocked = (this.skill.unlock.coin && this.skill.unlock.coin > this.coin);

        let abilityLocked = true;
        let tempAbilityData = this.skill.unlock.ability;
        if (tempAbilityData) {
          for (let a in tempAbilityData) {
            if (tempAbilityData.hasOwnProperty(a)) {
              let temp = this.abilities.find(_a => _a.id === a);
              abilityLocked = abilityLocked && temp && temp.level >= tempAbilityData[a].level;
            }
          }
        }
        abilityLocked = !abilityLocked;

        let skillLocked = true;
        let tempSkillData = this.skill.unlock.skill;
        if (tempSkillData) {
          for (let a in tempSkillData) {
            if (tempSkillData.hasOwnProperty(a)) {
              let temp = this.skills.find(_a => _a.id === a);
              skillLocked = skillLocked && temp && temp.level >= tempSkillData[a].level;
            }
          }
        }
        skillLocked = !skillLocked;

        return coinLocked || abilityLocked || skillLocked;
      },
      skill() {
        return this.skillData;
      },
      isCurrent() {
        return this.skill.id === this.currentSkill;
      },
      percentage() {
        let tempData = this.skill;
        return tempData.max > 0 ? Math.min(Math.round(tempData.mastery / tempData.max * 100), 100) : 100;
      }
    },
    methods: {
      ...mapActions([
        'upgradeSkill'
      ]),
      activateSkill() {
        if (!this.isLocked) {
          this.$store.commit('setCurrentSkill', {skillId: this.skill.id})
        }
      }
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
    background: rgba(0, 0, 0, 0.2);
    z-index: 100;
  }
</style>
