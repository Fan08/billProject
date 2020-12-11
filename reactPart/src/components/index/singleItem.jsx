import React, { Component } from 'react'
import { Icon } from 'antd'

// import testIcon from '../../style/img/eatingIcon.png'
import './style.less'

export default class SingleItem extends Component {
  render() {
    const { icon, content, amount, created_date } = this.props

    return (
      <div className='single-item'>
        <div className='left-block'>
          <img src={icon} alt={''}/>
          <span>{content}</span>
        </div>
        <div className='center-block'>
          <span>{amount}</span>
          <span style={{ marginLeft: 10 }}>{created_date}</span>
        </div>
        <div className='right-block'>
          <Icon type='edit' style={{ cursor: 'pointer' }}/>
          <Icon type='delete' style={{ marginLeft: 20, color: 'red', cursor: 'pointer' }} />
        </div>
      </div>
    )
  }
}
