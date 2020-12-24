import {
  getBillTypesWithCreater,
  queryBillWithCreater,
  queryBillWithCreaterAndMonthUrl
} from '../../../dataModule/UrlList'
import * as constants from './constants'
import store from '../../../store'

// import { Route } from 'react-router-dom'
// import Index from '../../index'
// import React from 'react'
import { fromJS } from 'immutable'
import moment from 'moment'

export const dispatchUserBillTypeIsLoading = (data) => ({
  type: constants.userBillTypeIsLoading,
  data: fromJS(data)
})

export const dispatchUserBillIsLoading = (data) => ({
  type: constants.userBillIsLoading,
  data: fromJS(data)
})

export const dispatchTotalIncome = (data) => ({
  type: constants.totalIncome,
  data: fromJS(data)
})

export const dispatchTotalPayout = (data) => ({
  type: constants.totalPayout,
  data: fromJS(data)
})

export const dispatchBreadcrumbList = (data) => ({
  type: constants.breadcrumbList,
  data: fromJS(data)
})

export const dispatchUserBill = (data) => ({
  type: constants.userBill,
  data: fromJS(data)
})

export const dispatchBillTypes = (data) => ({
  type: constants.userBillType,
  data: fromJS(data)
})

export const getAllBillTypes = (userUuid) => {
  store.dispatch(dispatchUserBillTypeIsLoading(true))
  getBillTypesWithCreater({ creater: userUuid })
    .then(res => {
      const data = res.data.billTypes
      store.dispatch(dispatchUserBillTypeIsLoading(false))
      store.dispatch(dispatchBillTypes(data))
    })
}

export const getAllBills = (userUuid) => {
  store.dispatch(dispatchUserBillIsLoading(true))
  queryBills({ creater: userUuid })
}

export function queryBills(params) {
  let queryFunction = queryBillWithCreater
  if (params['date'] !== undefined) {
    queryFunction = queryBillWithCreaterAndMonthUrl
  }
  queryFunction(params)
    .then(res => {
      const data = res.data.bills
      let payout = 0
      let income = 0
      for (const i of data) {
        for (const x of i) {
          x['bill_date'] = moment(x['bill_date']).format('YYYY-MM-DD')
          if (x.nature === 1) payout += x.amount
          else income += x.amount
        }
      }
      store.dispatch(dispatchTotalIncome(income))
      store.dispatch(dispatchTotalPayout(payout))
      store.dispatch(dispatchUserBillIsLoading(false))
      store.dispatch(dispatchUserBill(data))
    })
}
