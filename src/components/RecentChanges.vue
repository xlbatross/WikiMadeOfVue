<template lang="pug">
div
  h5 최근 변경
  div
    a(href="/w/%EA%B0%80%EC%8B%9C%EB%A6%AC%EC%9E%87%EA%B3%A0")
      span
        time(datetime="2021-02-24T06:48:43.000Z") 15:48
      | 가시리잇고
</template>

<script>
export default {
  name: 'recent-changes'
}
</script>

<style scoped>
div {
  background-color: white;
  border : .0625rem solid #ccc;
}

h5 {
  margin: 1.25rem;
  font-weight: 700;
  font-size: 1.25rem;
  line-height: 1.1;
}

a {
    display: block;
    padding: .3rem 3.3rem .3rem .5rem;
    border-top: 1px solid #ccc;
    word-wrap: break-word;
    background-color: transparent;
    overflow: hidden;
    text-overflow: ellipsis;
    word-wrap: normal;
    white-space: nowrap;
}

span {
    float: right;
    margin-right: -2.8rem;
    color: #373a3c;
}
</style>
