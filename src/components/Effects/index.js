import React, { useEffect, useState } from 'react'
import { EffectsPicker } from './components/EffectsPicker'
import { EffectControl } from './components/EffectControls'
import { sendWSEvent } from '../../helpers/requests'
import { EVENTS } from '../../helpers/constants'

export const Effects = ({ activeWSEffect }) => {
  const [effects, setEffects] = useState([])
  const [activeEffect, setActiveEffect] = useState(activeWSEffect)

  useEffect(() => {
    let fetchEffects = async () => {
      try {
        let response = await fetch('/effects.json')
        if (response.ok) {
          let text = await response.text()
          try {
            setEffects(JSON.parse(text))
          } catch (e) {
            console.log(e)
          }
        } else {
          console.log('Error loading settings: ' + response.status)
        }
      } catch (e) {
        console.log(e)
      }
    }

    fetchEffects()
  }, [])

  useEffect(() => {
    if (activeWSEffect !== activeEffect) {
      setActiveEffect(activeWSEffect)
    }
  }, [activeWSEffect]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (activeWSEffect !== activeEffect) {
      sendWSEvent(EVENTS.activeEffect, activeEffect)
    }
  }, [activeEffect]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="grid-container-layout">
      <EffectControl
        effect={effects[activeEffect]}
        activeEffect={activeEffect}
        setEffects={setEffects}
      />
      <EffectsPicker
        effects={effects}
        activeEffect={activeEffect}
        setActiveEffect={setActiveEffect}
      />
    </div>
  )
}
