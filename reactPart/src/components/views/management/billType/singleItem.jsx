import React, { Component } from 'react'
import { Icon, message, Popconfirm } from 'antd'
import { connect } from 'react-redux'

// import testIcon from '../../style/img/eatingIcon.png'
import { formDate } from '../../../../publicFunction'
import { getAllBillTypes } from '../../../common/store/actionCreaters'
import { Model } from '../../../../dataModule/testBone'
import { deleteBillTypeWithUuidUrl } from '../../../../dataModule/UrlList'
import './style.less'

const model = new Model()

class SingleItem extends Component {
  deleteBill = (uuid) => {
    const { userUuid } = this.props
    model.fetch(
      {
        uuid: uuid,
        creater: userUuid
      },
      deleteBillTypeWithUuidUrl,
      'post',
      function(response) {
        if (response.data.status === 500) {
          message.error(response.data.warning)
          return
        }
        message.success('删除成功！')
        getAllBillTypes(userUuid)
      },
      function(response) {}
    )
  }

  confirm = (uuid) => {
    this.deleteBill(uuid)
  }

  render() {
    const { billTypeItem } = this.props
    const itemClassName = billTypeItem.nature === 1 ? 'single-item' : 'single-item income-item'

    return (
      <div className={itemClassName}>
        <div className='left-block'>
          <img src={billTypeItem.icon} alt={''}/>
          <span>{billTypeItem.name}</span>
        </div>
        <div className='center-block'>
          <span>{billTypeItem.nature === 1 ? '支出' : '收入'}</span>
          <span style={{ marginLeft: 20 }}>{formDate(billTypeItem.created_date)}</span>
        </div>
        <div className='right-block'>
          {/* <Icon type='edit' style={{ cursor: 'pointer' }}/>*/}
          <Popconfirm
            style={{ backgroundColor: '#000' }}
            title='确定要删除该类型？'
            onConfirm={() => this.confirm(billTypeItem.uuid)}
            okText='Yes'
            cancelText='No'
          >
            <Icon
              type='delete'
              theme={'filled'}
              style={{ marginLeft: 20, color: 'red', cursor: 'pointer', fontSize: 20 }}
            />
          </Popconfirm>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(SingleItem)
