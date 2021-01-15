import React, { Component } from 'react'

import OnePPT from './onePPT'
import { getPPTElements } from '../../../dataModule/UrlList'
import { Button } from 'antd'

export default class Test extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ppt_name: 'C:/Users/ASUS/Desktop/read_ppt_test/PPT/第01章Python概述.pptx',
      ppt_elements: [],
      ppt_width: 0,
      ppt_height: 0,
      current_page: 0
    }
  }

  nextPage = () => {
    const { ppt_elements, current_page } = this.state
    if (ppt_elements.length > current_page + 1) {
      this.setState({
        current_page: current_page + 1
      })
    }
  }

  lastPage = () => {
    const { current_page } = this.state
    if (current_page > 0) {
      this.setState({
        current_page: current_page - 1
      })
    }
  }

  componentDidMount() {
    const { ppt_name } = this.state
    getPPTElements(
      {
        'ppt_path': ppt_name
      }
    ).then(res => {
      this.setState({
        ppt_elements: res.data.elements,
        ppt_width: res.data.width,
        ppt_height: res.data.height
      })
    }).catch(e => {
      console.log(e)
    })
  }

  render() {
    const { ppt_name, ppt_elements, ppt_width, ppt_height, current_page } = this.state
    if (!ppt_name) return null
    if (ppt_elements.length === 0) return null

    return (
      <div>
        <OnePPT ppt_elements={ppt_elements[current_page]} ppt_width={ppt_width} ppt_height={ppt_height}/>
        <Button onClick={this.lastPage}>上一页</Button>
        <Button type={'primary'} style={{ marginLeft: 20 }} onClick={this.nextPage}>下一页</Button>
        {/* { ppt_elements.map((item, index) => <OnePPT*/}
        {/*  key={index}*/}
        {/*  ppt_elements={item}*/}
        {/*  ppt_width={ppt_width}*/}
        {/*  ppt_height={ppt_height}*/}
        {/* />) } */}
      </div>
    )
  }
}
