import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import { DatePicker, Empty } from 'antd'

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
    const { selectedMonth, createItemModalVisible } = this.state
    const { userExpenditurePlan, programmeOutput, programmeInput, userExpenditurePlanIsLoading } = this.props
    const expenditurePlanDom = userExpenditurePlan.map(item => {
      return <SingleItem
        selectedMonth={selectedMonth}
        key={item.uuid}
        expenditurePlanItem={item}
      />
    })
    let neededExpenditurePlanListDom = userExpenditurePlan.length === 0 ? <LoadingUI /> : expenditurePlanDom
    if (!userExpenditurePlanIsLoading && userExpenditurePlan.length === 0) {
      neededExpenditurePlanListDom = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }

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
            <span>计划收入：</span>
            <span>{programmeInput} 元</span>
            <span>计划支出：</span>
            <span>{programmeOutput} 元</span>
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
    programmeOutput: state.get('managementReducer').get('programmeOutput'),
    programmeInput: state.get('managementReducer').get('programmeInput'),
    userExpenditurePlanIsLoading: state.get('managementReducer').get('userExpenditurePlanIsLoading'),

    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(ExpenditurePlan)
