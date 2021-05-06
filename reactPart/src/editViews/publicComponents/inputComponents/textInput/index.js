import React, { Component } from 'react'

import './style.less'

/*
onChange：输入事件
onPressEnter：回车事件
onPressOther：其它按键事件
className：样式名称
style：行内式
disabled：是否可用，默认false
value：输入框值
defaultValue：默认值
placeholder：占位符
*/
export default class TextInput extends Component {
  state = {
    _value: ''
  }

  componentDidMount() {
    const { defaultValue } = this.props
    if (defaultValue !== undefined) {
      this.setState({ _value: defaultValue })
    }
  }

  _onChange = (e) => {
    this.setState({ _value: e.target.value })
  }

  _onKeyDown = (e) => {
    const { onPressEnter, onPressOther } = this.props
    if (e.keyCode === 13 && onPressEnter !== undefined) {
      onPressEnter(e)
    }
    if (onPressOther !== undefined && e.keyCode !== 13) {
      onPressOther(e)
    }
  }

  render() {
    const { onChange, value, style, className, disabled, placeholder } = this.props
    const { _value } = this.state

    return (
      <input
        style={{ ...style }}
        onChange={onChange !== undefined ? onChange : this._onChange}
        className={className !== undefined ? 'textInput ' + className : 'textInput'}
        value={value !== undefined ? value : _value}
        disabled={ disabled !== undefined ? disabled : false }
        onKeyDown={this._onKeyDown}
        placeholder={placeholder !== undefined ? placeholder : ''}
      />
    )
  }
}
