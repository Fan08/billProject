import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
// import { LocaleProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

import { dispatchUserBill } from '../common/store/actionCreaters'
import { getBillWithCreaterAndMonthUrl } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'
import CreateItemModal from './createItemModal'
import testIcon from '../../style/img/eatingIcon.png'
import SingleItem from './singleItem'
import '../../style/public.less'
import './style.less'
import store from '../../store'

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
      createModalVisible: false
    }
  }

  componentDidMount() {
  }

  searchWithMonth = (dateString) => {
    console.log('selectedMonth', dateString)
    if (dateString.length === 0) return
    const date = dateString
    const creater = this.props.userUuid
    model.fetch(
      { date, creater },
      getBillWithCreaterAndMonthUrl,
      'post',
      function(res) {
        const data = res.data.bills
        for (const i of data) {
          i['bill_date'] = moment(i['bill_date']).format('YYYY-MM-DD')
        }
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

  onChange = (date, dateString) => {
    this.setState({ 'selectedMonth': dateString })
    this.searchWithMonth(dateString)
  }

  render() {
    const { selectedMonth } = this.state
    const { userBill } = this.props
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
            <span>10000</span>
            <span>支出：</span>
            <span>2000</span>
          </div>
        </div>

        <div className='addButton' onClick={this.showModal}>创建新的记账记录</div>
         <div>
           { userBill.map((item) => <SingleItem
             selectedMonth={selectedMonth}
             searchWithMonth={this.searchWithMonth}
             key={item.uuid} uuid={item.uuid}
             icon={testIcon}
             content={item.content}
             amount={item.amount}
             created_date={item.bill_date}
           />) }
         </div>
        <CreateItemModal
          selectedMonth={selectedMonth}
          searchWithMonth={this.searchWithMonth}
          visible={this.state.createModalVisible}
          handleCancel={this.handleCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      userBill: state.get('commonReducer').get('userBill').toJS(),
      userUuid: state.get('commonReducer').get('userUuid')
    }
}

export default connect(mapStateToProps, null)(Index)
