import React from 'react'
import { websocket } from '../../helpers/requests'

export const WSReconnectButton = ({ powerOn }) => {
  const handleReconnect = () => {
    websocket.reconnect()
  }
  return (
    <button title="Reconnect" className="icon-btn" onClick={handleReconnect}>
      {String.fromCodePoint(0x1f50c)}
    </button>
  )
}
