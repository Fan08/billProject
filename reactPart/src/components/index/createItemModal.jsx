import React, { Component } from 'react'
import { DatePicker, Input, InputNumber, message, Modal, Popover } from 'antd'
import zh_CN from 'antd/es/locale-provider/zh_CN'
// import moment from 'moment'
import 'moment/locale/zh-cn'
import './style.less'
import moment from 'moment'
import { connect } from 'react-redux'

import { addBill } from '../../dataModule/UrlList'
import { Model } from '../../dataModule/testBone'
import { judgeWhetherEnter } from '../../utilComponents/utils'

const model = new Model()

// const { Option } = Select
const monthFormat = 'YYYY/MM/DD'

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

  getMaxDay(year, month) {
    const current = new Date(year, month, 1)
    return new Date(current.getTime() - 1000 * 60 * 60 * 24).getDate()
  }

  changeDateNextOrLast(changeNum) {
    const { selectedDate } = this.state
    const dateList = selectedDate.split('/')
    let year = parseInt(dateList[0])
    let month = parseInt(dateList[1])
    const day = parseInt(dateList[2])
    let newDay = 1
    if (changeNum === -1) {
      if (day === 1) {
        if (month === 1) {
          month = 12
          year -= 1
          newDay = this.getMaxDay(year, month)
        } else {
          month -= 1
          newDay = this.getMaxDay(year, month)
        }
      } else {
        newDay = day - 1
      }
    } else {
      if (month === 12 && day === 31) {
        year += 1
      }
      if (day + changeNum > this.getMaxDay(year, month)) {
        newDay = 1
        month += 1
      } else {
        newDay = day + 1
      }
      if (month === 13) month = 1
    }
    this.setState({
      selectedDate: year + '/' + month + '/' + newDay
    })
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
    const me = this
    const singleBill = this.state
    for (const i in singleBill) {
      if (singleBill[i] === null) {
        message.warning('表单未填写完整！')
        return
      }
    }
    this.props.handleCancel()
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
        searchWithMonth(selectedMonth.split('-').join('/'))
        me.initSate()
      },
      // eslint-disable-next-line handle-callback-err
      function(error) {
      }
    )
  }

  billTypeChange = (value) => {
    this.setState({ billType: value })
  }

  dateChange = (date, dateString) => {
    this.setState({ selectedDate: dateString })
  }

  enterDown = (e) => {
    const whetherEnter = judgeWhetherEnter(e.keyCode)
    if (whetherEnter === false) return
    this.handleOk()
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
        destroyOnClose
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
                    { billTypeIcon[item.uuid] === null
                      ? <span className={'nameAsIcon'}>{item.name}</span>
                      : <img alt={''} src={billTypeIcon[item.uuid]} /> }
                  </Popover>
                </div>)
            }) }
          </div>
          <div className={'choose-bill-type-title'} style={{ marginBottom: 10 }}>
            <div className={'single-title selected-single-title'} onClick={() => this.changeDateNextOrLast(-1)}>上一天</div>
            <div className={'single-title'} onClick={() => this.changeDateNextOrLast(1)}>下一天</div>
          </div>
        </div>
        <div className={'label-span'}>
          <span className={'span'}>账单内容：</span>
          <Input
            className={'public-input-item'}
            onKeyDown={this.enterDown}
            onChange={(e) => { this.setState({ content: e.target.value }) }}
            value={content}
          />
        </div>
        <div className={'label-span'}>
          <span className={'span'}>账单金额：</span>
          <InputNumber
            id={'amount-input'}
            style={{ width: '50%' }}
            onKeyDown={this.enterDown}
            onChange={(e) => {
              this.setState({ amount: e })
            }}
            value={amount}
          />
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
    billTypeIcon: state.get('commonReducer').get('billTypeIcon').toJS(),
    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(CreateItemModal)
