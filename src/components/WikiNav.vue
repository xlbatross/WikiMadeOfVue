<template lang="pug">
  nav
    router-link.main-logo(to="/")
    ul
      li
        router-link(to="/RecentChanges", title="최근 변경")
          span.i.ion-md-compass
          span.t  최근 변경
      li
        router-link(to="/RecentDiscuss", title="최근 토론")
          span.i.ion-md-text
          span.t  최근 토론
      li
        a.arrow-down(
          href="#",
          @click.stop.prevent="openSpecialFeatureMenu",
          title="특수 기능"
        )
          span.i.ion-ios-cube
          span.t  특수 기능
        .special-feature-menu(
          :class="{ active: isSpecialFeatureActive }"
        )
          router-link(to="//board.namu.wiki/", title="게시판")
            span.i.ion-ios-clipboard
            span.t  게시판
          div.line
          router-link(to="/NeededPages", title="작성이 필요한 문서")
            span.i.ion-md-alert
            span.t  작성이 필요한 문서
          router-link(to="/OrphanedPages", title="고립된 문서")
            span.i.ion-ios-link
            span.t  고립된 문서
          router-link(to="/UncategorizedPages", title="분류가 되지 않은 문서")
            span.i.ion-md-help
            span.t  분류가 되지 않은 문서
          router-link(to="/OldPages", title="편집된 지 오래된 문서")
            span.i.ion-ios-pause
            span.t  편집된 지 오래된 문서
          router-link(to="/ShortestPages", title="내용이 짧은 문서")
            span.i.ion-md-create
            span.t  내용이 짧은 문서
          router-link(to="/LongestPages", title="내용이 긴 문서")
            span.i.ion-md-heart
            span.t  내용이 긴 문서
          router-link(to="/BlockHistory", title="차단 내역")
            span.i.ion-md-heart-dislike
            span.t  차단 내역
          router-link(to="/RandomPage", title="RandomPage")
            span.i.ion-ios-shuffle
            span.t  RandomPage
          router-link(to="/Upload", title="파일 올리기")
            span.i.ion-ios-cloud-upload
            span.t  파일 올리기
          router-link(to="/License", title="라이선스")
            span.i.ion-ios-pricetag
            span.t  라이선스
      li
        router-link(to="//arca.live/", title="아카")
          span.i.arcalive
          span.t  아카
    ul.member-icon
      li
        a(href="#", @click.stop.prevent="openMemberMenu", title="Member menu")
          span.ion-ios-person
        .member-menu(:class="{ active: isMemberMenuActive }")
          #tchikaf4f01b96
            div 219.249.243.11
            div Please login!
          div.line
          router-link(to="#", title="설정") 설정
          div.line
          router-link(to="/contribution/ip/219.249.243.11/document", title="내 문서 기여 목록") 내 문서 기여 목록
          router-link(to="/contribution/ip/219.249.243.11/discuss", title="내 토론 기여 목록") 내 토론 기여 목록
          div.line
          router-link(
            to="/member/login?redirect=%2Fw%2F%25EA%25B0%2584%25EB%25A5%2598%25EC%25A7%2580%25EB%25A7%2588%2520%25EC%25BD%25A4%25EB%25B9%2584",
            title="로그인"
          ) 로그인
    form
      #tchika6f894c53
        span.l
          router-link(to="/random")
            span.ion-ios-shuffle
        #tchikab6f185d4
          input(
            type="search",
            placeholder="Search",
            tabindex="1",
            autocomplete="off",
            value=""
          )
        span.r
          button(type="button")
            span.ion-ios-search
          button(type="button")
            span.ion-ios-arrow-round-forward
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'wiki-nav',
  methods: {
    ...mapMutations(['openSpecialFeatureMenu', 'openMemberMenu'])
  },
  computed: {
    ...mapState(['isMemberMenuActive', 'isSpecialFeatureActive'])
  }
}
</script>

<style scoped>
div {
  background-color: #008275;
}

nav {
  position: relative;
  display: block;
  padding: 0 1rem;
  background-color: #008275;
  color: #eceeef;
  font-size: 1rem;
}

/* float를 쓰고 난 후 clearfix를 위한 css */
nav:before,
nav:after {
  display: table;
  content: " ";
}

nav:after {
  clear: both;
}
/* -- */

a {
  color: #fff !important;
  font-size: 1rem;
  display: block;
  padding: 0.6rem 0.7rem 0.5rem;
  text-decoration: none;
  background: transparent;
}

