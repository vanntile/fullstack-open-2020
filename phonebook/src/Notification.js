import React from 'react'

export const Notification = ({ message, styleClass }) => {
  if (message === null) {
    return null
  }
  return <div className={styleClass}>{message}</div>
}
