import { changeRatio } from '../utils'

/*
canvasId：  canvas dom 元素的 id

y：         input 在画布中的 y 坐标
x：         input 在画布中的 x 坐标

width：     input 宽度
height：    input 高度
radius：    input 圆角
inputStyle：输入框样式
  lineWidth：    边框线宽，当 lineWidth 为 0 时则没有边框
  fontSize：     字体大小

multiple：  canvas 画布尺寸与 dom 元素尺寸间的比值，目的是解决显示模糊的问题
ratio：     缩放比，如 1000px 的页面放在 500px 中，其缩放比就是 0.5
 */
export default function canvasComponentOfTextInput(
  canvasId,
  x, y,
  width, height, radius, inputStyleOld,
  multiple = 4, ratio = 1) {
  // 获取 dom 元素
  const canvasDom = document.getElementById(canvasId)
  const context = canvasDom.getContext('2d')

  // 深拷贝，避免修改原数据
  const inputStyle = JSON.parse(JSON.stringify(inputStyleOld))

  // 参数整理
  if (inputStyle.lineWidth === undefined) inputStyle.lineWidth = 2
  inputStyle.x = x
  inputStyle.y = y
  inputStyle.radius = radius
  inputStyle.width = width
  inputStyle.height = height
  inputStyle.paddingLeft = inputStyle.paddingLeft !== undefined ? inputStyle.paddingLeft : inputStyle.x + inputStyle.lineWidth * 2
  changeRatio(inputStyle, multiple)
  // 字体不做放大，其单位是页面的像素，不是 canvas 中的像素
  inputStyle.fontSize = inputStyle.fontSize !== undefined ? inputStyle.fontSize : height * 0.5
  inputStyle.borderColor !== undefined ? context.strokeStyle = inputStyle.borderColor : context.strokeStyle = '#BEBEBE'
  inputStyle.backgroundColor !== undefined ? context.fillStyle = inputStyle.backgroundColor : context.fillStyle = '#fff'

  // 调整页面显示的缩放比
  changeRatio(inputStyle, ratio)

  // 外边框画线
  context.lineWidth = inputStyle.lineWidth
  context.arc(inputStyle.x + inputStyle.radius, inputStyle.y + inputStyle.radius, inputStyle.radius, 1 * Math.PI, 1.5 * Math.PI)
  context.lineTo(inputStyle.x + inputStyle.width - inputStyle.radius, inputStyle.y)
  context.arc(inputStyle.x + inputStyle.width - inputStyle.radius, inputStyle.y + inputStyle.radius, inputStyle.radius, 1.5 * Math.PI, 0)
  context.lineTo(inputStyle.x + inputStyle.width, inputStyle.y + inputStyle.height - inputStyle.radius)
  context.arc(inputStyle.x + inputStyle.width - inputStyle.radius, inputStyle.y + inputStyle.height - inputStyle.radius, inputStyle.radius, 0, 0.5 * Math.PI)
  context.lineTo(inputStyle.x + inputStyle.radius, inputStyle.y + inputStyle.height)
  context.arc(inputStyle.x + inputStyle.radius, inputStyle.y + inputStyle.height - inputStyle.radius, inputStyle.radius, 0.5 * Math.PI, 1 * Math.PI)
  context.lineTo(inputStyle.x, inputStyle.y + inputStyle.radius)
  context.fill()

  // placeholder 填充
  context.stroke()
  context.textBaseline = 'middle'
  context.font = 'bold ' + inputStyle.fontSize * multiple + 'px Georgia'
  context.fillStyle = '#BEBEBE'
  context.fillText('placeholder', inputStyle.paddingLeft, inputStyle.y + inputStyle.height / 2)
  return context
}
