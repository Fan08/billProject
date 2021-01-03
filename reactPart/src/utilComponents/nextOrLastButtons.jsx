import React, { Component } from 'react'

export default class NextOrLastButtons extends Component {
  showNextOrLastMonthBills = (e) => {
    const { eventFunction, selectedMonth } = this.props
    // const creater = this.props.userUuid
    let monthArray = []
    if (selectedMonth.indexOf('/') !== -1) {
      monthArray = selectedMonth.split('/')
    } else {
      monthArray = selectedMonth.split('-')
    }
    // eslint-disable-next-line radix
    let currentMonth = parseInt(monthArray[1])
    // eslint-disable-next-line radix
    let currentYear = parseInt(monthArray[0])
    if (currentMonth === 1 && e === -1) {
      currentYear -= 1
      currentMonth = 12
    } else if (currentMonth === 12 && e === 1) {
      currentYear += 1
      currentMonth = 1
    } else {
      currentMonth += e
    }
    const stringMoth = currentMonth.toString().length === 2 ? currentMonth.toString() : '0' + currentMonth.toString()
    const stringYear = currentYear.toString()
    eventFunction(stringYear, stringMoth)
  }

  render() {
    return (
      <div className={'next-or-last-month'}>
        <div className={'last-month'} onClick={() => this.showNextOrLastMonthBills(-1)}>查看上月</div>
        <div className={'next-month'} onClick={() => this.showNextOrLastMonthBills(1)}>查看下月</div>
      </div>
    )
  }
}
