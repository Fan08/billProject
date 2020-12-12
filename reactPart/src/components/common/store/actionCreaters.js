import { Model } from '../../../dataModule/testBone'
import { billTypes, getBillWithCreater } from '../../../dataModule/UrlList'
import * as constants from './constants'
import store from '../../../store'

// import { Route } from 'react-router-dom'
// import Index from '../../index'
// import React from 'react'
import { fromJS } from 'immutable'
import moment from 'moment'

const model = new Model()

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
  model.fetch(
    { creater: userUuid },
    billTypes,
    'POST',
    function(response) {
      const data = response.data.billTypes
      store.dispatch(dispatchBillTypes(data))
    },
    // eslint-disable-next-line handle-callback-err
    function(error) {
      return
    }
  )
}

export const getAllBills = (userUuid) => {
  model.fetch(
    { creater: userUuid },
    getBillWithCreater,
    'POST',
    function(response) {
      const data = response.data.bills
      for (const i of data) {
        i['bill_date'] = moment(i['bill_date']).format('YYYY-MM-DD')
      }
      store.dispatch(dispatchUserBill(data))
    },
    // eslint-disable-next-line handle-callback-err
    function(error) {
      return
    }
  )
}