li > a:hover {
  background-color: #80c1ba;
}

.main-logo {
  float: left;
  height: 2.6rem;
  width: 6.6rem;
  padding: 0;
  margin-right: 0.7rem;
  color: #fff;
  font-size: 1.25rem;
  background: transparent
    url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMzAwcHgiIGhlaWdodD0iNjZweCIgdmlld0JveD0iMCAwIDMwMCA2NiIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMzAwIDY2IiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxnPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjcyLjcxNiwyOS40MjJjMC0xLjA0OCwwLjg1NS0xLjkwNywxLjkwNC0xLjkwN2gzLjk4MmMxLjA0OSwwLDEuOTA0LDAuODU5LDEuOTA0LDEuOTA3djI1LjUwMg0KCQkJYzAsMS4wNS0wLjg1NSwxLjkwNy0xLjkwNCwxLjkwN2gtMy45ODJjLTEuMDQ5LDAtMS45MDQtMC44NTctMS45MDQtMS45MDdWMjkuNDIyeiIvPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMTczLjgxMiw1Ny43MTFjMC0wLjgxOCwwLTUuNjkyLDAtNy4yMzljMC0wLjE5MywwLjEyNy0wLjI4MSwwLjI2NC0wLjI4MWMwLDAsOS41NywwLjA0OSw5LjkxNCwwLjA0OQ0KCQkJYzAuNzg5LDAsMS42NDgtMS4wMDksMS42NDgtMS43NTJjMC0wLjc0NCwwLTIuNzE2LDAtMy41NTJjMC0wLjgzNi0xLjAyMS0xLjYxOS0xLjY0OC0xLjYxOWMtMC4yMTUsMC0yNi44NzcsMC0yNi44NzcsMA0KCQkJYy0wLjk5LDAtMS44MjgsMC42MjktMS44MjgsMS42MTl2My41NTJjMCwwLjk5LDAuODM4LDEuNzUyLDEuODI4LDEuNzUyYzAsMCw5LjM3My0wLjA0OSw5LjU0NS0wLjA0OXMwLjI3OSwwLjA4NSwwLjI3OSwwLjI4MQ0KCQkJYzAsMS4zNTIsMCw1LjEzNywwLDcuMzMzYzAsMS4wMzgsMS4xODgsMS42ODEsMS44NzcsMS42ODFjMC42ODgsMCwyLjI3MSwwLDMuMTc4LDBTMTczLjgxMiw1OC42MTYsMTczLjgxMiw1Ny43MTF6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMDkuNDc0LDU3LjcxMWMwLTAuODE4LDAtNS42OTIsMC03LjIzOWMwLTAuMTkzLDAuMTI1LTAuMjgxLDAuMjYyLTAuMjgxYzAsMCw5LjU3MiwwLjA0OSw5LjkxNiwwLjA0OQ0KCQkJYzAuNzg5LDAsMS42NDYtMS4wMDksMS42NDYtMS43NTJjMC0wLjc0NCwwLTIuNzE2LDAtMy41NTJjMC0wLjgzNi0xLjAyMS0xLjYxOS0xLjY0Ni0xLjYxOWMtMC4yMTUsMC0yNC41MiwwLTI0LjUyLDANCgkJCWMtMC45OSwwLTEuODMsMC42MjktMS44MywxLjYxOXYzLjU1MmMwLDAuOTksMC44NCwxLjc1MiwxLjgzLDEuNzUyYzAsMCw3LjAxNi0wLjA0OSw3LjE4OC0wLjA0OWMwLjE3LDAsMC4yNzksMC4wODUsMC4yNzksMC4yODENCgkJCWMwLDEuMzUyLDAsNS4xMzcsMCw3LjMzM2MwLDEuMDM4LDEuMTg4LDEuNjgxLDEuODc1LDEuNjgxYzAuNjg5LDAsMi4yNzMsMCwzLjE4LDBTMjA5LjQ3NCw1OC42MTYsMjA5LjQ3NCw1Ny43MTF6Ii8+DQoJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xNDcuNjc1LDQxLjAxNmMtMC44MTYsMC00LjQzLDAtNS45NzcsMGMtMC4xOTUsMC0wLjM2My0wLjAxNy0wLjM2My0wLjE1MmMwLDAsMC0xMS4wMjQsMC0xMS4zNjcNCgkJCWMwLTAuNzktMC45OS0xLjY0OC0xLjczMi0xLjY0OGMtMC43NDQsMC0zLjE1OCwwLTMuOTk0LDBjLTAuODM0LDAtMS41NzgsMS4wMjEtMS41NzgsMS42NDhjMCwwLjIxNCwwLDI1LjQ5NiwwLDI1LjQ5Ng0KCQkJYzAsMC45OSwwLjY2OCwxLjgyOCwxLjY1NiwxLjgyOGgzLjg3N2MwLjk5LDAsMS43NzEtMC44MzgsMS43NzEtMS44MjhWNDguMzFjMCwwLTAuMDQ1LTAuMjIxLDAuMTk1LTAuMjIxYzMuNTU1LDAsMy45MiwwLDYuMjQsMA0KCQkJYzEuMDM5LDAsMS42OC0xLjA4NywxLjY4LTEuODc2YzAtMC42ODgsMC0yLjQ3LDAtMy4zNzVDMTQ5LjQ1LDQxLjkzMSwxNDguNTgxLDQxLjAxNiwxNDcuNjc1LDQxLjAxNnoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNi44MzEsNTIuOTU3Yy00Ljc1OCwwLTE2LjY3LDAtMTcuMDY0LDBjLTAuNDg2LDAtMS43MjMtMC43MDUtMS43MjMtMS44NjVjMC01LjM1NywwLTIxLjIyNCwwLTIxLjc2Nw0KCQkJYzAtMC42NjEsMC45MzgtMS43MTIsMS44Mi0xLjcxMmMwLjg4NSwwLDMuMTg4LDAsMy45NzUsMGMwLjc4NSwwLDEuODMyLDAuODc3LDEuODMyLDEuNzEyYzAsMC43NDgsMCwxMi42NjEsMCwxNS4xMjgNCgkJCWMwLDAuMjg4LDAuMDksMC40NDcsMC4zODUsMC40NDdjMS42MzcsMCw5LjgxNCwwLDEwLjY3OCwwYzAuOTU3LDAsMS44NzcsMC45MDMsMS44NzcsMS44NmMwLDAuOTYsMCwzLjU4NSwwLDQuMzE1DQoJCQlDMTI4LjYxLDUxLjgwMywxMjcuOTMzLDUyLjk1NywxMjYuODMxLDUyLjk1N3oiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTE4Mi42ODEsMzcuMzkzYzAsMC45NzktMC43OTksMS43NzgtMS43NzcsMS43NzhoLTIwLjg4NWMtMC45NzksMC0xLjc3OS0wLjc5OS0xLjc3OS0xLjc3OFYyMC4wNg0KCQkJYzAtMC45NzksMC44MDEtMS43NzgsMS43NzktMS43NzhoMjAuODg1YzAuOTc5LDAsMS43NzcsMC43OTksMS43NzcsMS43NzhWMzcuMzkzeiBNMTc0LjI0OSwzMi41ODINCgkJCWMxLjA4NiwwLDEuOTY5LTAuODg1LDEuOTY5LTEuOTY5di0zLjc3MWMwLTEuMDgzLTAuODgzLTEuOTY5LTEuOTY5LTEuOTY5aC03LjU3NmMtMS4wODYsMC0xLjk2OSwwLjg4Ni0xLjk2OSwxLjk2OXYzLjc3MQ0KCQkJYzAsMS4wODQsMC44ODMsMS45NjksMS45NjksMS45NjlIMTc0LjI0OXoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTIwNi4yMTYsMTcuNDY1YzMuMTM3LDAsNS44MTQsMS4wNzgsOC4wMjksMy4yMzFjMi4yMTcsMi4xNTQsMy4zMjYsNC43OTgsMy4zMjYsNy45MzgNCgkJCWMwLDMuMTM4LTEuMTA5LDUuODE1LTMuMzI2LDguMDMxYy0yLjIxNSwyLjIxNS00Ljg5MywzLjMyMy04LjAyOSwzLjMyM3MtNS43ODUtMS4xMDctNy45MzgtMy4zMjMNCgkJCWMtMi4xNTQtMi4yMTYtMy4yMzItNC44OTMtMy4yMzItOC4wMzFjMC0zLjE0LDEuMDc4LTUuNzg0LDMuMjMyLTcuOTM4QzIwMC40MzEsMTguNTQzLDIwMy4wNzksMTcuNDY1LDIwNi4yMTYsMTcuNDY1eg0KCQkJIE0yMDYuMjE2LDMzLjIwNmMxLjI0MiwwLDIuMzE0LTAuNDY3LDMuMjE1LTEuNDAxYzAuOTAyLTAuOTMyLDEuMzU1LTEuOTksMS4zNTUtMy4xNzFjMC0xLjI0NC0wLjQ1My0yLjI4Ny0xLjM1NS0zLjEyNQ0KCQkJYy0wLjktMC44NC0xLjk3My0xLjI2MS0zLjIxNS0xLjI2MWMtMS4xODQsMC0yLjIxMSwwLjQyLTMuMDgsMS4yNjFjLTAuODcxLDAuODM5LTEuMzA1LDEuODgyLTEuMzA1LDMuMTI1DQoJCQljMCwxLjE4MiwwLjQzNCwyLjIzOSwxLjMwNSwzLjE3MUMyMDQuMDA1LDMyLjczOSwyMDUuMDMyLDMzLjIwNiwyMDYuMjE2LDMzLjIwNnoiLz4NCgkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI1NC44OTQsMzguNjJjMS4wMDgsMCwxLjgzMi0wLjgyNSwxLjgzMi0xLjgzMnYtMC4xMTFjMC0xLjAwOS0wLjgyNC0xLjgzMi0xLjgzMi0xLjgzMmgtMTEuODE4DQoJCQljLTEuMDA4LDAtMS44MzItMC44MjQtMS44MzItMS44MzJ2LTMuNjA0YzAtMS4wMDcsMC44MjQtMS44MzIsMS44MzItMS44MzJoMTkuMDg0YzEuMDA2LDAsMS44MzIsMC44MjUsMS44MzIsMS44MzJWNTEuMzINCgkJCWMwLDEuMDA4LTAuODI2LDEuODMtMS44MzIsMS44M2gtMy42MDJjLTEuMDA4LDAtMS44MzItMC44MjItMS44MzItMS44M3YtMy45ODFjMC0xLjAwOC0wLjgyNC0xLjgzLTEuODMyLTEuODNoLTExLjI0Ng0KCQkJYy0xLjAwOCwwLTEuODMyLTAuODI1LTEuODMyLTEuODMzdi0zLjIyNGMwLTEuMDA3LDAuODI0LTEuODMxLDEuODMyLTEuODMxSDI1NC44OTR6Ii8+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI3Ni43OSwzMi43ODVjLTQuOTQxLDAtOC45NjEtNC4wMjEtOC45NjEtOC45NjJjMC00Ljk0Myw0LjAyLTguOTYxLDguOTYxLTguOTYxDQoJCQkJYzQuOTQzLDAsOC45NjMsNC4wMTksOC45NjMsOC45NjFDMjg1Ljc1MywyOC43NjUsMjgxLjczMywzMi43ODUsMjc2Ljc5LDMyLjc4NXogTTI3Ni43OSwyMS4xOTFjLTEuNDQ5LDAtMi42MzEsMS4xOC0yLjYzMSwyLjYzMg0KCQkJCWMwLDEuNDUyLDEuMTgyLDIuNjMzLDIuNjMxLDIuNjMzYzEuNDUxLDAsMi42MzUtMS4xODEsMi42MzUtMi42MzNDMjc5LjQyNSwyMi4zNzEsMjc4LjI0MSwyMS4xOTEsMjc2Ljc5LDIxLjE5MXoiLz4NCgkJPC9nPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMjI0LjM4MiwxOS4yNTRjMC0xLjA0NywwLjg1NS0xLjkwNiwxLjkwNC0xLjkwNmg0LjA3OGMxLjA0OSwwLDEuOTA2LDAuODU5LDEuOTA2LDEuOTA2djM2LjM5Mg0KCQkJYzAsMS4wNS0wLjg1NywxLjkwNC0xLjkwNiwxLjkwNGgtNC4wNzhjLTEuMDQ5LDAtMS45MDQtMC44NTQtMS45MDQtMS45MDRWMTkuMjU0eiIvPg0KCQk8Zz4NCgkJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0yMjguNDU4LDIyLjY0NGMtNC45NDEsMC04Ljk2MS00LjAyLTguOTYxLTguOTYyczQuMDItOC45NjEsOC45NjEtOC45NjFzOC45NjEsNC4wMTksOC45NjEsOC45NjENCgkJCQlTMjMzLjM5OSwyMi42NDQsMjI4LjQ1OCwyMi42NDR6IE0yMjguNDU4LDExLjA0OWMtMS40NTEsMC0yLjYzMywxLjE4LTIuNjMzLDIuNjMyczEuMTgyLDIuNjMzLDIuNjMzLDIuNjMzDQoJCQkJczIuNjMzLTEuMTgxLDIuNjMzLTIuNjMzUzIyOS45MDksMTEuMDQ5LDIyOC40NTgsMTEuMDQ5eiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTEzNy40MjUsMzEuMjljLTQuOTQxLDAtOC45NjEtNC4wMjEtOC45NjEtOC45NjRjMC00Ljk0Miw0LjAyLTguOTYxLDguOTYxLTguOTYxczguOTYzLDQuMDIsOC45NjMsOC45NjENCgkJCQlDMTQ2LjM4OCwyNy4yNjgsMTQyLjM2NiwzMS4yOSwxMzcuNDI1LDMxLjI5eiBNMTM3LjQyNSwxOS42OTRjLTEuNDUxLDAtMi42MzEsMS4xOC0yLjYzMSwyLjYzMnMxLjE4LDIuNjMzLDIuNjMxLDIuNjMzDQoJCQkJczIuNjM1LTEuMTgyLDIuNjM1LTIuNjMzUzEzOC44NzYsMTkuNjk0LDEzNy40MjUsMTkuNjk0eiIvPg0KCQk8L2c+DQoJPC9nPg0KCTxnPg0KCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNNzUuNDE1LDM1LjY2NmwtMTYuMjk5LDYuOWwtNS42MDQtMTMuMjM4Yy0wLjUwMi0xLjE4Ni0xLjg2OS0xLjc0LTMuMDU1LTEuMjM3DQoJCQljLTEuMTg2LDAuNTAyLTEuNzQsMS44NjktMS4yMzgsMy4wNTVsMi41MTYsNS45MzlsLTEyLjQ0OSw1LjI3MWwtOC4wNTgtMTkuMDMxYy0wLjUwMi0xLjE4NS0xLjg3LTEuNzM5LTMuMDU2LTEuMjM2DQoJCQljLTEuMTg1LDAuNTAxLTEuNzM5LDEuODctMS4yMzcsMy4wNTRsOC4wNTgsMTkuMDMxbC01LjQzNiwyLjMwMWMtMS4xODUsMC41MDItMS43MzksMS44NjktMS4yMzcsMy4wNTUNCgkJCWMwLjUwMiwxLjE4NiwxLjg2OSwxLjc0LDMuMDU1LDEuMjM3bDIyLjE3Ni05LjM4OWw1LjE4LDEyLjIzMWMwLjUwMiwxLjE4NiwxLjg2OSwxLjc0LDMuMDU1LDEuMjM4DQoJCQljMS4xODYtMC41MDIsMS43NC0xLjg3LDEuMjM4LTMuMDU1bC0yLjA5LTQuOTM1bDE2LjI5OS02Ljg5OWMxLjE4NC0wLjUwMiwxLjczOC0xLjg3LDEuMjM2LTMuMDU2DQoJCQlDNzcuOTY4LDM1LjcxOSw3Ni41OTksMzUuMTYzLDc1LjQxNSwzNS42NjZ6Ii8+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTI2LjU4NiwyNi4zNjljLTQuODI0LDAuMDM3LTguNzc4LTMuODU3LTguODE0LTguNjc5Yy0wLjAzNy00LjgyNSwzLjg1OC04Ljc3Nyw4LjY4Mi04LjgxNA0KCQkJCWM0LjgyMy0wLjAzNyw4Ljc3NiwzLjg1Nyw4LjgxMyw4LjY4MkMzNS4zMDMsMjIuMzc5LDMxLjQwOSwyNi4zMzMsMjYuNTg2LDI2LjM2OXogTTI2LjQ5MywxNC4wMDMNCgkJCQljLTEuOTk2LDAuMDE1LTMuNjA4LDEuNjUyLTMuNTk0LDMuNjQ3YzAuMDE3LDEuOTk2LDEuNjUyLDMuNjA2LDMuNjQ4LDMuNTkyYzEuOTk1LTAuMDE1LDMuNjA3LTEuNjUyLDMuNTkyLTMuNjQ3DQoJCQkJQzMwLjEyNCwxNS41OTksMjguNDg5LDEzLjk4OSwyNi40OTMsMTQuMDAzeiIvPg0KCQk8L2c+DQoJCTxnPg0KCQkJPHBhdGggZmlsbD0iI0ZGRkZGRiIgZD0iTTQ4LjkzMywzMy4zNjRjLTQuODIyLDAuMDM2LTguNzc3LTMuODU4LTguODE0LTguNjgxYy0wLjAzNi00LjgyNCwzLjg1OS04Ljc3Nyw4LjY4MS04LjgxNA0KCQkJCWM0LjgyNC0wLjAzNyw4Ljc3NywzLjg1Nyw4LjgxNCw4LjY4MkM1Ny42NTEsMjkuMzc0LDUzLjc1NywzMy4zMjgsNDguOTMzLDMzLjM2NHogTTQ4LjgzOSwyMC45OTcNCgkJCQljLTEuOTk2LDAuMDE2LTMuNjA3LDEuNjUyLTMuNTkyLDMuNjQ3YzAuMDE0LDEuOTk2LDEuNjUsMy42MDgsMy42NDYsMy41OTNjMS45OTYtMC4wMTYsMy42MDctMS42NTIsMy41OTItMy42NDcNCgkJCQlDNTIuNDcyLDIyLjU5Myw1MC44MzUsMjAuOTgyLDQ4LjgzOSwyMC45OTd6Ii8+DQoJCTwvZz4NCgkJPGc+DQoJCQk8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMzMuMDk0LDUxLjE0NmMwLjAzNyw0LjgyMi0zLjg1Nyw4Ljc3OC04LjY4MSw4LjgxNHMtOC43NzctMy44NTgtOC44MTMtOC42ODINCgkJCQljLTAuMDM2LTQuODIzLDMuODU3LTguNzc3LDguNjgxLTguODE0QzI5LjEwNCw0Mi40MjksMzMuMDU4LDQ2LjMyMywzMy4wOTQsNTEuMTQ2eiBNMjAuNzI3LDUxLjI0DQoJCQkJYzAuMDE2LDEuOTk2LDEuNjUxLDMuNjA4LDMuNjQ3LDMuNTkyYzEuOTk2LTAuMDE1LDMuNjA3LTEuNjUyLDMuNTkzLTMuNjQ2Yy0wLjAxNS0xLjk5Ni0xLjY1MS0zLjYwNy0zLjY0Ny0zLjU5Mg0KCQkJCVMyMC43MTIsNDkuMjQ0LDIwLjcyNyw1MS4yNHoiLz4NCgkJPC9nPg0KCQk8Zz4NCgkJCTxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik03My43OCwzNC41MzZjLTAuMDM3LTQuODIyLDMuODU1LTguNzc3LDguNjgtOC44MTRjNC44MjQtMC4wMzcsOC43NzUsMy44NTksOC44MTMsOC42ODINCgkJCQljMC4wMzcsNC44MjQtMy44NTcsOC43NzctOC42ODIsOC44MTNDNzcuNzY5LDQzLjI1Myw3My44MTUsMzkuMzYsNzMuNzgsMzQuNTM2eiBNODYuMTQ3LDM0LjQ0Mw0KCQkJCWMtMC4wMTgtMS45OTYtMS42NTQtMy42MDctMy42NS0zLjU5MmMtMS45OTQsMC4wMTUtMy42MDUsMS42NTEtMy41OTIsMy42NDZjMC4wMTYsMS45OTYsMS42NTIsMy42MDgsMy42NDgsMy41OTINCgkJCQlDODQuNTUsMzguMDc0LDg2LjE1OSwzNi40MzksODYuMTQ3LDM0LjQ0M3oiLz4NCgkJPC9nPg0KCTwvZz4NCjwvZz4NCjwvc3ZnPg0K)
    no-repeat scroll 50% / contain;
}

