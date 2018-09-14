import React, { Component } from 'react' ;
import Scroll from './scroll/index';

export default class VerticalScrollPage extends Component {
    constructor (props, context) {
        super(props, context)

    }


    scrollToElement(){
      //  console.log("arguments",arguments);
       this.refs.scrollSwipe.scrollToElement(arguments);
    }
    scrollTo(){
        this.refs.scrollSwipe.scrollTo(arguments);
    }
    //刷新scroll
    refresh(){
        this.refs.scrollSwipe.refresh(arguments);
    }
    render () {
      //  console.log("this.props", this.props.children);
        return (
             <div className="better-container" style={{height:this.props.height}}>
                 <Scroll
                     ref="scrollSwipe"
                     pullUpLoad={this.props.needMore&&{
                         threshold: 0,
                         txt: {
                             more: '加载中...',
                             nomore: this.props.nomoreTxt?"":'没有更多了哦',
                         },
                     }||false}
                     currPage={this.props.currPage}
                     totalPage={this.props.totalPage}
                     pullUpLoadMoreData={this.props.needMore&&this.props.loadMoreData||null}
                     isPullUpTipHide={ !this.props.children&&true||false}
                     pullDownRefresh={this.props.needRefresh}
                     doPullDownFresh={this.props.needRefresh&&this.props.pullDownFreshAction||null}
                     scrollbar={false}
                     doScroll={this.props.doScroll}
                 >
                     {this.props.children}
                 </Scroll>
             </div>
        )
    }
}
