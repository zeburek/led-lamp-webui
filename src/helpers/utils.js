export const title = (string) => {
  const titles = {
    n: 'Name',
    b: 'Brightness',
    s: 'Speed',
    l: 'Scale',
    i: 'Id',
  }
  let title = string in titles ? titles[string] : string
  return title.charAt(0).toUpperCase() + title.slice(1)
}

export const HEXToIntColor = (hexString) => parseInt(hexString.slice(1), 16)

export const IntColorToHEX = (i) => `#${i.toString(16)}`
