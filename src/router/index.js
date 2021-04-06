import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import HelloWorld from '@/components/HelloWorld'
import Wiki from '@/components/Wiki'

Vue.use(Router)
Vue.use(Meta)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/w/:id',
      name: 'Wiki',
      component: Wiki
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    }
  }
})
