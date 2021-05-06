/*
调整参数缩放比
仅针对数字参数，16进制和字符串参数不做调整
 */
export function changeRatio(style, ratio) {
  for (const i in style) {
    if (typeof style[i] === 'number') {
      style[i] = style[i] * ratio
    }
  }
  return style
}

export function generateUuid() {
  const s = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4'
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1)
  s[8] = s[13] = s[18] = s[23] = '-'
  const uuid = s.join('')
  return uuid
}
