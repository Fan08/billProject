import React, { Component } from 'react'

import EditModule from './editModule'

import textInput from './publicComponents/inputComponents/textInput'
import numberInput from './publicComponents/inputComponents/numberInput'
import dateInput from './publicComponents/inputComponents/dateInput'

import './style.less'

export const TextInput = textInput
export const NumberInput = numberInput
export const DateInput = dateInput

/*
显示编辑好的页面
 */
export class ViewDom extends Component {
  state = {
    value: ''
  }

  onChange = (e) => {
    this.setState({ value: e.target.value })
  }

  onPressEnter = (e) => {
    console.log('onPressEnter', e)
  }

  render() {
    return (
      <div style={{ backgroundColor: 'white', minHeight: 200 }}>
        ViewDom
         <TextInput
          onPressEnter={this.onPressEnter}
          onChange={this.onChange}
          value={this.state.value}
          placeholder={'placeholder'}
          className={'test'}
         />
         <NumberInput />
      </div>
    )
  }
}

export class EditDom extends Component {
  render() {
    return <EditModule />
  }
}

export function guideDom() {
  return null
}
