import React, { useEffect, useMemo, useState } from 'react'
import { HEXToIntColor, title } from '../../../../helpers/utils'
import { calcInputProps, calcInputValue } from '../../../fieldsConfiguration'
import { sendWSEvent } from '../../../../helpers/requests'
import { EVENTS } from '../../../../helpers/constants'

const Control = ({ effectKey, value, handleChangeForm }) => {
  const memoizedProps = useMemo(() => calcInputProps(effectKey, value), [
    effectKey,
    value,
  ])

  const inputValue = calcInputValue(effectKey, value)

  return (
    <div>
      <h3>
        {title(effectKey)}: <span className="text-secondary">{value}</span>
      </h3>
      <input
        placeholder={title(effectKey)}
        name={effectKey}
        value={inputValue}
        onChange={handleChangeForm}
        {...memoizedProps}
      />
    </div>
  )
}

export const EffectControl = ({ effect = {}, setEffects, activeEffect }) => {
  const [formState, setFormState] = useState({ ...effect })

  useEffect(() => setFormState(effect), [effect])

  useEffect(() => {
    const handler = setTimeout(() => {
      sendWSEvent(EVENTS.effects, formState)
      setEffects((prevEffects) => {
        return prevEffects.map((item, index) => {
          if (index === activeEffect) return formState
          return item
        })
      })
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [formState])

  const handleChangeForm = (e) => {
    let value
    switch (e.target.type) {
      case 'checkbox':
        value = e.target.checked
        break
      case 'color':
        value = HEXToIntColor(e.target.value)
        break
      case 'range':
        value = parseInt(e.target.value)
        break
      default:
        value = e.target.value
    }
    setFormState({ ...formState, [e.target.name]: value })
  }

  return (
    <div>
      <h2>Effect control</h2>
      <div>
        {Object.keys(effect).map((key) => (
          <Control
            key={key}
            effectKey={key}
            value={formState[key]}
            handleChangeForm={handleChangeForm}
          />
        ))}
      </div>
    </div>
  )
}
