<template lang='pug'>
component(:is="tag", :class="customClass", :id="customId")
  template(v-for="item in itemList")
    template(v-if="item.type === 'plain'") {{ item.text }}
    template(v-else-if="item.type === 'link'")
      router-link(:to="item.url", :title="item.title") {{ item.text }}
    template(v-else-if="item.type === 'anchor'")
      router-link.wiki-fn-content(:to="item.url")
        span.target(:id="item.id") {{ item.text }}
    template(v-else-if="item.type === 'tag'")
      wiki-view(:tag="item.tag", :item-list="item.inItemList")
  slot
</template>

<script>
export default {
  name: 'wiki-view', // 컴포넌트의 이름. 다른 컴포넌트에서 태그로 활용할 때 이름으로 사용한다.
  props: ['tag', 'customClass', 'customId', 'itemList']
}
</script>

<style>
.wiki-paragraph {
  margin-bottom: 1rem;
}
</style>
