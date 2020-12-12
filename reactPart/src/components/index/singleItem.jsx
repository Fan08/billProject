import React, { Component } from 'react'
import { Icon } from 'antd'
import { connect } from 'react-redux'

// import testIcon from '../../style/img/eatingIcon.png'
import { Model } from '../../dataModule/testBone'
import { deleteBill } from '../../dataModule/UrlList'
import './style.less'

const model = new Model()

class SingleItem extends Component {
  deleteBill = (uuid) => {
    const { selectedMonth, searchWithMonth, userUuid } = this.props
    model.fetch(
      {
        uuid: uuid,
        creater: userUuid
      },
      deleteBill,
      'post',
      function(response) {
        searchWithMonth(selectedMonth)
      },
      function(response) {
        return
      }
    )
  }

  render() {
    const { icon, content, amount, created_date, uuid } = this.props

    return (
      <div className='single-item'>
        <div className='left-block'>
          <img src={icon} alt={''}/>
          <span>{content}</span>
        </div>
        <div className='center-block'>
          <span>{created_date}</span>
          <span style={{ marginLeft: 10 }}>{amount} 元</span>
        </div>
        <div className='right-block'>
          {/* <Icon type='edit' style={{ cursor: 'pointer' }}/>*/}
          <Icon type='delete' style={{ marginLeft: 20, color: 'red', cursor: 'pointer' }} onClick={() => this.deleteBill(uuid)}/>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(SingleItem)
