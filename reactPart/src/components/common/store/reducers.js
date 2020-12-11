import { fromJS } from 'immutable'
import * as constants from './constants'

const defaultState = fromJS({
  userBillType: []
})

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.userBillType:
      return state.set('userBillType', action.data)
    default:
      return state
  }
}