ul {
  list-style: outside none none !important;
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  font-size: 1rem;
  color: #eceeef;
}

li {
  font-size: 0.9rem;
  float: left;
  padding: 0;
  position: relative;
}

li + li {
  margin-left: 0.2rem;
}

span.i {
  margin-right: 0;
}

span.i::before {
  min-width: 1em;
  text-align: center;
}

.i.arcalive:before {
  display: inline-block;
  content: " ";
  white-space: pre;
  min-width: 1.3em;
  background: transparent
    url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4NCjwhLS0gR2VuZXJhdG9yOiBBZG9iZSBJbGx1c3RyYXRvciAxNi4wLjAsIFNWRyBFeHBvcnQgUGx1Zy1JbiAuIFNWRyBWZXJzaW9uOiA2LjAwIEJ1aWxkIDApICAtLT4NCjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+DQo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4Ig0KCSB3aWR0aD0iMjAwcHgiIGhlaWdodD0iMjAwcHgiIHZpZXdCb3g9IjAgMCAyMDAgMjAwIiBlbmFibGUtYmFja2dyb3VuZD0ibmV3IDAgMCAyMDAgMjAwIiB4bWw6c3BhY2U9InByZXNlcnZlIj4NCjxwYXRoIGZpbGw9IiNGRkZGRkYiIGQ9Ik0xMDAsNkM0OC4wODYsNiw2LDQ4LjA4NCw2LDEwMC4wMDFDNiwxNTEuOTE2LDQ4LjA4NiwxOTQsMTAwLDE5NHM5NC00Mi4wODQsOTQtOTMuOTk5DQoJQzE5NCw0OC4wODQsMTUxLjkxNCw2LDEwMCw2eiBNNjAuMTQsNTcuMTI2YzYuOTIxLDAsMTIuNTM0LDUuNjA4LDEyLjUzNCwxMi41MzNjMCw2LjkyMS01LjYxMiwxMi41MzMtMTIuNTM0LDEyLjUzMw0KCWMtNi45MjQsMC0xMi41MzMtNS42MTItMTIuNTMzLTEyLjUzM0M0Ny42MDcsNjIuNzM1LDUzLjIxNiw1Ny4xMjYsNjAuMTQsNTcuMTI2eiBNNjAuMDU5LDE0NC44Ng0KCWMtNi45MjMsMC0xMi41MzMtNS42MDgtMTIuNTMzLTEyLjUzM2MwLTYuOTE4LDUuNjEtMTIuNTMzLDEyLjUzMy0xMi41MzNjNi45MjMsMCwxMi41MzMsNS42MTUsMTIuNTMzLDEyLjUzMw0KCUM3Mi41OTIsMTM5LjI1Miw2Ni45ODIsMTQ0Ljg2LDYwLjA1OSwxNDQuODZ6IE05NCwxNTcuODMzSDgxdi01MEg0N3YtMTNoNDdWMTU3LjgzM3ogTTEyMiwxNTcuODMzaC0xM3YtMTI1aDEzVjE1Ny44MzN6DQoJIE0xNDEuNjQzLDE0NC44NmMtNi45MjUsMC0xMi41MzUtNS42MDgtMTIuNTM1LTEyLjUzM2MwLTYuOTE4LDUuNjEtMTIuNTMzLDEyLjUzNS0xMi41MzNjNi45MjEsMCwxMi41MzMsNS42MTUsMTIuNTMzLDEyLjUzMw0KCUMxNTQuMTc2LDEzOS4yNTIsMTQ4LjU2MywxNDQuODYsMTQxLjY0MywxNDQuODZ6IE0xNDEuNjQ0LDgyLjE5Yy02LjkyNSwwLTEyLjUzMy01LjYxMi0xMi41MzMtMTIuNTMzDQoJYzAtNi45MjUsNS42MDgtMTIuNTMsMTIuNTMzLTEyLjUzYzYuOTIyLDAsMTIuNTMzLDUuNjA1LDEyLjUzMywxMi41M0MxNTQuMTc3LDc2LjU3OCwxNDguNTY1LDgyLjE5LDE0MS42NDQsODIuMTl6Ii8+DQo8L3N2Zz4NCg==)
    no-repeat scroll 50% / contain;
}

