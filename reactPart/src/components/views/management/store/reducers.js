import { fromJS } from 'immutable'

import * as constants from './constants'

const defaultState = fromJS({
  userExpenditurePlan: [],
  programmeOutput: 0.00,
  programmeInput: 0.00
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.programmeInput:
      return state.set('programmeInput', action.data)
    case constants.programmeOutput:
      return state.set('programmeOutput', action.data)
    case constants.userExpenditurePlan:
      return state.set('userExpenditurePlan', action.data)
    default:
      return state
  }
}
