import React, { Component } from 'react'
import { Spin } from 'antd'

import './style.less'

class LoadingUI extends Component {
    render() {
        return (
            <div className={'loading-ui'}>
                <Spin size='small' />
                <Spin />
                <Spin size='large' />
            </div>
        )
    }
}

export default LoadingUI
