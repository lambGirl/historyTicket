import React, { Component } from 'react'
import PropTypes from 'prop-types'

import BScroll from 'better-scroll'
import Loading from '../loading/loading'
import Bubble from '../bubble/bubble'

import Styles from './betterScroll.css'

let defaultPullDownRefresh = {
  threshold: 10,
  stop: 50,
  stopTime: 300,
  txt: {
    success: '刷新成功',
  },
}

let defaultPullUpLoad = {
  threshold: 0,
  txt: {
    more: '加载更多',
    nomore: '我是有底线的',
  },
}

class Scroll extends Component {

  static defaultProps = {
    probeType: 3,
    click: false, // https://ustbhuangyi.github.io/better-scroll/doc/options.html#tap
    startY: 0,
    scrollY: true,
    scrollX: false,
    freeScroll: false,
    scrollbar: false,
    pullDownRefresh: false,
    pullUpLoad: false,
    preventDefaultException: {
      className: /(^|\s)originEvent(\s|$)/,
      tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT|TABLE)$/,
    },
    eventPassthrough: '',
    isPullUpTipHide: true,
    bounce: false,
  }

  static propTypes = {
    children: PropTypes.any,
    probeType: PropTypes.number,
    startY: PropTypes.number,
    click: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
    scrollY: PropTypes.bool,
    scrollX: PropTypes.bool,
    freeScroll: PropTypes.bool,
    scrollbar: PropTypes.bool,
    pullDownRefresh: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    pullUpLoad: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.bool,
    ]),
    pullUpLoadMoreData: PropTypes.func,
    canRenderPullUpTip: PropTypes.bool,
    doPullDownFresh: PropTypes.func,
    doScroll: PropTypes.func,
    doScrollStart: PropTypes.func,
    doScrollEnd: PropTypes.func,

    preventDefaultException: PropTypes.object,
    eventPassthrough: PropTypes.string,
    isPullUpTipHide: PropTypes.bool,
  }

  constructor (props, context) {
    super(props, context)

    this.scroll = null // scroll 实例

    this.isRebounding = false
    this.pulling = false

    this.pullDownInitTop = -50

    this.state = {
      isPullUpLoad: false,
      beforePullDown: true,
      isPullUpLoadResult: false,
      pulling: false,
      pullDownStyle: {
        top: `${this.pullDownInitTop}px`,
      },
      bubbleY: 0
    }

  }

  componentDidMount () {
    this.initScroll()
  }

  componentDidUpdate (prevProps) {
    if (this.props.children !== prevProps.children) {
      if (!this.state.pulling) {
        this.scroll.refresh()
      }
    }
  }

  componentWillUnmount () {
    this.scroll.stop()
    this.scroll = null
    this.a = null
    this.b = null
  }

  initScroll () {
    let { probeType, click, startY, scrollY, scrollX, freeScroll, scrollbar, pullDownRefresh, pullUpLoad, preventDefaultException, eventPassthrough } = this.props

    let _pullDownRefresh = typeof pullDownRefresh === 'object' ? {
      ...defaultPullDownRefresh,
      ...pullDownRefresh
    } : (pullDownRefresh ? defaultPullDownRefresh : false)

    let _pullUpLoad = typeof pullUpLoad === 'object' ? {
      ...defaultPullUpLoad,
      ...pullUpLoad
    } : (pullUpLoad ? defaultPullUpLoad : false)

    this.options = {
      probeType:3,
      click:true,
      startY,
      scrollY,
      freeScroll:true,
      scrollX,
      scrollbar,
      pullDownRefresh : _pullDownRefresh,
      pullUpLoad: _pullUpLoad,
      preventDefaultException,
      eventPassthrough,
      bounce:false,
      momentum:true
    }

    let wrapper = document.querySelector("."+`${Styles['b-wrapper']}`)

    this.scroll = new BScroll(wrapper, this.options)
    this.initEvents()
  }

  initEvents () {
    // console.log("this.options.pullUpLoad",this.options.pullUpLoad);
      //下来加载数据 实现分页，则需要分页的页面要小于最大的页数
    if (this.options.pullUpLoad && this.props.currPage < this.props.totalPage) {
      this._initPullUpLoad();
    }
    if (this.options.pullDownRefresh) {
      this._initPullDownRefresh()
    }
    if (this.props.doScrollStart) {
      this.scroll.on('scrollStart', (pos) => {
        this.props.doScrollStart(pos)
      })
    }
    if (this.props.doScroll) {
      this.scroll.on('scroll', (pos) => {
        this.props.doScroll(pos)
      })
    }
    if (this.props.doScrollEnd) {
      this.scroll.on('scrollEnd', (pos) => {
        this.props.doScrollEnd(pos)
      })
    }
  }


  getScrollObj = () => {
    return this.scroll
  }


    _initPullDownRefresh () {
    this.scroll.on('pullingDown', () => {
      this.setState({
        beforePullDown: false,
        pulling: true,
      })

      this.props.doPullDownFresh()
        .then(() => {
          this.setState({
            pulling: false,
          })
          this._reboundPullDown()
            .then(() => {
              this._afterPullDown()
            })
        })
    })

    this.scroll.on('scroll', (pos) => {
      const { beforePullDown } = this.state

      if (pos.y < 0) {
        return
      }

      if (beforePullDown) {
        this.setState({
          bubbleY: Math.max(0, pos.y + this.pullDownInitTop),
          pullDownStyle: {
            top: `${Math.min(pos.y + this.pullDownInitTop, 10)}px`,
          },
        })
      } else {
        this.setState({
          bubbleY: 0,
        })
      }

      if (this.isRebounding) {
        this.setState({
          pullDownStyle: {
            top: `${10 - (defaultPullDownRefresh.stop - pos.y)}px`,
          },
        })
      }
    })
  }

  _reboundPullDown = (ev) => {
    //  console.log("我来了的");
    let { stopTime = 100 } = this.options.pullDownRefresh
      ev.preventDefault();
    return new Promise((resolve) => {
      this.a = setTimeout(() => {
        this.isRebounding = true
        this.scroll.finishPullDown()
        resolve()
      }, stopTime)
    })
  }

  _afterPullDown () {
    setTimeout(() => {
      this.setState({
        beforePullDown: true,
        pullDownStyle: {
          top: `${this.pullDownInitTop}px`,
        },
      })
      this.isRebounding = false
      this.scroll.refresh()
    }, this.scroll.options.bounceTime)
  }

  _needMoreData(){

  }

  componentDidUpdate(nextProps, prevState){
      //console.log("componentDidUpdate", nextProps, prevState)
      let {currPage,totalPage } = nextProps
      //否则继续滚动
      if(currPage < totalPage){
          this.scroll.finishPullUp();
          this.scroll.refresh();
      }
      // console.log("sdfsdf", )
      //滚动的页数如果等于当前页面了则结束滚动
      // console.log("水电费水电费11111", now_isPullUpLoad);
      //console.log("currPage",currPage, totalPage)
      if(currPage >= totalPage){
         /* this.setState({
              isPullUpLoad: false,
          });*/
          this.scroll.off("pullingUp");
      }
  }

    /**
     * 上拉滚动的事件
     * @private
     */
  _initPullUpLoad = () => {
     var _this =  this;
    //scroll 监听向上滚动
    this.scroll.on('pullingUp', () => {
      this.setState({
        isPullUpLoad: true,
      });
      //console.log("--------------------")
        this.props.pullUpLoadMoreData();/*.then((result) => {
            //console.log("")
            let now_isPullUpLoad =  result;
            //否则继续滚动
            if(now_isPullUpLoad.currentPage < now_isPullUpLoad.totalPage){
                this.scroll.finishPullUp();
                this.scroll.refresh();
            }
           // console.log("sdfsdf", )
           //滚动的页数如果等于当前页面了则结束滚动
           // console.log("水电费水电费11111", now_isPullUpLoad);
            if(now_isPullUpLoad.currentPage >= now_isPullUpLoad.totalPage){
                this.setState({
                    isPullUpLoad: false,
                });
                this.scroll.off("pullingUp");
            }
        }).then(()=>{

        })*/
    })
  }

  renderPullUpLoad () {
    let { pullUpLoad, isPullUpTipHide, currPage, totalPage } = this.props
      //console.log("currPage",currPage, totalPage);
    if (pullUpLoad && isPullUpTipHide ) {
      return (
        <div className={Styles["b-pullup-wrapper"]}>
          <div className= {Styles["after-trigger"]} style={{ lineHeight: '.32rem' }}>
            <span style={{ color: '#999999' }}>{''}</span>
          </div>
        </div>
      )
    }

    if(currPage >= totalPage ){
        return (
            <div className= {Styles["b-pullup-wrapper"]}>
                <div className={Styles["before-trigger"]}>
                    <span style={{ color: '#999999'}}>{typeof pullUpLoad === 'object' ? pullUpLoad.txt.nomore : '加载完成'}</span>
                </div>
            </div>
        )
    }
     // debugger;
    if (pullUpLoad && this.state.isPullUpLoad) {
      return (
        <div className= {Styles["b-pullup-wrapper"]}>
          <div className={Styles["after-trigger"]}>
            <i className={Styles["loading-icon"]}></i>
            <span style={{ color: '#999999'}}>{typeof pullUpLoad === 'object' ? pullUpLoad.txt.more : '加载中...'}</span>
          </div>
        </div>
      )
    }

    /*if (pullUpLoad && !this.state.isPullUpLoad) {
      return (
        <div className="b-pullup-wrapper">
          <div className="before-trigger">
            <span style={{ color: '#999999', fontSize: '.28rem' }}>{typeof pullUpLoad === 'object' ? pullUpLoad.txt.nomore : '加载完成'}</span>
          </div>
        </div>
      )
    }*/
  }

  renderPullUpDown () {
    let { pullDownRefresh } = this.props
    let { beforePullDown, pulling, pullDownStyle } = this.state

    if (pullDownRefresh && beforePullDown) {
      return (
        <div className= {Styles["b-pulldown-wrapper"]} style={pullDownStyle} >
          <div className={Styles["before-trigger"]}>
            <Bubble y={this.state.bubbleY}></Bubble>
          </div>
        </div>

      )
    }

    if (pullDownRefresh && !beforePullDown && pulling) {
      return (
        <div className={Styles["b-pulldown-wrapper"]} style={pullDownStyle}>
          <div className={Styles["after-trigger"]}>
            <div className={Styles["loading"]}>
              <Loading></Loading>
            </div>
          </div>
        </div>
      )
    }

    if (pullDownRefresh && !beforePullDown && !pulling) {
      return (
        <div className={Styles["b-pulldown-wrapper"]} style={pullDownStyle}>
          <div className={Styles["after-trigger"]}>
            <div><span
              style={{ fontSize: '.18rem' }}>{typeof this.options.pullDownRefresh === 'object' ? this.options.pullDownRefresh.txt.success : '刷新完成'}</span>
            </div>
          </div>
        </div>
      )
    }
  }

    scrollToElement(){
        this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments)
    }
    scrollTo(){
        this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments)
    }
    //刷新scroll
    refresh(){
        this.scroll && this.scroll.refresh()
    }

  render () {
    return (
      <div className={Styles["b-wrapper"]}>
        <div className={Styles["b-scroll-content"]}>
          {this.props.children}
          {this.renderPullUpLoad()}
        </div>
        {this.renderPullUpDown()}
      </div>
    )
  }
}

export default Scroll
