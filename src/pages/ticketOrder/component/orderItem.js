import React from 'react'
import Styles from '../index.less'
import ClassNames from 'classnames'

export  default  class OrderItem extends React.Component{
    render(){
        return <li className={Styles['orderListSingle']}>
            <div className={Styles["orderListStatus"]}><span>待支付</span></div>
            <div className={Styles["orderListCenter"]}>
                <div>
                    <div className={ClassNames(Styles["color_1B1B1B"],
                        Styles["font30"])}>安仁古镇门票</div>
                    <div className={ClassNames(Styles["color_929292"],
                        Styles["font24"])}>使用时间: 07月19日 10:10</div>
                </div>
                <div>
                    <div className={ClassNames(Styles["color_3e"],
                        Styles["font32"])}>¥150</div>
                    <div className={ClassNames(Styles["color_3e"],
                        Styles["font28"])}>共1张票</div>
                </div>
            </div>
            <div>
                <div className={Styles["payment"]}>删除</div>
                <div className={Styles["cancel"]}>删除</div>
                <div className={Styles["payment"]}>删除</div>
            </div>
        </li>
    }
}
