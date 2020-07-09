import React from 'react'
import { websocket } from '../../helpers/requests'
import { EmojiBtn } from '../EmojiBtn'

export const WSReconnectButton = ({ powerOn }) => {
  const handleReconnect = () => {
    websocket.reconnect()
  }
  return (
    <EmojiBtn title="Reconnect" onClick={handleReconnect}>
      {String.fromCodePoint(0x1f50c)}
    </EmojiBtn>
  )
}
