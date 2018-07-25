import React from 'react';
import  BScroll from 'better-scroll';
import PropTypes from 'prop-types';
import Styles from './index.less'
class Scroll extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this._initScroll();
        window.addEventListener('resize',() =>{
            this.refresh();
        })
    }

    render(){
        return <div ref="wrapper"  className={Styles["wrapper"]}>
            <ul className={Styles["content"]}>
            <li><div>sdfsdfsfsdfsfdf</div></li>
            <li><div>sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>水电费sdfsdfsfsdfsfdf</div></li>
            <li><div>sdfsdfsfsdfsfdf</div></li>
            <li><div>sdfsdfsfsdfsfdf</div></li>
            <li><div>sdfsdfsfsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdf水电费fsdfsfdf</div></li>
            <li><div>sdfsdfsfsdfsfd微软微软</div></li>
            <li><div>sdfsdfsfsdfsfd微软微软</div></li>
            <li><div>sdfsdfsfsdfsfd微软微软</div></li>
            <li><div>sdfsdfsfsdfsfd微软微软</div></li>
            <li><div>sdfsdfsfsdfsfd微软微软</div></li>
            <li><div>sdfsdfsfsdfsfd微软微软</div></li>
            </ul>
        </div>
    }

    _initScroll(){
        let wrapper = this.refs.wrapper;
        setTimeout(()=>{
            this.scroll = new BScroll(wrapper,{
                scrollY: true,
                click: true
            })
        },20)
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
