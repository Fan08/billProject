import { fromJS } from 'immutable'

import * as constants from './constants'
import { getExpenditurePlanByCreaterAndMonth } from '../../../../dataModule/UrlList'
import store from '../../../../store'

const dispatchUserExpenditurePlanIsLoading = (data) => ({
  type: constants.userExpenditurePlanIsLoading,
  data: fromJS(data)
})

const dispatchProgrammeOutput = (data) => ({
  type: constants.programmeOutput,
  data: fromJS(data)
})

const dispatchProgrammeInput = (data) => ({
  type: constants.programmeInput,
  data: fromJS(data)
})

const dispatchUserExpenditurePlan = (data) => ({
  type: constants.userExpenditurePlan,
  data: fromJS(data)
})

export function getUserExpenditurePlanWithUserAndMonth(creater, month) {
  store.dispatch(dispatchUserExpenditurePlanIsLoading(true))
  getExpenditurePlanByCreaterAndMonth({ creater, month })
    .then(res => {
      let input = 0.0
      let output = 0.0
      for (const i of res.data.expenditurePlans) {
        i['expenditure_month'] = i['expenditure_month'].match(/(\d{4})-(\d{2})/)[0]
        if (i['nature'] === 1) {
          output += i['amount']
        } else if (i['nature'] === 0) {
          input += i['amount']
        }
      }
      store.dispatch(dispatchProgrammeInput(input))
      store.dispatch(dispatchProgrammeOutput(output))
      store.dispatch(dispatchUserExpenditurePlan(res.data.expenditurePlans))
      store.dispatch(dispatchUserExpenditurePlanIsLoading(false))
    })
}
