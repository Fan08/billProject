/*
 * @Descripttion:
 * @version:
 * @Author: 唐帆
 * @Date: 2020-04-30 10:37:58
 * @LastEditors: 唐帆
 * @LastEditTime: 2020-04-30 10:46:26
 */

import request from './request'

export const originalUrl = 'http://localhost:8082'
// export const originalUrl = 'http://122.51.80.50:8082'

export const billTypes = '/getBillTypesWithCreater'
export const addBillTypeUrl = '/addBillType'
export const deleteBillTypeWithUuidUrl = '/deleteBillTypeWithUuid'

export const getBillWithCreater = '/getBillWithCreater'
export const addBill = '/addBill'
export const deleteBill = '/deleteBill'
export const getBillWithCreaterAndMonthUrl = '/getBillWithCreaterAndMonth'

export function queryBillWithCreater(params) {
  return request({
    url: originalUrl + getBillWithCreater,
    method: 'post',
    data: params
  })
}

export function queryBillWithCreaterAndMonthUrl(params) {
  return request({
    url: originalUrl + getBillWithCreaterAndMonthUrl,
    method: 'post',
    data: params
  })
}

export function getBillTypesWithCreater(params) {
  return request({
    url: originalUrl + '/getBillTypesWithCreater',
    method: 'post',
    data: params
  })
}

export function addExpenditurePlan(data) {
  return request({
    url: originalUrl + '/addExpenditurePlan',
    method: 'post',
    data
  })
}

export function getExpenditurePlanByCreaterAndMonth(data) {
  return request({
    url: originalUrl + '/getExpenditurePlanByCreaterAndMonth',
    method: 'post',
    data
  })
}

export function deleteExpenditurePlanWithUuid(data) {
  return request({
    url: originalUrl + '/deleteExpenditurePlanWithUuid',
    method: 'post',
    data
  })
}
