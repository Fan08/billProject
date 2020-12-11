import { Model } from '../../../dataModule/testBone'
import { billTypes } from '../../../dataModule/UrlList'

const model = new Model()

export const getAllBillTypes = () => {
  model.fetch(
    { creater: 'c6825ed3afa9411694b62e61119544ed' },
    billTypes,
    'POST',
    function(response) {
      console.log(response)
    },
    // eslint-disable-next-line handle-callback-err
    function(error) {
      return
    },
    false
  )
}

