<template lang="pug">
div
  div.r
    div.tooltip
      router-link(:to="`/member/star/` + articleTitle", data-original-title="null")
        span.icon.ion-ios-star-outline
        |  0
      router-link(:to="`/backlink/` + articleTitle") 역링크
      router-link(:to="`/discuss/` + articleTitle") 토론
      router-link(:to="`/edit/` + articleTitle") 편집
      router-link(:to="`/history/` + articleTitle") 역사
      router-link(:to="`/acl/` + articleTitle") ACL
  h1
    router-link(:to="`/w/`+ articleTitle" ) {{ articleTitle }}
  p.recent-change-time 최근 수정 시각:
    time(:datetime="test.recentChangeTime")  2020-10-25 16:39:00
  template(v-for="view, index in viewList")
    template(v-if="view.type === 'wiki-paragraph'")
      wiki-view(:tag="view.tag", :custom-class="view.type", :item-list="view.itemList")
    template(v-else-if="view.type === 'wiki-heading'")
      wiki-heading(:attribute="view.attribute", :is-folded="view.isFolded", @fold-event="headingFoldEvent(index)")
      div.wiki-heading-content(:class="{ 'wiki-heading-content-folded' : view.isFolded }")
        template(v-for="inView in view.inViewList")
          wiki-view(:tag="inView.tag", :custom-class="inView.type", :item-list="inView.itemList")
  br
  wiki-footnote(:footnote-list="footnoteList")
</template>

<script>
import testJson from '../assets/test.json'
import tagCheckJson from '../assets/tagCheck.json'
import wikiView from './wiki/View.vue'
import wikiFootnote from './wiki/Footnote.vue'
import wikiHeading from './wiki/Heading.vue'
import { mapState, mapMutations } from 'vuex'
import { cloneDeep } from 'lodash' // 깊은 복사를 위한 lodash import (merge as mergeDeep)