a.arrow-down::after {
  display: inline-block;
  width: 0;
  height: 0;
  margin-left: 0.25rem;
  vertical-align: middle;
  content: "";
  border-top: 0.3em solid;
  border-right: 0.3em solid transparent;
  border-left: 0.3em solid transparent;
}

span.t {
  margin-left: 0.3rem;
}

@media screen and (max-width: 42em) {
  li > a {
    padding: 0.6rem 0.9rem 0.5rem;
  }

  li + li {
    margin-left: 0.2rem;
  }

  li > a > span.t {
    display: none;
  }

  span.i {
    margin-right: 0;
  }
}

@media screen and (max-width: 420px) {
  nav {
    padding: 0 .3rem;
  }

  .main-logo {
    margin-right: .3rem;
  }

  li > a {
    padding: 0.6rem 0.5rem 0.5rem;
  }

  li+li {
    margin-left: 0;
  }

  .member-icon span {
    margin-left: .2rem;
  }
}

.member-icon {
  float: right !important;
}

.member-icon > li {
  position: relative;
  margin-left: 0.5rem;
}

.member-icon > li,
.member-icon > li > a {
  width: 42px;
  height: 42px;
}

.member-icon > li > a {
  padding-top: .3rem;
}

.member-icon span {
    display: inline-block;
    font-size: 1.4rem;
    text-align: center;
    padding-left: .1rem;
}

