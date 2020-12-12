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
      function(response) {}
    )
  }

  render() {
    const { icon, content, amount, created_date, uuid, nature } = this.props
    const itemClassName = nature === 1 ? 'single-item' : 'single-item income-item'

    return (
      <div className={itemClassName}>
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
          <Icon type='delete' theme={'filled'} style={{ marginLeft: 20, color: 'red', cursor: 'pointer', fontSize: 20 }} onClick={() => this.deleteBill(uuid)}/>
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
