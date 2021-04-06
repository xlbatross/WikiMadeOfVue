<template lang='pug'>
component.wiki-heading(:is="attribute.headSizeTag", :class="{ 'wiki-heading-folded' : isFolded }", @click="foldEvent()")
  router-link(to='#toc', :id="'s-' + attribute.headNumber") {{ attribute.headNumber }}
  | {{ ' ' }}
  wiki-view(tag="span", :custom-id="attribute.titleId", :item-list="attribute.titleItemList")
    span.wiki-edit-section
      router-link(:to="'/edit/' + articleTitle + '?section=' + attribute.sectionNumber", rel="nofollow") [편집]
</template>

<script>
import wikiView from './View.vue'
import { mapState } from 'vuex'
export default {
  name: 'wiki-heading',
  components: {
    wikiView
  },
  props: ['attribute', 'isFolded'],
  methods: {
    foldEvent () {
      this.$emit('fold-event')
    }
  },
  computed: {
    ...mapState(['articleTitle'])
  }
}
</script>

<style>
.wiki-heading {
  cursor: pointer;
  margin: 1.2em 0 .8em;
  border-bottom: 1px solid #ccc;
  padding-bottom: 5px;
}

.wiki-heading:before {
  float: left;
  font-family: Ionicons;
  font-weight: 400;
  font-size: .8em;
  line-height: 1.8em;
  text-align: center;
  margin: 0 .5rem 0 .2rem;
  width: .9em;
  color: #666;
  content: "\f3d0";
}

.wiki-edit-section {
    float: right;
    font-size: .8rem;
}

.wiki-heading-folded {
  opacity: 0.5;
}

.wiki-heading.wiki-heading-folded:before {
  content: "\f3d1";
}
</style>
