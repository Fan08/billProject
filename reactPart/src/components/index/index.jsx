import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
// import { LocaleProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { dispatchTotalIncome, dispatchTotalPayout, dispatchUserBill } from '../common/store/actionCreaters'
import { getBillWithCreaterAndMonthUrl } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'
import store from '../../store'
import SingleItem from './singleItem'

import CreateBillType from './createBillType'
import CreateItemModal from './createItemModal'

import '../../style/public.less'
import './style.less'

moment.locale('zh-cn')

const monthFormat = 'YYYY/MM'

const { MonthPicker } = DatePicker
const model = new Model()

class Index extends Component {
  constructor(props) {
    super(props)
    const now = new Date()
    const month = now.getMonth() + 1
    this.state = {
      selectedMonth: now.getFullYear() + '/' + month,
      createModalVisible: false,
      addBillTypeVisible: false
    }
  }

  componentDidMount() {
  }

  searchWithMonth = (dateString) => {
    if (dateString.length === 0) return
    const date = dateString
    const creater = this.props.userUuid
    model.fetch(
      { date, creater },
      getBillWithCreaterAndMonthUrl,
      'post',
      function(res) {
        const data = res.data.bills
        let payout = 0
        let income = 0
        for (const i of data) {
          i['bill_date'] = moment(i['bill_date']).format('YYYY-MM-DD')
          if (i.nature === 1) payout += i.amount
          else income += i.amount
        }

        store.dispatch(dispatchTotalIncome(income))
        store.dispatch(dispatchTotalPayout(payout))
        store.dispatch(dispatchUserBill(data))
      },
      function(res) {
        return
      }
    )
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
    const { userBill, totalPayout, totalIncome } = this.props

    return (
      <div className='public-content-style' style={{ paddingTop: 20 }}>
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

        <div className='addBillTypeButton' onClick={this.showAddBillType}>创建新的账单类型</div>
        <div className='addButton' onClick={this.showModal}>创建新的记账记录</div>
         <div>
           { userBill.map((item) => {
             return <SingleItem
               item={item}
               selectedMonth={selectedMonth}
               searchWithMonth={this.searchWithMonth}
               key={item.uuid}
             />
           }) }
         </div>
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
      totalIncome: state.get('commonReducer').get('totalIncome'),
      totalPayout: state.get('commonReducer').get('totalPayout'),
      userUuid: state.get('commonReducer').get('userUuid')
    }
}

export default connect(mapStateToProps, null)(Index)
