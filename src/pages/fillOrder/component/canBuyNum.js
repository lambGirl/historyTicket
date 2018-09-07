import React from 'react'
import ClassNames from 'classnames'
import Styles from '../index.less'
import {connect}  from 'dva'
export default  class CanBuyNum extends React.Component{
    addReduceNum(num){

        this.props.clickItem(num);
    }
    render(){

        return  <div className={Styles['buyNum']}>
            <div className={ClassNames(Styles['fontIconStyle'])}>
                <div className={Styles['fontIcon']}></div>
                <div className={Styles["name"]}>购买数量</div>
            </div>
            <div>
                <div className={ClassNames(Styles['common'], Styles['reduce'],Styles['mgright20'],{
                    [Styles["disable"]]:this.props.reduceDisable|| false
                })} onClick={this.addReduceNum.bind(this,-1)}>-</div>
                <div className={ClassNames(Styles['numberShow'],Styles['mgright20'])}>{this.props.initNum}</div>
                <div className={ClassNames(Styles['common'], Styles['add'],{
                    [Styles["disable"]]: this.props.addDisable||false
                })} onClick={this.addReduceNum.bind(this,1)}>+</div>
            </div>
        </div>
    }
}
