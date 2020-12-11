import { fromJS } from 'immutable'
import { Route } from 'react-router-dom'
import React from 'react'

import Index from '../../index'
import * as constants from './constants'
import BillType from '../../views/management/billType'

const defaultState = fromJS({
  routersReady: false,
  userBill: [],
  userBillType: [],
  routers: [
    {
      routerDom: <Route key={'/app'} exact path={'/app'} component={ (props) => <Index { ...props }/> } />,
      link: '/app',
      title: '账单记录',
      key: 'app',
      child: []
    }, {
      routerDom: null,
      link: '',
      title: '信息管理',
      key: 'app2',
      child: [{
        routerDom: <Route key={'/app/type_management'} exact path={'/app/type_management'} component={ (props) => <BillType { ...props }/> } />,
        link: '/app/type_management',
        title: '支出类型管理',
        key: '支出类型管理',
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
