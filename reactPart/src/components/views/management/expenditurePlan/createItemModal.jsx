import React, { Component } from 'react'
import { Modal, Input, InputNumber, DatePicker, message, Popover } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
// import moment from 'moment'
import 'moment/locale/zh-cn'
import moment from 'moment'
import { connect } from 'react-redux'

import { getCurrentMonthOfString } from '../../../../publicFunction'
import { addExpenditurePlan } from '../../../../dataModule/UrlList'
import { actionCreators } from '../store'

// const { Option } = Select
const monthFormat = 'YYYY-MM'
const { MonthPicker } = DatePicker

class CreateItemModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: '',
      amount: null,
      content: null,
      billType: null,
      selectedTitle: 1
    }
  }

  componentDidMount() {
    this.initSate()
  }

  initSate = () => {
    const init = {
      selectedDate: getCurrentMonthOfString(1),
      amount: null,
      content: null,
      billType: null
    }
    this.setState(init)
  }

  handleOk = () => {
    const { userUuid, selectedMonth } = this.props

    const singleBill = this.state
    for (const i in singleBill) {
      if (singleBill[i] === null) {
        message.warning('表单未填写完整！')
        return
      }
    }
    this.props.handleCancel()
    this.initSate()
    let params = JSON.stringify(singleBill)
    params = JSON.parse(params)
    params['amount'] = parseFloat(params['amount']).toFixed(2)
    params['creater'] = this.props.userUuid
    params['type'] = singleBill.billType
    params['expenditure_month'] = singleBill.selectedDate
    addExpenditurePlan(params).then(res => {
      if (res.data.status === 200) {
        actionCreators.getUserExpenditurePlanWithUserAndMonth(selectedMonth, userUuid)
        message.success('创建财政计划成功！')
      } else {
        message.error('创建财政计划失败！')
      }
    })
  }

  billTypeChange = (value) => {
    this.setState({ billType: value })
  }

  dateChange = (date, dateString) => {
    this.setState({ selectedDate: dateString })
  }

  disabledDate = (current) => {
    // Can not select days before today and today
    return current && current < moment().endOf('day')
  }

  render() {
    const { visible, handleCancel, userBillType, billTypeIcon } = this.props
    const { selectedDate, amount, content, selectedTitle, billType } = this.state
    const neededBillType = []
    userBillType.forEach((item) => {
      if (item.nature === selectedTitle) {
        neededBillType.push(item)
      }
    })

    return (
      <Modal
        title='创建新的财政计划'
        width='50%'
        okText={'确认'}
        cancelText={'取消'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={() => {
          handleCancel()
          this.initSate()
        }}
        className={'create-item-modal'}
      >
        <div className={'choose-bill-type'}>
          <div className={'choose-bill-type-title'}>
            <div
              className={ selectedTitle === 1 ? 'single-title selected-single-title' : 'single-title'}
              onClick={() => {
                this.setState({ selectedTitle: 1 })
              }}
            >支出</div>
            <div
              className={ selectedTitle === 0 ? 'single-title selected-single-title' : 'single-title'}
              onClick={() => { this.setState({ selectedTitle: 0 }) }}
            >收入</div>
          </div>
          <div className={'show-needed-bill-types'} id={'test-animation'}>
            { neededBillType.map(item => {
              const divClass = billType === item.uuid ? 'selected-bill-type' : ''
              return (
                <div
                  className={divClass}
                  key={item.uuid}
                  onClick={() => this.billTypeChange(item.uuid)}
                  style={{ cursor: 'pointer' }}>
                  <Popover content={item.name} trigger='hover'>
                    <img alt={''} src={billTypeIcon[item.uuid]} />
                  </Popover>
                </div>)
            }) }
          </div>
        </div>
        <div className={'label-span'}>
          <span className={'span'}>计划内容：</span>
          <Input className={'public-input-item'} onChange={(e) => { this.setState({ content: e.target.value }) }} value={content}/>
        </div>
        <div className={'label-span'}>
          <span className={'span'}>计划金额：</span>
          <InputNumber style={{ width: '50%' }} onChange={(e) => { this.setState({ amount: e }) }} value={amount}/>
        </div>
        <div className={'label-span'}>
          <span className={'span'}>计划月份：</span>
          <MonthPicker
            disabledDate={this.disabledDate}
            value={selectedDate === '' ? null : moment(selectedDate, monthFormat)}
            format={monthFormat}
            onChange={this.dateChange}
            ocale={zh_CN}
            style={{ width: '50%' }}
          />
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    billTypeIcon: state.get('commonReducer').get('billTypeIcon').toJS(),
    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(CreateItemModal)
