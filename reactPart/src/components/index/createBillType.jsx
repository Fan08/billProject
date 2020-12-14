import React, { Component } from 'react'
import { Modal, Input, message, Select } from 'antd'
import { connect } from 'react-redux'

import { getAllBillTypes } from '../common/store/actionCreaters'
import { Model } from '../../dataModule/testBone'
import { addBillTypeUrl } from '../../dataModule/UrlList'
import UploadFile from '../../publicComponents/inputStyleUploadFile'
import './style.less'

const model = new Model()
const { Option } = Select

class CreateBillType extends Component {
  state = {
    uploadedIcon: null,
    nature: null,
    name: null
  }

  initState = () => {
    this.setState({
      uploadedIcon: null,
      nature: null,
      name: null
    })
  }

  handleOk = () => {
    const { handleCancel, userUuid } = this.props
    const { name, nature, uploadedIcon } = this.state
    model.fetch(
      {
        name,
        nature,
        creater: userUuid,
        icon: uploadedIcon
      },
      addBillTypeUrl,
      'post',
      function(response) {
        getAllBillTypes(userUuid)
        message.success('创建账单类型成功')
      },
      function(response) {
        message.error('创建账单类型失败')
      }
    )
    handleCancel()
    this.initState()
    this.childOfSelectingIcon.clearFile()
  }

  getUploadedIcon = (uploadedIcon) => {
    const me = this
    if (uploadedIcon === null) {
      me.setState({ uploadedIcon: null })
      return
    }
    if (uploadedIcon.size > 1024 * 1000) {
      message.warning('请上传小于 1M 的文件')
      return
    }
    const fileType = uploadedIcon.type.split('/')[0]
    if (fileType !== 'image') {
      message.warning('请上传图片文件')
      return
    }
    const reader = new FileReader()
    reader.readAsDataURL(uploadedIcon)
    reader.onload = function() {
      me.setState({ uploadedIcon: this.result })
    }
  }

  changeBillNature = (value) => {
    this.setState({ nature: value })
  }

  changeBillName = (e) => {
    this.setState({ name: e.target.value })
  }

  onRefOfSelectIcon = (ref) => {
    this.childOfSelectingIcon = ref
  }

  render() {
    const { visible, handleCancel } = this.props
    const { uploadedIcon, nature, name } = this.state

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
          this.initState()
          this.childOfSelectingIcon.clearFile()
        }}
      >
        <div className={'create-bill-type'}>
          <div className={'single-input-item'}>
            <span className={'title'}>类型名称：</span>
            <Input style={{ width: '50%' }} value={name} onChange={this.changeBillName}/>
          </div>
          <div className={'single-input-item'}>
            <span className={'title'}>类型性质：</span>
            <Select style={{ width: '50%' }} onChange={this.changeBillNature} value={nature}>
              <Option value={1}>支出</Option>
              <Option value={0}>收入</Option>
            </Select>
          </div>
          <div className={'single-input-item'}>
            <span className={'title'}>类型图标：</span>
            <UploadFile
              onRef={this.onRefOfSelectIcon}
              className={'upload-bill-type-icon'}
              setSelectedFile={this.getUploadedIcon}
            />
            {uploadedIcon === null ? null : <img src={uploadedIcon} alt={''} />}
          </div>
        </div>
      </Modal>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    userUuid: state.get('commonReducer').get('userUuid')
  }
}

export default connect(mapStateToProps, null)(CreateBillType)
