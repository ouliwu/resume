import React, { useRef, useState, useEffect } from 'react'
import Prism from 'prismjs'

export default function styleEditor() {
  const { code } = this.props
  const container = useRef()

  const highlightedCode = () => {
    Prism.highlight(code, Prism.languages.css,'css')
  }
  const codeInStyleTag = () => {
    return `<style>${this.code}</style>`
  }

  const getBottom = () => {
    this.container.current.scrollTop = 100000
  }

  return (
    <div className="styleEditor" ref={container}>
      <div
        className="code"
        dangerouslySetInnerHTML={{ __html: codeInStyleTag }}
      ></div>
      <pre dangerouslySetInnerHTML={{ __html: highlightedCode }}></pre>
    </div>
  )
}
