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

export const billTypes = '/getBillTypesWithCreater'
export const addBillTypeUrl = '/addBillType'
export const deleteBillTypeWithUuidUrl = '/deleteBillTypeWithUuid'

export const getBillWithCreater = '/getBillWithCreater'
export const addBill = '/addBill'
export const deleteBill = '/deleteBill'
export const getBillWithCreaterAndMonthUrl = '/getBillWithCreaterAndMonth'

export function getBillTypesWithCreater(params) {
  return request({
    url: originalUrl + '/getBillTypesWithCreater',
    method: 'post',
    data: params
  })
}
