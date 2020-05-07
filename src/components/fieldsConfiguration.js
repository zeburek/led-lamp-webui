export const fieldsConf = {
  effects: {
    "n": {
      disabled: true,
      type: "text",
    },
    "s": {
      type: "range",
      min: 0,
      max: 255,
    },
    "l": {
      type: "range",
      min: 0,
      max: 100,
    },
    "b": {
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
