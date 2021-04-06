<template lang="pug">
div#app(@click.stop="focusOut")
  wiki-nav
  div.content
    article
      router-view
    aside
      recent-changes
  global-component
</template>

<script>
import WikiNav from './components/WikiNav'
import RecentChanges from './components/RecentChanges'
import { mapMutations } from 'vuex'

export default {
  name: 'App',
  components: {
    WikiNav, RecentChanges
  },
  metaInfo: {
    // if no subcomponents specify a metaInfo.title, this title will be used
    title: 'Hello, world!',
    // all titles will be injected into this template
    titleTemplate: '%s - 나무위키'
  },
  methods: {
    ...mapMutations(['focusOut'])
  }
}
</script>

<style>
@import './assets/styles/icon.css';

html {
  box-sizing: border-box;
  font-size: 16px;
  font-family: Open Sans,arial,Apple SD Gothic Neo,Noto Sans CJK KR,본고딕,KoPubDotum,나눔바른고딕,나눔고딕,NanumGothic,맑은고딕,Malgun Gothic,sans-serif;
}

body {
  margin: 0;
}

*, :after, :before {
  box-sizing: inherit;
}

#app {
    background-color: #efefef;
    font-size: .9rem;
    margin: 0;
    line-height: 1.5;
    color: #373a3c;
    height: 100%;
}

.content {
  display: flex;
  border-bottom : .0625rem solid #ccc;
}

article {
  word-break: break-all;
  min-width: 0;
  min-height: 35rem;
  flex-grow: 1;
  background-color: #fff;
  margin-right: 1rem;
  padding: 1.5rem;
  border-right : .0625rem solid #ccc;
}

aside {
  min-width: 17rem;
  margin: 1rem 1rem 1rem 0;
  display: block;
}

@media screen and (max-width: 1020px) {
  article {
    padding: .7rem;
    margin-left: 0!important;
    margin-right: 0!important;
    border: 0!important;
  }
  aside {
    display: none;
  }
}
</style>
