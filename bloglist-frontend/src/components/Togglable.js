import React, { useState, useImperativeHandle } from 'react'
import Button from 'react-bootstrap/Button'

export const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return { toggleVisibility }
  })

  return (
    <span>
      <span style={hideWhenVisible}>
        <Button size="sm" onClick={toggleVisibility}>
          {props.buttonLabel}
        </Button>
      </span>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="secondary" size="sm" className="mx-2" onClick={toggleVisibility}>
          cancel
        </Button>
      </div>
    </span>
  )
})
