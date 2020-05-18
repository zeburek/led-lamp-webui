import React from 'react'
import { sendWSEvent } from '../../helpers/requests'
import { EVENTS } from '../../helpers/constants'
import { EmojiBtn } from '../EmojiBtn'

export const PowerButton = ({ powerOn }) => {
  const handleManagePower = () => {
    sendWSEvent(EVENTS.working, !powerOn)
  }

  const title = powerOn ? 'Turn off' : `Turn on`

  return (
    <EmojiBtn title={title} onClick={handleManagePower}>
      {powerOn ? String.fromCodePoint(0x26d4) : String.fromCodePoint(0x26a1)}
    </EmojiBtn>
  )
}
