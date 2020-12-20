import { Model } from '../../../dataModule/testBone'
import { getBillWithCreater, getBillTypesWithCreater } from '../../../dataModule/UrlList'
import * as constants from './constants'
import store from '../../../store'

// import { Route } from 'react-router-dom'
// import Index from '../../index'
// import React from 'react'
import { fromJS } from 'immutable'
import moment from 'moment'

const model = new Model()

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
  getBillTypesWithCreater({ creater: userUuid })
    .then(res => {
      const data = res.data.billTypes
      store.dispatch(dispatchBillTypes(data))
    })
}

export const getAllBills = (userUuid) => {
  model.fetch(
    { creater: userUuid },
    getBillWithCreater,
    'POST',
    function(response) {
      const data = response.data.bills
      const result = []
      let payout = 0
      let income = 0
      for (const i of data) {
        const singleDayData = []
        for (const x of i) {
          x['bill_date'] = moment(x['bill_date']).format('YYYY-MM-DD')
          if (x.nature === 1) payout += x.amount
          else income += x.amount
          singleDayData.push(x)
        }
        result.push(singleDayData)
      }
      store.dispatch(dispatchTotalIncome(income))
      store.dispatch(dispatchTotalPayout(payout))
      store.dispatch(dispatchUserBill(data))
    },
    // eslint-disable-next-line handle-callback-err
    function(error) {
      return
    }
  )
}
