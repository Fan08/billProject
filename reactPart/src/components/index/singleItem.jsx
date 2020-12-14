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
    const { item } = this.props
    const itemClassName = item.nature === 1 ? 'single-item' : 'single-item income-item'

    return (
      <div className={itemClassName}>
        <div className='left-block'>
          <img src={item.icon} alt={''}/>
          <span>{item.name}：</span>
          <span>{item.content}</span>
        </div>
        <div className='center-block'>
          <span>{item.bill_date}</span>
          <span style={{ marginLeft: 10 }}>{item.amount} 元</span>
        </div>
        <div className='right-block'>
          <Icon type='delete' theme={'filled'} style={{ marginLeft: 20, color: 'red', cursor: 'pointer', fontSize: 20 }} onClick={() => this.deleteBill(item.uuid)}/>
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
