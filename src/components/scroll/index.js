import React from 'react';
import  BScroll from 'better-scroll';
import PropTypes from 'prop-types';
/*import Styles from './index.less'*/
class Scroll extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        }
    }
    componentDidMount(){
        setTimeout(()=>{
            this._initScroll();
        },20)
        window.addEventListener('resize',() =>{
            this.refresh();
        })
    }

    componentWillUpdate(){
        this.refresh()
    }

    componentDidUpdate(){
        this.refresh()
    }

    render(){
        let { pullUpLoad } =  this.props;
        return <div ref="wrapper"  className={this.props.class||""}>
            {this.props.children}
            {
                pullUpLoad&&<div className="pullup-wrapper">
                    {!this.state.isPullUpLoad ? (
                        <div className="before-trigger">
                            <span>加载中</span>
                        </div>
                    ) : (
                        <div className="after-trigger">
                           加载更多
                        </div>
                    )}
                </div>
            }
        </div>
    }

    _initScroll(){
        let wrapper = this.refs.wrapper,_self =  this;
        this.scroll = new BScroll(wrapper,{
                scrollY: true,
                click: true,
                probeType:3,
               /* flickLimitDistance:10000,*/
                bounce:false,
                momentum:true,
        });
        this.scroll.on('scroll',(pos) =>{
               // console.log("pos",pos);
                _self.props.scrollFun && _self.props.scrollFun(pos)
            })

        /*this.scroll.on('scrollEnd',(pos) =>{
            _self.props.scrollFun && _self.props.scrollFun(pos,'end')
        })*/

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

}

//props过来定义规范
Scroll.propsType = {
    probeType: PropTypes.number,
    click: PropTypes.bool,
    listenScroll:PropTypes.bool ,
    data: PropTypes.array,
    pullup: PropTypes.bool,
    beforeScroll: PropTypes.bool,
    refreshDelay: PropTypes.number
}

Scroll.defaultProps = {
    probeType: 1,
    click: true,
    listenScroll: false,
    data: null,
    pullup: true,
    beforeScroll: false,
    refreshDelay: 20
}

export default Scroll;
