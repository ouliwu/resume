import React, { useRef, useState } from 'react'

export default function resumeEditor() {
  const container = useRef()

  const getBottom = () => {
    container.current.scrollTop = 10000
  }

  const getTop = () => {
    container.current.scrollTop = 0
  }

  return (
    <div className="resumeEditor" ref={container}>
      resumeEditor
    </div>
  )
}