form > div {
  float: right;
  display: inline-table;
  vertical-align: middle;
  border-collapse: separate;
  font-size: 0.9rem;
}

form > div > span {
  width: auto;
  font-size: 0;
  white-space: nowrap;
  vertical-align: middle;
  display: table-cell;
}

form > div > div {
  display: table-cell;
  position: relative;
  z-index: 999;
  float: left;
  width: 220px;
  height: 2.62rem;
  vertical-align: middle;
  line-height: 1.5;
}

div > span.l > a:first-of-type {
  border-right: 0;
}

input {
  width: 100%;
  height: 100%;
  padding: 0.25rem 0.5rem;
  margin: 0;
  border-radius: 0;
  color: #55595c;
  background-color: #fff;
  background-image: none;
  border: 0.0625rem solid #ccc;
  font-size: 0.9rem;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}

form > div > span.l > a {
  margin-right: -1px;
}

div > span.r > button,
form > div > span.l > a {
  margin: 0;
  height: 2.62rem;
  color: #000;
  font-size: 1.2rem !important;
  padding: 0.25rem 0.5rem;
  border-radius: 0;
  border: 1px solid #ccc;
  border-left-width: 0.0625rem;
  background-color: #fff;
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

span.l > a > span {
  color: black;
}

@media screen and (max-width: 1020px) {
  form > div {
    float: left;
    width: calc(100% + 2rem);
    margin-left: -1rem;
    display: table !important;
    height: 2rem !important;
  }

  form > div > span {
    width: 1%;
  }
  form > div > div {
    width: 100%;
    height: 2.2rem;
  }

  form > div > span.l > a,
  form > div > span.r > button {
    height: 2.2rem;
    padding: 0.15rem 0.5rem 0.35rem;
  }
}

li > div > a:hover {
  background-color: #f5f5f5;
}

.special-feature-menu {
  left: auto;
  right: -6px;
  font-size: .9rem;
  border-radius: 0;
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: none;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0,0,0,.15);
  float: left;
}

