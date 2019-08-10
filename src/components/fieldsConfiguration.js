export const fieldsConf = {
  effects: {
    "name": {
      disabled: true,
      type: "text",
    },
    "speed": {
      type: "number",
      min: 0,
      max: 255,
    },
    "scale": {
      type: "number",
      min: 0,
      max: 100,
    },
    "brightness": {
      type: "number",
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