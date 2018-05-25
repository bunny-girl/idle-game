<template>
  <div
    :class="isCurrent ? 'currentSkill' : ''"
    class="skill-status"
    @click="activateSkill()"
  >
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
      <el-col :span="2">
        {{skill.mastery}} / {{skill.max}}
      </el-col>
      <el-col :span="3">
        <el-button
          type="primary"
          size="mini"
          v-show="skill.readyForUpgrade()"
          @click="upgradeSkill(skill)"
          :disabled="skill.cost > coin">
          进阶({{skill.cost}})
        </el-button>
      </el-col>
      <el-col :span="7">
        <el-progress
          :percentage="percentage"
          :show-text="false"
          :stroke-width="11"
          style="vertical-align: center"
          :status="skill.readyForUpgrade() ? 'success' : ''"></el-progress>
      </el-col>
      <el-col :span="2" v-for="ability in skill.abilities" :key="ability" style="text-align: center">
        <ability-tag :ability-id="ability" ></ability-tag>
      </el-col>
      <el-col :span="3">
        +{{mastery}}
      </el-col>
    </el-row>
    <hr>
    <div class="popover" v-show="isLocked">
      <Requirement :unlock="skill.unlock"></Requirement>
    </div>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex'
  import AbilityTag from './AbilityTag'
  import Requirement from './Requirement'

  export default {
    name: 'SkillStatus',
    components: {AbilityTag, Requirement},
    props: ['skill-data'],
    computed: {
      ...
        mapGetters({
          currentSkill: 'currentSkillId',
          coin: 'coins',
          abilities: 'abilities',
          skills : 'skills',
        }),
      mastery() {
        return this.$store.getters.getMasterySumByArr(this.skill.abilities);
      },
      isLocked() {
        let coinLocked = (this.skill.mastery <= 0) && (this.skill.unlock.coin) && (this.skill.unlock.coin > this.coin);

        let abilityLocked = true;
        let tempAbilityData = this.skill.unlock.ability;
        tempAbilityData.map(item => {
          let temp = this.abilities.find(_a => _a.id === item.id);
          abilityLocked = abilityLocked && temp && temp.level >= item.level;
        });
        // if (tempAbilityData) {
        //   for (let a in tempAbilityData) {
        //     if (tempAbilityData.hasOwnProperty(a)) {
        //       let temp = this.abilities.find(_a => _a.id === a);
        //       abilityLocked = abilityLocked && temp && temp.level >= tempAbilityData[a].level;
        //     }
        //   }
        // }
        abilityLocked = !abilityLocked;

        let skillLocked = true;
        let tempSkillData = this.skill.unlock.skill;
        tempSkillData.map(item => {
          let temp = this.skills.find(_a => _a.id === item.id);
          skillLocked = skillLocked && temp && temp.level >= item.level;
        });
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
  .skill-status {
    position: relative;
  }
  .skill-status .popover {
    background: rgba(0, 0, 0, 0.9);
    padding-left: 1em;
    position: absolute;
    z-index: 2000;
    margin: 0;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }
</style>
