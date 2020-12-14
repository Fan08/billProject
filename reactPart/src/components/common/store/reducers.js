import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'

import Index from '../../index'
import * as constants from './constants'
import BillType from '../../views/management/billType'

const defaultState = fromJS({
  userUuid: 'c6825ed3afa9411694b62e61119544ed',
  routersReady: false,
  userBill: [],
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
      }]
    }
  ]
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.userBillType:
      return state.set('userBillType', action.data)
    case constants.routers:
      return state.set('routers', action.data)
    case constants.userBill:
      return state.set('userBill', action.data)
    default:
      return state
  }
}