export default {
  name: 'wiki',
  metaInfo: {
    title: 'Wiki'
  },
  components: {
    wikiView, wikiFootnote, wikiHeading
  },
  data () {
    return {
      tagCheck: tagCheckJson.tag,
      test: testJson,
      wikiObjectModel: {
        plain: {
          type: 'plain',
          text: ''
        },
        link: {
          type: 'link',
          text: '',
          url: '',
          title: ''
        },
        anchor: {
          type: 'anchor',
          text: '',
          url: '',
          id: ''
        },
        tag: {
          type: 'tag',
          tag: '',
          inItemList: []
        }
      },
      wikiViewModel: {
        paragraph: {
          type: 'wiki-paragraph',
          tag: 'div',
          itemList: []
        },
        heading: {
          type: 'wiki-heading',
          attribute: {
            titleItemList: [],
            titleId: '',
            headSizeTag: 'h1',
            headNumber: '1',
            sectionNumber: 0
          },
          isFolded: false,
          inViewList: []
        }
      },
      headList: [[], [], [], [], [], []],
      headData: {
        viewIndex: -1,
        titleId: '',
        overlapCount: 0
      },
      viewList: [],
      footnoteList: []
    }
  },
  methods: {
    headingFoldEvent (index) {
      this.viewList[index].isFolded = this.viewList[index].isFolded === false
    },

    ...mapMutations(['setArticleTitle']),

    parseLink (line) {
      const parseLink = [] // 링크 파싱이 된 줄
      // 이 줄에 링크 문법이 존재하는 경우.
      // link 변수의 값에 따라 링크인지 아닌지 구분된다.
      while (line.indexOf('[[') !== -1 && (line.indexOf('[[') < line.indexOf(']]'))) { // 여전히 링크 문법이 존재한다면
        // 링크가 아닌 부분을 잘라서 plain 표시하여 객체에 넣는다.
        const notLink = {
          type: 'plain',
          text: line.substring(0, line.indexOf('[['))
        }
        if (notLink.text !== '') { // 링크가 아닌 부분이 비어있지 않다면
          parseLink.push(notLink) // 배열에 넣는다.
        }
        // 링크인 부분을 잘라서 link 표시하여 객체에 넣는다.
        const link = {
          type: 'link',
          text: line.substring(line.indexOf('[[') + 2, line.indexOf(']]')),
          url: '/w/',
          title: line.substring(line.indexOf('[[') + 2, line.indexOf(']]'))
        }
        if (link.text.indexOf('|') !== -1) {
          let title = link.text.substring(0, link.text.indexOf('|'))
          if (title !== '') {
            link.title = title
          }
          let text = link.text.substring(link.text.indexOf('|') + 1, link.text.length)
          if (text === '') {
            link.text = title
          } else {
            link.text = text
          }
        }
        link.url += link.title //
        parseLink.push(link) // 그리고 배열에 넣는다.
        // 그리고 나머지 부분을 잘라낸다
        line = line.substring(line.indexOf(']]') + 2, line.length)
      }
      // 남은 부분을 링크가 아닌 것으로 plain 표시하여 객체에 넣는다.
      const last = {
        type: 'plain',
        text: line
      }
      if (last.text !== '') { // 마지막 부분이 비어있지 않다면
        parseLink.push(last) // 배열에 넣는다.
      }

      return parseLink
    },

    parseFootNote (list) { // 각주 파싱 메소드
      for (let i = 0; i < list.length; i++) {
        if (list[i].type === 'plain') {
          let startIndex = list[i].text.indexOf('[*')
          while (startIndex !== -1) {
            const start = {
              lineIndex: parseInt(i),
              letterIndex: parseInt(startIndex)
            }

            for (let n = start.lineIndex; n < list.length; n++) {
              if (list[n].type === 'plain') {
                let endIndex = n === start.lineIndex ? list[n].text.indexOf(']', start.letterIndex + 1) : list[n].text.indexOf(']')
                let parsed = false
                while (endIndex !== -1) {
                  const end = {
                    lineIndex: parseInt(n),
                    letterIndex: parseInt(endIndex)
                  }

                  let startCount = 0
                  let endCount = 0
                  for (let d = start.lineIndex; d <= end.lineIndex; d++) {
                    if (list[d].type === 'plain') {
                      let startLetter = -1
                      if (d === start.lineIndex) {
                        startLetter = start.letterIndex
                      }
                      let nextStart = list[d].text.indexOf('[*', startLetter + 1)
                      while (nextStart !== -1) {
                        if (d === end.lineIndex && end.letterIndex < nextStart) {
                          break
                        } else {
                          startCount += 1
                        }
                        nextStart = list[d].text.indexOf('[*', nextStart + 1)
                      }

                      let nextEnd = list[d].text.indexOf(']', startLetter + 1)
                      while (nextEnd !== -1) {
                        if (d === end.lineIndex && end.letterIndex <= nextEnd) {
                          break
                        } else {
                          endCount += 1
                        }
                        nextEnd = list[d].text.indexOf(']', nextEnd + 1)
                      }
                    }
                  }

                  if (startCount === endCount) {
                    const footnotes = this.seperateFootnote(list, start, end) // 각주에 해당하는 내용을 분할해서 저장
                    this.parseTag(footnotes)
                    this.footnoteList.push(footnotes) // 각주 배열에 넣는다
                    if (startCount !== 0) { // 만약 개수가 0으로 동일하지 않았다면, 분할된 내용 안에 각주의 내용이 존재하고 있음을 알 수 있다
                      const footNotePosition = this.footNoteList.length - 1
                      this.parseFootNote(footnotes) // 분할된 내용을 다시 각주 분할한다
                      this.footNoteList.splice(footNotePosition, 1, footnotes) //
                    }
                    parsed = true
                    break
                  }

                  endIndex = list[n].text.indexOf(']', endIndex + 1)
                }
                if (parsed === true) {
                  break
                }
              }
            }
            startIndex = list[i].text.indexOf('[*', startIndex + 1)
          }
        }
      }
    },
    seperateFootnote (list, start, end) {
      const footnotes = []
      if (start.lineIndex === end.lineIndex) {
        let footNote = {
          type: 'plain',
          text: list[start.lineIndex].text.substring(start.letterIndex + 2, end.letterIndex)
        }
        const last = list[start.lineIndex].text.substring(end.letterIndex + 1, list[start.lineIndex].length)
        list[start.lineIndex].text = list[start.lineIndex].text.substring(0, start.letterIndex)
        if (last !== '') {
          list.splice(start.lineIndex + 1, 0, {type: 'plain', text: last})
        }
        footnotes.push(footNote)
      } else {
        const loopCount = end.lineIndex - start.lineIndex
        for (let d = 0; d <= loopCount; d++) {
          let footNote = cloneDeep(list[start.lineIndex + d])
          if (d === 0) {
            footNote.text = list[start.lineIndex].text.substring(start.letterIndex + 2, list[start.lineIndex].length)
            list[start.lineIndex].text = list[start.lineIndex].text.substring(0, start.letterIndex)
          } else if (d === loopCount) {
            footNote.text = list[end.lineIndex].text.substring(0, end.letterIndex)
            list[end.lineIndex].text = list[end.lineIndex].text.substring(end.letterIndex + 1, list[end.lineIndex].length)
          } else {
            footNote.type = list[start.lineIndex + d].type
            footNote.text = list[start.lineIndex + d].text
            if (footNote.type === 'link') {
              footNote.url = list[start.lineIndex + d].url
              footNote.title = list[start.lineIndex + d].title
            }
          }
          footnotes.push(footNote)
        }
        list.splice(start.lineIndex + 1, loopCount - 1)
      }

      const anchorNumber = this.footnoteList.length + 1
      const enter = footnotes[0].text.indexOf(' ')
      let anchorText = footnotes[0].text.substring(0, enter)
      if (anchorText === '' && enter === 0) {
        anchorText = anchorNumber
      } else if (anchorText === '' && enter === -1) {
        anchorText = footnotes[0].text
        footnotes[0].text = ''
      } else {
        footnotes[0].text = footnotes[0].text.substring(footnotes[0].text.indexOf(' '), footnotes[0].text.length)
      }
      let anchor = {
        type: 'anchor',
        text: '[' + anchorText + ']',
        url: '#fn-' + anchorText,
        id: 'rfn-' + anchorNumber
      }
      list.splice(start.lineIndex + 1, 0, anchor)

      let reAnchor = {
        type: 'anchor',
        text: '[' + anchorText + ']',
        url: '#rfn-' + anchorNumber,
        id: 'fn-' + anchorText
      }
      footnotes.unshift(reAnchor)

      return footnotes
    },

    hasTag (line) {
      const tagStartList = this.tagCheck.reduce((acc, cur) => {
        const index = line.text.indexOf(cur.syntax)
        if (index !== -1) {
          const tag = Object.assign({}, cur, {startIndex: index})
          acc.push(tag)
        }
        return acc
      }, [])

      tagStartList.sort((a, b) => {
        return a.startIndex - b.startIndex
      })

      return tagStartList
    },
    parseTag (list) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].type === 'plain') {
          const tagStartList = this.hasTag(list[i])
          for (let n = 0; n < tagStartList.length; n++) {
            let parsed = false
            for (let d = i; d < list.length; d++) {
              if (list[d].type === 'plain') {
                let endIndex = d === i ? list[d].text.indexOf(tagStartList[n].syntax, tagStartList[n].startIndex + tagStartList[n].interval) : list[d].text.indexOf(tagStartList[n].syntax)
                if (endIndex !== -1) {
                  const tag = Object.assign({}, tagStartList[n], {endIndex: endIndex})
                  const inTag = this.seperateTagList(list, i, d, tag)
                  list.splice(i + 1, 0, inTag)
                  this.parseTag(inTag.inItemList)
                  parsed = true
                  break
                }
              }
            }
            if (parsed === true) {
              break
            }
          }
        }
      }
    },
    seperateTagList (list, start, end, tag) {
      const tagList = []
      if (start === end) {
        let data = {
          type: 'plain',
          text: list[start].text.substring(tag.startIndex + tag.interval, tag.endIndex)
        }
        const last = list[start].text.substring(tag.endIndex + tag.interval, list[start].length)
        list[start].text = list[start].text.substring(0, tag.startIndex)
        if (last !== '') {
          list.splice(start + 1, 0, {type: 'plain', text: last})
        }
        tagList.push(data)
      } else {
        const loopCount = end - start
        for (let d = 0; d <= loopCount; d++) {
          let data = cloneDeep(list[start + d])
          if (d === 0) {
            data.text = list[start].text.substring(tag.startIndex + tag.interval, list[start].length)
            list[start].text = list[start].text.substring(0, tag.startIndex)
          } else if (d === loopCount) {
            data.text = list[end].text.substring(0, tag.endIndex)
            list[end].text = list[end].text.substring(tag.endIndex + tag.interval, list[end].length)
          } else {
            data.type = list[start + d].type
            data.text = list[start + d].text
            if (data.type === 'link') {
              data.url = list[start + d].url
              data.title = list[start + d].title
            } else if (data.type === 'anchor') {
              data.url = list[start + d].url
              data.id = list[start + d].id
            }
          }
          tagList.push(data)
        }
        list.splice(start + 1, loopCount - 1)
      }

      const inTag = {
        type: 'tag',
        tag: tag.code,
        inItemList: tagList
      }

      return inTag
    },

    parseView (list) {
      let newView = cloneDeep(this.wikiViewModel.paragraph)

      if (list[0].type === 'plain' && list[0].text.indexOf('=') === 0) {
        const headSize = this.isHeading(list)
        if (headSize > 0) {
          newView = this.parseHead(list, headSize)
        }
      } else {
        newView.itemList.push(...list)
      }

      return newView
    },
    isHeading (list) {
      if (list[0].type === 'plain' && list[list.length - 1].type === 'plain') {
        const start = list[0].text
        const reverseEnd = list[list.length - 1].text.split('').reverse().join('')
        if (start.indexOf(`= `) === 0 && reverseEnd.indexOf('= ') === 0) {
          return 1
        } else if (start.indexOf(`== `) === 0 && reverseEnd.indexOf('== ') === 0) {
          return 2
        } else if (start.indexOf(`=== `) === 0 && reverseEnd.indexOf('=== ') === 0) {
          return 3
        } else if (start.indexOf(`==== `) === 0 && reverseEnd.indexOf('==== ') === 0) {
          return 4
        } else if (start.indexOf(`===== `) === 0 && reverseEnd.indexOf('===== ') === 0) {
          return 5
        } else if (start.indexOf(`====== `) === 0 && reverseEnd.indexOf('====== ') === 0) {
          return 6
        }
      }
      return -1
    },
    parseHead (list, headSize) {
      const head = cloneDeep(this.wikiViewModel.heading)

      let parseWord = ''
      switch (headSize) {
        case 1 : {
          parseWord = '= '
          break
        }
        case 2 : {
          parseWord = '== '
          break
        }
        case 3 : {
          parseWord = '=== '
          break
        }
        case 4 : {
          parseWord = '==== '
          break
        }
        case 5 : {
          parseWord = '===== '
          break
        }
        case 6 : {
          parseWord = '====== '
          break
        }
      }
      head.attribute.titleItemList = list.reduce((acc, cur, i) => {
        if (i === 0) {
          if (list.length !== 1) {
            cur.text = cur.text.substring(cur.text.indexOf(parseWord) + parseWord.length, cur.text.length)
          } else {
            cur.text = cur.text.substring(cur.text.indexOf(parseWord) + parseWord.length, cur.text.indexOf(parseWord.split('').reverse().join('')))
          }
        } else if (i === list.length - 1) {
          cur.text = cur.text.substring(0, cur.text.indexOf(parseWord.split('').reverse().join('')))
        }
        acc.push(cur)
        return acc
      }, [])
      head.attribute.titleId = this.generateTitleId(head.attribute.titleItemList)
      head.attribute.headNumber = this.generateHeadNumber(head.attribute.titleId, headSize)
      head.attribute.headSizeTag = 'h' + headSize
      head.attribute.sectionNumber = this.headListLength() + 1

      return head
    },
    generateTitleId (list) {
      let titleId = this.combineTitleList(list)

      for (let i = 0; i < this.headList.length; i++) {
        let isExist = false
        for (let n = 0; n < this.headList[i].length; n++) {
          if (this.headList[i][n].titleId === titleId) {
            titleId += '_' + (this.headList[i][n].overlapCount + 2)
            this.headList[i][n].overlapCount += 1
            isExist = true
            break
          }
        }
        if (isExist === true) {
          break
        }
      }

      return titleId
    },
    combineTitleList (list) {
      const combinedTitle = list.reduce((acc, cur) => {
        if (cur.type === 'tag') {
          acc += this.combineTitleList(cur.inItemList)
        } else {
          acc += cur.text
        }
        return acc
      }, '')

      return combinedTitle
    },
    generateHeadNumber (titleId, headSize) {
      const headData = cloneDeep(this.headData)
      headData.viewIndex = this.viewList.length
      headData.titleId = titleId
      this.headList[headSize - 1].push(headData)

      let headNumber = ''
      for (let i = 0; i < headSize; i++) {
        headNumber += (this.headList[i].length) + '.'
      }

      return headNumber
    },
    headListLength () {
      const length = this.headList.reduce((acc, cur) => {
        acc += cur.length
        return acc
      }, 0)

      return length
    }
  },
  created () {
    /*
    let view = cloneDeep(this.wikiViewModel.paragraph)
    // view.attribute.titleItemList.push({type: 'plain', text: '개요 '})
    // view.attribute.titleItemList.push({type: 'tag', tag: 'del', inItemList: [{type: 'plain', text: '필요치 않아요'}]})
    // view.attribute.title = this.generateHeadTitle(view.attribute.titleItemList)
    view.itemList.push({type: 'plain', text: 'hi'})
    this.viewList.push(view)
    */
    this.setArticleTitle(this.test.title)
    const list = this.test.content.split(`\\n`) // \\n 줄바꿈 기준으로 내용을 분할
    let view = cloneDeep(this.wikiViewModel.paragraph)
    for (const line of list) { // 한줄씩 파싱한다.
      if (line.length > 0) {
        const parsedLine = this.parseLink(line)
        this.parseFootNote(parsedLine)
        this.parseTag(parsedLine)
        const newView = this.parseView(parsedLine)
        if ((view.type === 'wiki-heading' && view.type === newView.type) || (view.type !== 'wiki-heading' && view.type !== newView.type)) {
          this.viewList.push(view)
          view = newView
        } else if (view.type === 'wiki-heading') {
          if (view.inViewList.length === 0 || view.inViewList[view.inViewList.length - 1].type !== newView.type) {
            view.inViewList.push(newView)
          } else {
            view.inViewList[view.inViewList.length - 1].itemList.push(...parsedLine)
          }
        } else {
          view.itemList.push(...parsedLine)
        }
      }
      // 한 줄이 끝났음을 표현한 데이터를 추가
      if (view.type !== 'wiki-heading') {
        view.itemList.push({type: 'tag', tag: 'br'})
      } else {
        if (view.inViewList.length !== 0) {
          view.inViewList[view.inViewList.length - 1].itemList.push({type: 'tag', tag: 'br'})
        }
      }
    }
    this.viewList.push(view) // 최종적으로 남은 view를 viewList에 넣는다
  },
  computed: {
    ...mapState(['articleTitle'])
  }
}
</script>

<style scoped>
a {
  text-decoration: none;
}

h1 {
  margin-top: 0;
}

h1 > a {
  color: black;
  font-size: 2.2rem;
  margin: 0 0 2rem;
  font-weight: 700;
  line-height: 1.1;
}

.r {
  float: right;
}

.tooltip {
  display: flex;
}

.tooltip a {
  border : .0625rem solid #ccc;
  padding: 0.3rem 0.8rem;
  color: black
}

.tooltip a + a {
  border-left-style: none;
}

.recent-change-time {
  font-size: .85rem;
  margin-top: -1rem;
  margin-bottom: 1rem;
  text-align: right;
}

@media screen and (max-width: 1020px) {
  h1 {
    margin-top: 1rem;
  }

  .r {
    margin: -.7rem -.7rem 0;
    float: none;
    border-bottom: .0625rem solid #ccc;
  }

  .tooltip {
    justify-content: flex-end;
  }

  .tooltip a {
    border-top-style: none;
    border-bottom-style: none;
  }
}

.wiki-heading-content-folded {
  display: none;
}
</style>
