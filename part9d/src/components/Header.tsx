import React from 'react'

interface HeaderProps {
  text: String
}

export const Header: React.FC<HeaderProps> = ({ text }) => {
  return <h1>{text}</h1>
}
