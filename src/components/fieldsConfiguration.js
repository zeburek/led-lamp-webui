import { IntColorToHEX } from '../helpers/utils'

export const fieldsConf = {
  effects: {
    i: {
      disabled: true,
      type: 'text',
    },
    n: {
      disabled: true,
      type: 'text',
    },
    s: {
      type: 'range',
      min: 0,
      max: 255,
    },
    l: {
      type: 'range',
      min: 0,
      max: 100,
    },
    b: {
      type: 'range',
      min: 0,
      max: 255,
    },
  },
  alarms: {
    time: {
      type: 'time',
    },
    color: {
      type: 'text',
    },
    enabled: {
      type: 'checkbox',
    },
  },
}

export const calcInputProps = (key, value) => {
  const inputProps = fieldsConf.effects[key]
  if (key.toLowerCase().includes('color'))
    return {
      type: 'color',
    }
  if (!inputProps && Number.isInteger(value)) {
    return {
      type: 'range',
      min: 0,
      max: 255,
    }
  }
  if (!inputProps && typeof value === `boolean`) {
    return {
      type: 'checkbox',
    }
  }
  return inputProps
}

export const calcInputValue = (key, value) => {
  if (key.toLowerCase().includes('color'))
    return value ? IntColorToHEX(value) : value
  return value
}
