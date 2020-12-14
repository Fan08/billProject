import React, { Component } from 'react'
import { Modal, Input, InputNumber, Select, DatePicker, message } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
// import moment from 'moment'
import 'moment/locale/zh-cn'
import './style.less'
import moment from 'moment'
import { connect } from 'react-redux'

import { addBill } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'

const model = new Model()

const { Option } = Select
const monthFormat = 'YYYY/MM/DD'

class CreateItemModal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedDate: '',
      amount: null,
      content: null,
      billType: null
    }
  }

  componentDidMount() {
    this.initSate()
  }

  initSate = () => {
    const now = new Date()
    const month = now.getMonth() + 1
    const init = {
      selectedDate: now.getFullYear() + '/' + month + '/' + now.getDate(),
      amount: null,
      content: null,
      billType: null
    }
    this.setState(init)
  }

  handleOk = () => {
    const { selectedMonth, searchWithMonth } = this.props
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
    model.fetch(
      params,
      addBill,
      'post',
      function(response) {
        searchWithMonth(selectedMonth)
        return
      },
      // eslint-disable-next-line handle-callback-err
      function(error) {
        return
      }
    )
  }

  billTypeChange = (value) => {
    this.setState({ billType: value })
  }

  dateChange = (date, dateString) => {
    this.setState({ selectedDate: dateString })
  }

  render() {
    const { visible, handleCancel, userBillType } = this.props
    const { selectedDate, billType, amount, content } = this.state

    return (
      <Modal
        title='创建新的记账记录'
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
        <div className={'label-span'}>
          <span className={'span'}>账单内容：</span>
          <Input className={'public-input-item'} onChange={(e) => { this.setState({ content: e.target.value }) }} value={content}/>
        </div>
        <div className={'label-span'}>
          <span className={'span'}>账单金额：</span>
          <InputNumber style={{ width: '50%' }} onChange={(e) => { this.setState({ amount: e }) }} value={amount}/>
        </div>
        <div className={'label-span'}>
          <span className={'span'}>账单类型：</span>
          <Select style={{ width: '50%' }} onChange={this.billTypeChange} value={billType} allowClear>
            { userBillType.map((item, index) => {
              const nature = item.nature === 1 ? '支出' : '收入'
              return <Option value={item.uuid} key={index}>{nature}：{item.name}</Option>
            }) }
          </Select>
        </div>
        <div className={'label-span'}>
          <span className={'span'}>账单日期：</span>
          <DatePicker
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
    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(CreateItemModal)
