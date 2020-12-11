import React, { Component } from 'react'
import { Modal, Input, InputNumber, Select, DatePicker } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
// import moment from 'moment'
import 'moment/locale/zh-cn'
import './style.less'
import moment from 'moment'
import { connect } from 'react-redux'

const { Option } = Select
const monthFormat = 'YYYY/MM/DD'

class CreateItemModal extends Component {
  constructor(props) {
    super(props)
    const now = new Date()
    this.state = {
      selectedDate: now.getFullYear() + '/' + now.getMonth() + '/' + now.getDay(),
      amount: 0.0,
      content: '',
      billType: null
    }
  }

  handleOk = () => {
    this.props.handleCancel()
  }

  billTypeChange = (value) => {
    this.setState({ billType: value })
  }

  dateChange = (date, dateString) => {
    this.setState({ selectedDate: dateString })
  }

  render() {
    const { visible, handleCancel, userBillType } = this.props
    const { selectedDate, billType, amount } = this.state

    return (
      <Modal
        title='创建新的记账记录'
        okText={'确认'}
        cancelText={'取消'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={handleCancel}
        className={'create-item-modal'}
      >
        <div className={'label-span'}>
          <span>账单内容：</span>
          <Input className={'public-input-item'}/>
        </div>
        <div className={'label-span'}>
          <span>账单金额：</span>
          <InputNumber style={{ width: '50%' }} onChange={(e) => { this.setState({ amount: e }) }} value={amount}/>
        </div>
        <div className={'label-span'}>
          <span>账单类型：</span>
          <Select style={{ width: '50%' }} onChange={this.billTypeChange} value={billType} allowClear>
            { userBillType.map((item, index) => <Option value={item.uuid} key={index}>{item.name}</Option>) }
          </Select>
        </div>
        <div className={'label-span'}>
          <span>账单日期：</span>
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
    userBillType: state.get('commonReducer').get('userBillType').toJS()
  }
}

export default connect(mapStateToProps, null)(CreateItemModal)
