import Vue from 'vue'
import Router from 'vue-router'
import MainScene from '@/components/MainScene'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: MainScene
    }
  ]
})
