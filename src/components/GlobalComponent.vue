<template>
  <div>
    <button @click="showTitle">Click</button>
    <span>{{ title }}</span>
  </div>
</template>

<script>

export default {
  name: 'global-component', // 컴포넌트의 이름. 다른 컴포넌트에서 태그로 활용할 때 이름으로 사용한다.
  data () {
    return {
      title: void 0
    }
  },
  methods: {
    showTitle () {
      this.title = 'Global Component!!'
    }
  }
}
</script>

<style scoped>
  div {
    padding: 20px
  }

  div span {
    margin: 20px
  }
</style>
