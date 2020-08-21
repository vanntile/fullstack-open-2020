import React from 'react'
import { useSelector } from 'react-redux'

export const Notification = () => {
  const notification = useSelector((state) => state.notification)
  return notification ? <div className={notification.styleClass || 'notificationbad'}>{notification.message}</div> : ''
}
