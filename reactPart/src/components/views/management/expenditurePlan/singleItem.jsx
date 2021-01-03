import React, { Component } from 'react'
import { Icon, Popconfirm, message } from 'antd'
import { connect } from 'react-redux'

// import testIcon from '../../style/img/eatingIcon.png'
import { deleteExpenditurePlanWithUuid } from '../../../../dataModule/UrlList'
import { actionCreators } from '../store'

class SingleItem extends Component {
  deleteBill = (uuid) => {
    const { selectedMonth, userUuid } = this.props
    deleteExpenditurePlanWithUuid({ uuid })
      .then(res => {
        if (res.data.status !== 200) {
          message.error(res.data.warning)
        } else {
          actionCreators.getUserExpenditurePlanWithUserAndMonth(selectedMonth, userUuid)
          message.success('删除财政计划成功！')
        }
      })
  }

  confirm = (uuid) => {
    this.deleteBill(uuid)
  }

  render() {
    const { expenditurePlanItem } = this.props
    const itemClassName = expenditurePlanItem.nature === 1 ? 'single-item' : 'single-item income-item'

    return (
      <div className={itemClassName}>
        <div className='left-block'>
          <img src={expenditurePlanItem.icon} alt={''}/>
          <span style={{ marginRight: 20, minWidth: '20%' }}>{expenditurePlanItem.amount} 元</span>
          <span>{expenditurePlanItem.name}：</span>
          <span>{expenditurePlanItem.content}</span>
        </div>
        <div className='center-block'>
          <span>{expenditurePlanItem.nature === 1 ? '支出' : '收入'}</span>
          <span style={{ marginLeft: 20 }}>{expenditurePlanItem.expenditure_month}</span>
        </div>
        <div className='right-block'>
          {/* <Icon type='edit' style={{ cursor: 'pointer' }}/>*/}
          <Popconfirm
            style={{ backgroundColor: '#000' }}
            title='确定要删除该类型？'
            onConfirm={() => this.confirm(expenditurePlanItem.uuid)}
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
