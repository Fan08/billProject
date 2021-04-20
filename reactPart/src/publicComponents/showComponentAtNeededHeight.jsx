import React, { Component } from 'react'
import './style.less'

export default class ShowComponentAtNeededHeight extends Component {
  state = {
    currentPageYOffset: 0
  }

  getPageYOffset = () => {
    this.setState({ currentPageYOffset: window.pageYOffset })
  }

  componentDidMount() {
    window.onscroll = this.getPageYOffset
  }

  componentWillUnmount() {
    window.onscroll = null
  }

  render() {
    const { needDom } = this.props
    const { currentPageYOffset } = this.state
    const dom = document.getElementsByClassName('judgeWhetherShow')[0]
    if (dom !== undefined && currentPageYOffset > 445) {
      if (dom.style.visibility === 'hidden' || dom.style.visibility === '') {
        dom.style.visibility = 'visible'
        dom.style.animation = '.5s showDom'
      }
    } else if (dom !== undefined && currentPageYOffset < 445 && dom.style.visibility === 'visible') {
      dom.style.animation = '.5s hiddenDom'
      dom.style.visibility = 'hidden'
    }

    return (
      <div className={'judgeWhetherShow'}>{needDom}</div>
    )
  }
}
