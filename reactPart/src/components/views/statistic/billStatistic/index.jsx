import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import { DatePicker } from 'antd'
import { getCurrentMonthOfString } from '../../../../publicFunction'

const { MonthPicker } = DatePicker
const monthFormat = 'YYYY/MM'

class BillStatistic extends Component {
  state = {
    selectedMonth: getCurrentMonthOfString()
  }

  render() {
    const {
      totalPayout,
      totalIncome
    } = this.props
    const {
      selectedMonth
    } = this.state

    return (
      <div className='public-content-style'>
        <div className='title-block'>
          <div className='search-block'>
            <span>选择月份：</span>
            <MonthPicker
              value={selectedMonth === '' ? null : moment(selectedMonth, monthFormat)}
              format={monthFormat}
              onChange={this.onChange}
              placeholder='请选择月份'
              locale={zh_CN}
            />
          </div>
          <div className='total-pay'>
            <span>收入：</span>
            <span>{totalIncome.toFixed(2)} 元</span>
            <span>支出：</span>
            <span>{totalPayout.toFixed(2)} 元</span>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    totalPayout: state.get('commonReducer').get('totalPayout'),
    totalIncome: state.get('commonReducer').get('totalIncome'),
    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(BillStatistic)
