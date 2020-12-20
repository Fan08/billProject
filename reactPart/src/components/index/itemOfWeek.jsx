import React, { Component } from 'react'

import './style.less'

export default class ItemOfWeek extends Component {
  render() {
    const { output, input, date } = this.props

    return (
      <div className={'single-item item-of-week'}>
        <div className={'center-block'}>
          <span>支出：{output} 元</span>
          <span>收入：{input} 元</span>
          <span>{date}</span>
        </div>
      </div>
    )
  }
}
