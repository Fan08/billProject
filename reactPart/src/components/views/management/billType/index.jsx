import React, { Component } from 'react'
import { connect } from 'react-redux'

import SingleItem from './singleItem'
import CreateBillType from '../../../index/createBillType'
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
    const { userBillType, userUuid } = this.props
    return (
      <div className='public-content-style'>
        <div className='addBillTypeButton' onClick={this.showAddBillType}>创建新的账单类型</div>
        { userBillType.map((item) =>
          <SingleItem key={item.uuid} billTypeItem={item} creater={userUuid}/>) }
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
    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(Index)
