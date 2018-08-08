import React from 'react'
import ClassNames from 'classnames'
import Styles from '../index.less'
export default  class CanBuyNum extends React.Component{
    render(){
        return  <div className={Styles['buyNum']}>
            <div className={ClassNames(Styles['fontIconStyle'])}>
                <span className={Styles['fontIcon']}></span>
                购买数量
            </div>
            <div>
                <div className={ClassNames(Styles['common'], Styles['reduce'],Styles['mgright20'])}>-</div>
                <div className={ClassNames(Styles['numberShow'],Styles['mgright20'])}>0</div>
                <div className={ClassNames(Styles['common'], Styles['add'])}>+</div>
            </div>
        </div>
    }
}
