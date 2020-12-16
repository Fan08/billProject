import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import { DatePicker } from 'antd'

import { getCurrentMonthOfString } from '../../../../publicFunction'
import CreateItemModal from './createItemModal'
import { actionCreators } from '../store'
import SingleItem from './singleItem'
import LoadingUI from '../../../../dataModule/loading_UI'

moment.locale('zh-cn')

const monthFormat = 'YYYY-MM'

const { MonthPicker } = DatePicker

class ExpenditurePlan extends Component {
  state = {
    selectedMonth: getCurrentMonthOfString(1),
    totalIncome: '',
    totalPayout: '',
    createItemModalVisible: false
  }

  componentDidMount() {
    const { selectedMonth } = this.state
    const { userUuid } = this.props
    actionCreators.getUserExpenditurePlanWithUserAndMonth(userUuid, selectedMonth)
  }

  onChange = (date, dateString) => {
    const { userUuid } = this.props
    this.setState({ 'selectedMonth': dateString })
    actionCreators.getUserExpenditurePlanWithUserAndMonth(userUuid, dateString)
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
    const { userExpenditurePlan } = this.props
    const expenditurePlanDom = userExpenditurePlan.map(item => {
      return <SingleItem
        selectedMonth={selectedMonth}
        key={item.uuid}
        expenditurePlanItem={item}
      />
    })
    const neededExpenditurePlanListDom = userExpenditurePlan.length === 0 ? <LoadingUI /> : expenditurePlanDom

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
        { neededExpenditurePlanListDom }

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
    userExpenditurePlan: state.get('managementReducer').get('userExpenditurePlan').toJS(),

    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(ExpenditurePlan)
