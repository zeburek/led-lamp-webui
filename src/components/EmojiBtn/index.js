import React from 'react'

export const EmojiBtn = ({ title, onClick, children }) => (
  <button title={title} className="icon-btn" onClick={onClick}>
    {children}
  </button>
)
