import React, { useState, useRef, useEffect } from 'react'
import StyleEditor from './styleEditor'
import ResumeEditor from './resumeEditor'

export default function mobile() {
  const styleEditor = useRef()
  const resumeEditor = useRef()

  const [interval, setInterval] = useState(40)
  let [currentStyle, setCurrentStyle] = useState('')
  const [enableHtml, setEnableHtml] = useState(false)
  let [currentMarkdown, setCurrentMarkdown] = useState('')
  const [fullMarkdown, setFullMarkdown] = useState(`方应杭
  ----
  
  资深前端工程师，资深前端讲师
  现在在 [饥人谷](http://jirengu.com) 教前端课程。
  
  技能
  ----
  
  * 前端开发
  * Rails 开发
  * Node.js 开发
  * 前端授课
  
  工作经历
  ----
  
  1. [饥人谷](http://jirengu.com)
  2. 腾讯即时通讯平台部
  3. 阿里巴巴B2B部门
  4. 彩程知人项目组
  
  链接
  ----
  
  * [GitHub](https://github.com/frankfang)
  * [我的文章](https://www.zhihu.com/people/zhihusucks/pins/posts)
  
  > 如果你喜欢这个效果，
  Fork [我的项目](https://github.com/jirengu-inc/animating-resume)，打造你自己的简历！
  
  `)
  const [fullStyle, setFullStyle] = useState([
    `/*
  * Inspired by http://strml.net/
  * 大家好，我是方方
  * 二月了，好多公司都在招聘
  * 你是不是也在准备简历呀。
  * 说做就做，我也来写一份简历！
  */
  
  /* 首先给所有元素加上过渡效果 */
  * {
    transition: all .3s;
  }
  /* 白色背景太单调了，我们来点背景 */
  html {
    color: rgb(222,222,222);
    background: rgb(0,43,54);
  }
  /* 文字离边框太近了 */
  .styleEditor {
    padding: .5em;
    border: 1px solid;
    overflow: auto;
    width: 90vw;
    margin: 2.5vh 5vw;
    height: 90vh;
  }
  /* 太高了 */
  .styleEditor {
    height: 45vh;
  }
  /* 代码高亮 */
  .token.selector{
    color: rgb(133,153,0);
  }
  .token.property{
    color: rgb(187,137,0);
  }
  .token.punctuation{
    color: yellow;
  }
  .token.function{
    color: rgb(42,161,152);
  }
  
  /* 加点 3D 效果呗 */
  html{
    perspective: 1000px;
  }
  .styleEditor {
    position: fixed; left: 0; top: 0;
    transform: rotateX(-10deg) translateZ(-50px) ;
  }
  
  /* 接下来我给自己准备一个编辑器 */
  .resumeEditor{
    position: fixed;
    top: 50%; left: 0;
    padding: .5em;  margin: 2.5vh;
    width: 95vw; height: 45vh;
    border: 1px solid;
    background: white; color: #222;
    overflow: auto;
  }
  /* 好了，我开始写简历了 */
  
  
  `,
    `
  /* 这个简历好像差点什么
   * 对了，这是 Markdown 格式的，我需要变成对 HR 更友好的格式
   * 简单，用开源工具翻译成 HTML 就行了
   */
  `,
    `
  /* 再对 HTML 加点样式 */
  .resumeEditor{
    padding: 2em;
  }
  .resumeEditor h2{
    display: inline-block;
    border-bottom: 1px solid;
    margin: 1em 0 .5em;
  }
  .resumeEditor ul,.resumeEditor ol{
    list-style: none;
  }
  .resumeEditor ul> li::before{
    content: '•';
    margin-right: .5em;
  }
  .resumeEditor ol {
    counter-reset: section;
  }
  .resumeEditor ol li::before {
    counter-increment: section;
    content: counters(section, ".") " ";
    margin-right: .5em;
  }
  .resumeEditor blockquote {
    margin: 1em;
    padding: .5em;
    background: #ddd;
  }
  `,
  ])

  const progressivelyShowStyle = (n: number) => {
    return new Promise((resolve, reject) => {
      // let interval = this.interval
      let showStyle = async function () {
        let style = fullStyle[n]
        if (!style) {
          return
        }
        // 计算前 n 个 style 的字符总数
        let length = fullStyle
          .filter((_: any, index: number) => index <= n)
          .map((item) => item.length)
          .reduce((p, c) => p + c, 0)
        let prefixLength = length - style.length
        if (currentStyle.length < length) {
          let l = currentStyle.length - prefixLength
          let char = style.substring(l, l + 1) || ' '
          currentStyle += char
          if (style.substring(l - 1, l) === '\n' && styleEditor.current) {
            this.$nextTick(() => {
              this.$refs.styleEditor.goBottom()
            })
          }
          setTimeout(showStyle, interval)
        } else {
          resolve('')
        }
      }

      showStyle()
    })
  }

  const progressivelyShowResume = () => {
    return new Promise((resolve, reject) => {
      let length = fullMarkdown.length
      let showResume = () => {
        if (currentMarkdown.length < length) {
          currentMarkdown = fullMarkdown.substring(
            0,
            currentMarkdown.length + 1
          )
          let lastChar = currentMarkdown[currentMarkdown.length - 1]
          let prevChar = currentMarkdown[currentMarkdown.length - 2]
          if (prevChar === '\n' && resumeEditor.current) {
            this.$nextTick(() => this.$refs.resumeEditor.goBottom())
          }
          setTimeout(showResume, interval)
        } else {
          resolve('')
        }
      }
      showResume()
    })
  }

  const showHtml = () => {
    return new Promise((resolve, reject) => {
      this.enableHtml = true
      this.$nextTick(() => {
        this.$refs.resumeEditor.goTop()
      })
      resolve('')
    })
  }

  const makeResume = async() => {
    await progressivelyShowStyle(0)
    await progressivelyShowResume()
    await progressivelyShowStyle(1)
    await showHtml()
    await progressivelyShowStyle(2)
  }

  useEffect(()=> {
    makeResume()
  },[])

  return (
    <div>
      <StyleEditor ref={styleEditor} code="currentStyle"></StyleEditor>
      <ResumeEditor
        ref={resumeEditor}
        markdown="currentMarkdown"
        enableHtml="enableHtml"
      ></ResumeEditor>
    </div>
  )
}
