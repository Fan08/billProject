import React, { Component } from 'react'

import canvasComponentOfTextInput from '../canvasComponents/canvasComponentOfInput/canvasComponentOfTextInput'
import { generateUuid } from '../canvasComponents/utils'

import './style.less'

export default class ShowDomsModule extends Component {
  state = {
    components: [{
      x: 10, y: 10, width: 160, height: 30, radius: 6, inputStyle: {}
    }],
    neededComponents: {},
    componentsInCanvas: {},
    positionInCanvasX: 0,
    positionInCanvasY: 0,
    multipleOfCanvas: 4,
    whetherMousedown: false,
    selectedComponent: '',
    clearanceX: 0,
    clearanceY: 0
  }

  componentDidMount() {
    const withUuidComponents = {}
    for (const i of this.state.components) {
      withUuidComponents[generateUuid()] = i
    }
    this.setState({ neededComponents: withUuidComponents })
    this.drawComponents(withUuidComponents)
  }

  setCanvasSize = () => {
    const canvasDom = document.getElementById('myCanvas')
    canvasDom.width = canvasDom.offsetWidth * 4
    canvasDom.height = canvasDom.offsetHeight * 4
  }

  // 绘制所有的元素
  drawComponents = (withUuidComponents = this.state.neededComponents) => {
    this.setCanvasSize()
    const { multipleOfCanvas } = this.state
    const componentsInCanvas = {}
    for (const i in withUuidComponents) {
      const oneComponent = withUuidComponents[i]
      const inputDom = canvasComponentOfTextInput('myCanvas', oneComponent.x, oneComponent.y, oneComponent.width, oneComponent.height, oneComponent.radius, oneComponent.inputStyle, multipleOfCanvas, 1)
      componentsInCanvas[i] = inputDom
    }
    this.setState({ componentsInCanvas })
  }

  mouseMoveInCanvas = (e) => {
    const { whetherMousedown, selectedComponent, neededComponents, clearanceX, clearanceY } = this.state
    const x = e.clientX - 504
    const y = e.clientY - 74
    this.setState({ positionInCanvasX: x, positionInCanvasY: y })
    if (whetherMousedown === true && selectedComponent.length !== 0 && selectedComponent !== undefined) {
      neededComponents[selectedComponent]['x'] = x + clearanceX
      neededComponents[selectedComponent]['y'] = y + clearanceY
      this.drawComponents()
    }
  }

  mouseDownInCanvas = (e) => {
    this.setState({ whetherMousedown: true })
    const { componentsInCanvas, positionInCanvasX, positionInCanvasY, neededComponents } = this.state
    // console.log(componentsInCanvas)
    for (const i in componentsInCanvas) {
      if (componentsInCanvas[i].isPointInPath(positionInCanvasX * 4, positionInCanvasY * 4)) {
        this.setState({
          selectedComponent: i,
          clearanceX: neededComponents[i]['x'] - positionInCanvasX,
          clearanceY: neededComponents[i]['y'] - positionInCanvasY
        })
      }
    }
  }

  mouseUpInCanvas = () => {
    this.setState({ whetherMousedown: false, selectedComponent: '' })
  }

  mouseLeaveInCanvas = () => {
    this.setState({ whetherMousedown: false })
  }

  render() {
    return (
      <div className={'ShowDomsModule'} id={'ShowDomsModule'}>
        <canvas
          id='myCanvas'
          style={{ width: '100%' }}
          onMouseMove={this.mouseMoveInCanvas}
          onMouseDown={this.mouseDownInCanvas}
          onMouseUp={this.mouseUpInCanvas}
          onMouseLeave={this.mouseLeaveInCanvas}
        />
      </div>
    )
  }
}
