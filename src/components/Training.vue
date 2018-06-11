<template>
  <div>
    <el-row>
      <el-col :span="18">
        {{current && current.title ? current.title + current.timeLeft : "当前没有项目"}}
      </el-col>
      <el-col :span="6">
        <el-button type="primary" disabled="disabled">
          补课
        </el-button>
      </el-col>
    </el-row>
    <hr />
    <el-row>
      <el-col :span="24">
        课程列表
      </el-col>
      <el-col :span="6" v-for="item in options" :key="item.id">
        <p>
          {{item.title}} [{{item.cost}}] - {{item.cost <= coins}}
        </p>
        <el-button type="primary" :disabled="isDisabled(item)" @click="startTraining(item)">
          交钱
        </el-button>
      </el-col>
    </el-row>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'

  export default {
    name: "Training",
    computed: {
      ...
        mapGetters({
          'abilities': 'abilities',
          'coins' : 'coins',
        }),
      options() {
        return this.$store.state.training.trainingList
      },
      current() {
        return this.$store.state.training.current;
      },
    },
    data() {
      return {
        selectedAbility: '',
        difficulty: '',
      }
    },
    methods : {
      startTraining(item){
        this.$store.dispatch('registerTrainingItem', item);
      },
      isDisabled(item) {
        return this.$store.state.training.current.timeLeft > 0 || item.cost > this.coins
      },
    },
    created(){
      if(this.$store.state.training.trainingList.length <= 0){
        this.$store.dispatch('getTrainingList');
      }
    }
  }
</script>

<style scoped>

</style>
