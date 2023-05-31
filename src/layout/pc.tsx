import React, { useState, useRef, useEffect } from 'react'
import { ResumeEditor, ResumeEditorRef } from '../components'
import resumeTxt from '../config/resume.md'

export default function pc() {
  const interval: number = Number(process.env.interval || 0)
  const [enableHtml, setEnableHtml] = useState<boolean>(false)
  const [currentMarkdown, setCurrentMarkdown] = useState<string>('')
  const resumeEditorRef = useRef<ResumeEditorRef>()
  const cMdStrCount = useRef<number>(0)
  const resumeTimer = useRef<NodeJS.Timeout>()

  const progressivelyShowResume = () => {
    const resumeStr = resumeTxt.toString()
    return new Promise((resolve) => {
      let length = resumeStr.length
      let showResume = () => {
        if (cMdStrCount.current < length) {
          let currentStr = resumeStr.substring(0, cMdStrCount.current + 1)
          cMdStrCount.current = currentStr.length
          setCurrentMarkdown(currentStr)
          resumeTimer.current = setTimeout(showResume, interval)
        } else {
          if (resumeEditorRef?.current) {
            resumeEditorRef.current.goBottom()
          }
          clearTimeout(resumeTimer.current)
          resolve(true)
        }
      }
      showResume()
    })
  }

  const showHtml = () => {
    return new Promise((resolve) => {
      setEnableHtml(true)
      resolve(true)
    })
  }

  const makeResume = async () => {
    await progressivelyShowResume()
    await showHtml()
  }

  useEffect(() => {
    makeResume()
  }, [])

  return (
    <div id="app">
      <ResumeEditor
        ref={resumeEditorRef}
        enableHtml={enableHtml}
        markdown={currentMarkdown}
      />
    </div>
  )
}
