import React, { Component } from 'react'

import './test.less'

export default class OnePPT extends Component {
  render() {
    // eslint-disable-next-line no-unused-vars
    const { ppt_elements, ppt_width, ppt_height } = this.props
    // eslint-disable-next-line no-unused-vars
    return (
      <div className={'one_ppt'}>
        {
          ppt_elements.map((item, index) => {
            const need_top = item.top / ppt_height * 100 + '%'
            const need_left = item.left / ppt_width * 100 + '%'
            switch (item.type) {
              case 'text':
                return <span
                  style={{ left: need_left, top: need_top }}
                  className={'ppt_span'}
                  key={'one_ppt_text' + index}
                >{item.content}</span>
              case 'picture':
                // return null
                const need_height = item.height / ppt_height * 100 + '%'
                const need_width = item.width / ppt_width * 100 + '%'
                return <img
                  className={'ppt_img'}
                  alt={''}
                  src={'data:image;base64,' + item.content}
                  style={{ width: need_width, height: need_height, left: need_left, top: need_top }}
                  key={'one_ppt_picture' + index}
                />
              default:
                return null
            }
          })
        }
      </div>
    )
  }
}
