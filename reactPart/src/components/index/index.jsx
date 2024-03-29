import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
import { Empty, BackTop } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import NextOrLastButtons from '../../utilComponents/nextOrLastButtons'
import {
  dispatchUserBillIsLoading,
  queryBills
} from '../common/store/actionCreaters'
import store from '../../store'
import SingleItem from './singleItem'
import LoadingUI from '../../dataModule/loading_UI'
import ItemOfWeek from './itemOfWeek'
import ShowComponentAtNeededHeight from '../../publicComponents/showComponentAtNeededHeight'
import { getCurrentMonthOfString } from '../../publicFunction'
import { actionCreators as commonAction } from '../common/store'

import CreateBillType from './createBillType'
import CreateItemModal from './createItemModal'

import '../../style/public.less'
import './style.less'

moment.locale('zh-cn')

const monthFormat = 'YYYY/MM'

const { MonthPicker } = DatePicker

class Index extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedMonth: getCurrentMonthOfString(),
      createModalVisible: false,
      addBillTypeVisible: false
    }
  }

  componentDidMount() {
    const creater = this.props.userUuid
    commonAction.getAllBills(creater)
  }

  showNextOrLastMonthBills = (stringYear, stringMoth) => {
    const creater = this.props.userUuid
    this.setState({
      selectedMonth: stringYear + '/' + stringMoth
    })
    queryBills({ date: stringYear + '/' + stringMoth, creater })
  }

  searchWithMonth = (dateString) => {
    store.dispatch(dispatchUserBillIsLoading(true))
    if (dateString.length === 0) return
    const date = dateString
    const creater = this.props.userUuid
    queryBills({ date: date, creater })
  }

  showModal = () => {
    this.setState({
      createModalVisible: true
    })
  }

  handleCancel = () => {
    this.setState({
      createModalVisible: false
    })
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

  onChange = (date, dateString) => {
    this.setState({ 'selectedMonth': dateString })
    this.searchWithMonth(dateString)
  }

  render() {
    const { selectedMonth } = this.state
    const { userBill, totalPayout, totalIncome, userBillIsLoading, billTypeIcon } = this.props
    const billListDom = <div>
                          { userBill.map((item) => {
                            let inputOfWeek = 0
                            let outputOfWeek = 0
                            const billsDom = []
                            for (const i of item) {
                              if (i.nature === 1) {
                                outputOfWeek += i.amount
                              } else {
                                inputOfWeek += i.amount
                              }
                              i.icon = billTypeIcon[i.type]
                              const singleDom = <SingleItem
                                item={i}
                                selectedMonth={selectedMonth}
                                searchWithMonth={this.searchWithMonth}
                                key={i.uuid}
                              />
                              billsDom.push(singleDom)
                            }
                            billsDom.unshift(<ItemOfWeek
                              key={item[0]['bill_date']}
                              date={item[0]['bill_date']}
                              input={inputOfWeek.toFixed(2)}
                              output={outputOfWeek.toFixed(2)}
                            />)
                            return billsDom
                          }) }
                        </div>
    let neededBillListDom = userBillIsLoading ? <LoadingUI /> : billListDom
    if (!userBillIsLoading && userBill.length === 0) {
      neededBillListDom = <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
    }
    const needDom = <div className={'fixed-adding-bill-button'} onClick={this.showModal}>add</div>

    return (
      <div className='public-content-style'>
        <ShowComponentAtNeededHeight needDom={needDom}/>
        <BackTop />
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

        <NextOrLastButtons
          eventFunction={this.showNextOrLastMonthBills}
          selectedMonth={selectedMonth}
        />
        <div className='addBillTypeButton' onClick={this.showAddBillType}>创建新的账单类型</div>
        <div className='addButton' onClick={this.showModal}>创建新的记账记录</div>
          { neededBillListDom }
        <CreateItemModal
          selectedMonth={selectedMonth}
          searchWithMonth={this.searchWithMonth}
          visible={this.state.createModalVisible}
          handleCancel={this.handleCancel}
        />
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
      userBill: state.get('commonReducer').get('userBill').toJS(),
      billTypeIcon: state.get('commonReducer').get('billTypeIcon').toJS(),
      totalIncome: state.get('commonReducer').get('totalIncome'),
      totalPayout: state.get('commonReducer').get('totalPayout'),
      userBillIsLoading: state.get('commonReducer').get('userBillIsLoading'),
      userUuid: state.get('commonReducer').get('userUuid')
    }
}

export default connect(mapStateToProps, null)(Index)
