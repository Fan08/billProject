import React, { Component } from 'react'
import { connect } from 'react-redux'

class ExpenditurePlan extends Component {
  render() {
    return (
      <div className='public-content-style'>
        ExpenditurePlan
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

export default connect(mapStateToProps, null)(ExpenditurePlan)
