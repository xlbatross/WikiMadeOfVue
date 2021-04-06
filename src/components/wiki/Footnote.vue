<template lang='pug'>
div.wiki-macro-footnote
  span.footnote-list(v-for="footNote in footnoteList")
    template(v-for="item in footNote")
      template(v-if="item.type === 'anchor'")
        span.target(:id="item.id")
        router-link(:to="item.url") {{ item.text }}
      template(v-else-if="item.type === 'plain'") {{ item.text }}
      template(v-else-if="item.type === 'link'")
        router-link(:to="item.url", :title="item.title") {{ item.text }}
      template(v-else-if="item.type === 'tag'")
        wiki-view(:tag="item.tag", :item-list="item.inItemList")
</template>

<script>
import wikiView from './View.vue'
export default {
  name: 'wiki-footnote', // 컴포넌트의 이름. 다른 컴포넌트에서 태그로 활용할 때 이름으로 사용한다.
  props: ['footnoteList'],
  components: {
    wikiView
  }
}
</script>

<style>
.footnote-list {
  display: block;
}
</style>
