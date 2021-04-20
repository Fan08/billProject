import React, { Component } from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import zh_CN from 'antd/es/locale-provider/zh_CN'
import { DatePicker, Collapse, BackTop } from 'antd'
// import * as echarts from 'echarts'

import { getCurrentMonthOfString } from '../../../../publicFunction'
import { queryBills } from '../../../common/store/actionCreaters'
import SingleItem from '../../../index/singleItem'
import NextOrLastButtons from '../../../../utilComponents/nextOrLastButtons'

import '../style.less'

const { Panel } = Collapse
const { MonthPicker } = DatePicker
const monthFormat = 'YYYY/MM'

class BillStatistic extends Component {
  state = {
    selectedMonth: getCurrentMonthOfString(0, '/'),
    xAxisData: [],
    yAxisData: [],
    myChart: false
  }

  componentDidMount() {
    this.getNeededBills()
    // const echartDom = document.getElementById('line-chart-in-statistic')
    // const myChart = echarts.init(echartDom)
    // this.setState({ myChart })
  }

  onChange = (date, dateString) => {
    this.setState({ 'selectedMonth': dateString })
    this.getNeededBills(dateString)
  }

  getNeededBills = (selectedMonth = this.state.selectedMonth, userUuid = this.props.userUuid) => {
    queryBills({ date: selectedMonth, creater: userUuid })
  }

  changeToStatisticWithType = (bills) => {
    bills.forEach()
  }

  showNextOrLastMonthBills = (stringYear, stringMoth) => {
    this.setState({
      selectedMonth: stringYear + '/' + stringMoth
    })
    this.getNeededBills(stringYear + '/' + stringMoth)
  }

  showBillsAccordingWithType = () => {
    const { statisticWithType, billTypeIcon } = this.props
    const newStatisticWithType = statisticWithType.toJS()
    const keys = Object.keys(newStatisticWithType)
    const DOMs = []
    let index = 1
    keys.forEach(item => {
      let totalNum = 0
      const billList = newStatisticWithType[item].map(itemBill => {
          itemBill.icon = billTypeIcon[itemBill.type]
          totalNum += itemBill.amount
          return <SingleItem
            searchWithMonth={this.getNeededBills}
            selectedMonth={this.state.selectedMonth}
            item={itemBill}
            classnameFromFather={'single-item-in-bill-statistic'}
            key={itemBill.uuid}
          />
        })
      const outsidePanel = <Panel header={item + ' - 总金额：' + totalNum.toFixed(2) + ' 元'} key={index.toString()}>
        { billList }
      </Panel>
      DOMs.push(outsidePanel)
      index += 1
    })
    return DOMs
  }

  render() {
    const { totalPayout, totalIncome, statisticWithType } = this.props
    const { selectedMonth } = this.state
    // const { selectedMonth, xAxisData, yAxisData, myChart } = this.state
    // const option = {
    //   grid: {
    //     width: '100%'
    //   },
    //   xAxis: {
    //     type: 'category',
    //     data: xAxisData
    //   },
    //   yAxis: {
    //     type: 'value'
    //   },
    //   series: [{
    //     data: yAxisData,
    //     type: 'line'
    //   }]
    // }
    // myChart && myChart.setOption(option)
    return (
      <div className='public-content-style'>
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
        <div className={'statistic-body'}>
          {/* <div id={'line-chart-in-statistic'} style={{ width: '70%', height: '400px', margin: '16px auto 0' }}></div>*/}
          <Collapse
            accordion
            // defaultActiveKey={['1']}
          >
            { statisticWithType && this.showBillsAccordingWithType() }
          </Collapse>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    billTypeIcon: state.get('commonReducer').get('billTypeIcon').toJS(),
    userBill: state.get('commonReducer').get('userBill').toJS(),
    totalPayout: state.get('commonReducer').get('totalPayout'),
    totalIncome: state.get('commonReducer').get('totalIncome'),
    userBillType: state.get('commonReducer').get('userBillType').toJS(),
    statisticWithType: state.get('commonReducer').get('statisticWithType'),
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(BillStatistic)
