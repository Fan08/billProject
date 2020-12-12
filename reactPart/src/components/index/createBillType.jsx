import React, { Component } from 'react'
import { Modal, Input } from 'antd'

import './style.less'

export default class CreateBillType extends Component {
  handleOk = () => {
    const { handleCancel } = this.props
    handleCancel()
  }

  render() {
    const { visible, handleCancel } = this.props

    return (
      <Modal
        title='创建新的账单类型'
        width='50%'
        okText={'确认'}
        cancelText={'取消'}
        visible={visible}
        onOk={this.handleOk}
        onCancel={() => {
          handleCancel()
        }}
      >
        <div className={'create-bill-type'}>
          <div className={'single-input-item'}>
            <span className={'title'}>类型名称：</span>
            <Input style={{ width: '50%' }} />
          </div>
        </div>
      </Modal>
    )
  }
}
