import React, { Component } from 'react'
import { connect } from 'react-redux'
import { DatePicker } from 'antd'
// import { LocaleProvider } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'

// import { Model } from '../../dataModule/testBone'
import CreateItemModal from './createItemModal'
import testIcon from '../../style/img/eatingIcon.png'
import SingleItem from './singleItem'
import '../../style/public.less'
import './style.less'

moment.locale('zh-cn')

const monthFormat = 'YYYY/MM'

const { MonthPicker } = DatePicker

class Index extends Component {
  constructor(props) {
    super(props)
    const now = new Date()
    this.state = {
      selectedMonth: now.getFullYear() + '/' + now.getMonth(),
      createModalVisible: false
    }
  }

  componentDidMount() {
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
           { userBill.map((item, index) => <SingleItem key={index} icon={testIcon} content={item.content} amount={item.amount} created_date={item.bill_date}/>) }
         </div>
        <CreateItemModal
          visible={this.state.createModalVisible}
          handleCancel={this.handleCancel}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
    return {
      userBill: state.get('commonReducer').get('userBill').toJS()
    }
}

export default connect(mapStateToProps, null)(Index)
