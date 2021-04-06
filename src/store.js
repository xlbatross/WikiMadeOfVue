import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    articleTitle: 'none',
    isSpecialFeatureActive: false,
    isMemberMenuActive: false
  },
  mutations: {
    setArticleTitle (state, articleTitle) {
      state.articleTitle = articleTitle
    },
    focusOut (state) {
      if (state.isSpecialFeatureActive === true || state.isMemberMenuActive === true) {
        state.isSpecialFeatureActive = false
        state.isMemberMenuActive = false
      }
    },
    openSpecialFeatureMenu (state) {
      if (state.isMemberMenuActive === true) {
        state.isMemberMenuActive = false
      }
      state.isSpecialFeatureActive = state.isSpecialFeatureActive === false
    },
    openMemberMenu (state) {
      if (state.isSpecialFeatureActive === true) {
        state.isSpecialFeatureActive = false
      }
      state.isMemberMenuActive = state.isMemberMenuActive === false
    }
  }
})
