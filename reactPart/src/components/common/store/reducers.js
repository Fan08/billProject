import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'

import Index from '../../index'
import * as constants from './constants'
import BillType from '../../views/management/billType'
import ExpenditurePlan from '../../views/management/expenditurePlan'
import BillStatistic from '../../views/statistic/billStatistic'

const defaultState = fromJS({
  totalIncome: 0,
  totalPayout: 0,
  userUuid: 'c6825ed3afa9411694b62e61119544ed',
  routersReady: false,
  userBill: [],
  userBillIsLoading: true,
  userBillType: [],
  // link key path 三个值需保持一致
  routers: [
    {
      routerDom: <Route key={'/app'} exact path={'/app'} component={ (props) => <Index { ...props }/> } />,
      link: '/app',
      title: '账单记录',
      key: '/app',
      child: []
    }, {
      routerDom: null,
      link: '',
      title: '信息管理',
      key: 'app2',
      child: [{
        routerDom: <Route key={'/app/bill_type_manage'} exact path={'/app/bill_type_manage'} component={ (props) => <BillType { ...props }/> } />,
        link: '/app/bill_type_manage',
        title: '账单类型管理',
        key: '/app/bill_type_manage',
        child: []
      }, {
        routerDom: <Route key={'/app/expenditure_plan'} exact path={'/app/expenditure_plan'} component={ (props) => <ExpenditurePlan { ...props }/> } />,
        link: '/app/expenditure_plan',
        title: '财政计划管理',
        key: '/app/expenditure_plan',
        child: []
      }]
    }, {
      routerDom: null,
      link: '',
      title: '信息统计',
      key: 'app3',
      child: [{
        routerDom: <Route key={'/app/bill_statistic'} exact path={'/app/bill_statistic'} component={ (props) => <BillStatistic { ...props }/> } />,
        link: '/app/bill_statistic',
        title: '账单统计',
        key: '/app/bill_statistic',
        child: []
      }]
    }
  ]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.userBillIsLoading:
      return state.set('userBillIsLoading', action.data)
    case constants.userBillType:
      return state.set('userBillType', action.data)
    case constants.routers:
      return state.set('routers', action.data)
    case constants.userBill:
      return state.set('userBill', action.data)
    case constants.totalIncome:
      return state.set('totalIncome', action.data)
    case constants.totalPayout:
      return state.set('totalPayout', action.data)
    default:
      return state
  }
}
