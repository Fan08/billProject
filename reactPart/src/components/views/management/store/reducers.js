import { fromJS } from 'immutable'

import * as constants from './constants'

const defaultState = fromJS({
  userExpenditurePlan: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.userExpenditurePlan:
      return state.set('userExpenditurePlan', action.data)
    default:
      return state
  }
}
