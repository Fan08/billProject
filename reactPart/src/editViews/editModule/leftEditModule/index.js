import React, { Component } from 'react'

import './style.less'

export default class LeftEditModule extends Component {
  render() {
    return (
      <div className={'LeftEditModule'}>
        <canvas />
        <div className={'viewsStructure'}></div>
      </div>
    )
  }
}
