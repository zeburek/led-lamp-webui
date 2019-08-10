export const fieldsConf = {
  effects: {
    "name": {
      disabled: true,
      type: "text",
    },
    "speed": {
      type: "range",
      min: 0,
      max: 255,
    },
    "scale": {
      type: "range",
      min: 0,
      max: 100,
    },
    "brightness": {
      type: "range",
      min: 0,
      max: 255,
    }
  },
  alarms: {
    "time": {
      type: "time",
    },
    "color": {
      type: "text",
    },
    "enabled": {
      type: "checkbox",
    },
  }
};