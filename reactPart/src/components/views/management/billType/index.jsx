import React, { Component } from 'react'
import { connect } from 'react-redux'

import SingleItem from './singleItem'
import CreateBillType from '../../../index/createBillType'
import { Empty } from 'antd'
// import { Model } from '../../dataModule/testBone'

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      createModalVisible: false
    }
  }

  showAddBillType = () => {
    this.setState({
      addBillTypeVisible: true
    })
  }

  cancelAddBillType = () => {
    this.setState({
      addBillTypeVisible: false
    })
  }

  render() {
    const { userBillType, userUuid, userBillTypeIsLoading, billTypeIcon } = this.props
    let billTypeListDom = userBillType.map((item) => {
      item['icon'] = billTypeIcon[item.uuid]
      return <SingleItem key={item.uuid} billTypeItem={item} creater={userUuid}/>
    })
    if (!userBillTypeIsLoading && userBillType.length === 0) {
      billTypeListDom = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    return (
      <div className='public-content-style'>
        <div className='addBillTypeButton' onClick={this.showAddBillType}>创建新的账单类型</div>
        { billTypeListDom }
        <CreateBillType
          visible={this.state.addBillTypeVisible}
          handleCancel={this.cancelAddBillType}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    billTypeIcon: state.get('commonReducer').get('billTypeIcon').toJS(),
    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    userBillTypeIsLoading: state.get('commonReducer').get('userBillTypeIsLoading'),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(Index)
