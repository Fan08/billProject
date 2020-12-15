import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import { DatePicker } from 'antd'

import CreateItemModal from './createItemModal'

moment.locale('zh-cn')

const monthFormat = 'YYYY-MM'

const { MonthPicker } = DatePicker

class ExpenditurePlan extends Component {
  state = {
    selectedMonth: '',
    totalIncome: '',
    totalPayout: '',
    createItemModalVisible: false
  }

  onChange = (date, dateString) => {
    this.setState({ 'selectedMonth': dateString })
  }

  showAddExpenditurePlan = () => {
    this.setState({
      createItemModalVisible: true
    })
  }

  cancelAddExpenditurePlan = () => {
    this.setState({
      createItemModalVisible: false
    })
  }

  render() {
    const { selectedMonth, totalIncome, totalPayout, createItemModalVisible } = this.state

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
            <span>{totalIncome} 元</span>
            <span>支出：</span>
            <span>{totalPayout} 元</span>
          </div>
        </div>
        <div className='addButton' onClick={this.showAddExpenditurePlan}>创建新的财政计划</div>

        <CreateItemModal
          selectedMonth={selectedMonth}
          visible={createItemModalVisible}
          handleCancel={this.cancelAddExpenditurePlan}
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

export default connect(mapStateToProps, null)(ExpenditurePlan)
