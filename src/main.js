// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 컴포넌트 전역 등록
import GlobalComponent from './components/GlobalComponent'
// Vue.component를 사용하여 컴포넌트를 Vue 인스턴스에 바인딩
Vue.component(GlobalComponent.name, GlobalComponent)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App />'
})