.special-feature-menu > a {
  width: 100%;
  font-size: .9rem;
  color: #373a3c !important;
  text-align: inherit;
  background: 0 0;
  border: 0;
  display: block;
  padding: 3px 20px;
  line-height: 1.5;
  white-space: nowrap;
  text-decoration: none;
}

.member-menu {
  left: auto;
  right: 0;
  font-size: 0.9rem;
  border-radius: 0;
  position: absolute;
  top: 100%;
  z-index: 1000;
  display: none;
  min-width: 160px;
  padding: 5px 0;
  margin: 2px 0 0;
  text-align: left;
  list-style: none;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid rgba(0, 0, 0, 0.15);
  float: left;
}

/* 메뉴에서 보이는 화살표를 그리기 위한 css */
.member-menu:before, .member-menu:after,
.special-feature-menu:before, .special-feature-menu:after {
    bottom: 100%;
    border: solid transparent;
    content: " ";
    height: 0;
    width: 0;
    position: absolute;
    pointer-events: none;
}

.member-menu:before, .special-feature-menu:before {
  border-bottom-color: #ccc;
  border-width: 11px;
  left: 1.2rem;
  right: auto;
  left: auto;
  right: 9px;
}

.member-menu:after, .special-feature-menu:after {
  border-bottom-color: #fff;
  border-width: 10px;
  left: 1.25rem;
  right: auto;
  left: auto;
  right: 10px;
}
/* --- */

.member-menu > a {
    width: 100%;
    font-weight: 400;
    color: #373a3c!important;
    text-align: inherit;
    background: 0 0;
    border: 0;
    display: block;
    padding: 3px 20px;
    line-height: 1.5;
    white-space: nowrap;
    text-decoration: none;
    font-size: .9rem
}

.member-menu > div {
  margin-right: 0.5rem;
  line-height: 20px;
  text-align: right;
  color: #373a3c;
}

.member-menu > div > div:first-of-type {
  font-size: 1rem!important;
  font-weight: 700;
}

.member-menu > div > div {
  font-size: .8rem;
  background-color: #fff;
}

.line{
  height: 1px;
  margin: .5rem 0;
  background-color: #e5e5e5;
  overflow: hidden;
}

.active {
  display: block;
}
</style>
