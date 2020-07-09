import React from 'react'
import { PowerButton } from '../PowerButton'
import { WSReconnectButton } from '../WSReconnectButton'
import { UpdateModal } from '../UpdateModal'
import { EmojiBtn } from '../EmojiBtn'

export const Header = ({ powerOn, webSocketConnection }) => (
  <div className={`header ${webSocketConnection ? 'active' : 'disconnected'}`}>
    <div className="container">
      <div className="grid-container-layout">
        <h1 className="heading">LED - {powerOn ? 'working' : 'not working'}</h1>
        <div>
          <WSReconnectButton />
          <PowerButton powerOn={powerOn} />
          <UpdateModal />
          <EmojiBtn
            title="Update"
            className="icon-btn"
            onClick={() => {
              window.location.href = '/wifi.html'
            }}
          >
            {String.fromCodePoint(0x1f4e1)}
          </EmojiBtn>
        </div>
      </div>
    </div>
  </div>
)
