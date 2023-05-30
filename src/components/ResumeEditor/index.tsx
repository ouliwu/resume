import React, { useRef, forwardRef, useMemo, useImperativeHandle } from 'react'
import { marked } from 'marked'
import './index.less'

interface IProps {
  enableHtml: boolean
  markdown: any
}
export type ResumeEditorRef = { goBottom: () => void; goTop: () => void }

export const ResumeEditor = forwardRef<ResumeEditorRef, IProps>(
  (props, ref) => {
    const resumeEditorRef = useRef<HTMLDivElement>()
    const { enableHtml, markdown } = props

    const result = useMemo(() => {
      if (enableHtml) {
        return marked(markdown, { headerIds: false })
      }

      return markdown
    }, [enableHtml, markdown])

    useImperativeHandle(ref, () => ({
      goBottom: () => {
        if (resumeEditorRef?.current) {
          resumeEditorRef.current.scrollTop = 100000
        }
      },
      goTop: () => {
        if (resumeEditorRef?.current) {
          resumeEditorRef.current.scrollTop = 0
        }
      },
    }))

    return (
      <div id="resumeEditor" ref={resumeEditorRef}>
        {enableHtml ? (
          <div dangerouslySetInnerHTML={{ __html: result }}></div>
        ) : (
          <pre>{result}</pre>
        )}
      </div>
    )
  }
)

export default ResumeEditor
