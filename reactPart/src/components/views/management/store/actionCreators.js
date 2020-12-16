import { fromJS } from 'immutable'

import * as constants from './constants'
import { getExpenditurePlanByCreaterAndMonth } from '../../../../dataModule/UrlList'
import store from '../../../../store'

const dispatchUserExpenditurePlan = (data) => ({
  type: constants.userExpenditurePlan,
  data: fromJS(data)
})

export function getUserExpenditurePlanWithUserAndMonth(creater, month) {
  getExpenditurePlanByCreaterAndMonth({ creater, month })
    .then(res => {
      for (const i of res.data.expenditurePlans) {
        i['expenditure_month'] = i['expenditure_month'].match(/(\d{4})-(\d{2})/)[0]
      }
       store.dispatch(dispatchUserExpenditurePlan(res.data.expenditurePlans))
    })
}
