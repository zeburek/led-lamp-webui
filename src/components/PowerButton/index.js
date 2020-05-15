import React from 'react'
import { sendWSEvent } from '../../helpers/requests'
import { EVENTS } from '../../helpers/constants'

export const PowerButton = ({ powerOn }) => {
  const handleManagePower = () => {
    sendWSEvent(EVENTS.working, !powerOn)
  }

  const title = powerOn ? 'Turn off' : `Turn on`

  return (
    <button title={title} className="icon-btn" onClick={handleManagePower}>
      {String.fromCodePoint(0x26A1)}
    </button>
  )
}
