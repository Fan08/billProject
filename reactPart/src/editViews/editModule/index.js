import React, { Component } from 'react'

import LeftEditModule from './leftEditModule'
import RightEditModule from './rightEditModule'
import ShowDomsModule from './showDomsModule'

import './style.less'

export default class EditModule extends Component {
  render() {
    return (
      <div className={'EditModule'}>
        <LeftEditModule />
        <ShowDomsModule />
        <RightEditModule />
      </div>
    )
  }
}
