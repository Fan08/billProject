import React, { Component } from 'react'
import { connect } from 'react-redux'

class BillStatistic extends Component{
  render() {
    return (
      <div className='public-content-style'>
        BillStatistic
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

export default connect(mapStateToProps, null)(BillStatistic)
