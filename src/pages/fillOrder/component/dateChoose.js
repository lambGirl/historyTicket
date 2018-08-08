import React from 'react'
import Styles from '../index.less'
import ClassNames from 'classnames'
export  default class DateChoose extends React.Component{
    render(){
        return <div className={Styles['fillOrderDate']}>
            <div className={ClassNames(Styles['fontIconStyle'])}>
                <span className={Styles['fontIcon']}></span>
                使用日期
            </div>
            <div className={Styles['chooseDateList']}>
                <div className={ClassNames(Styles['common'],{
                    [Styles["default"]]:true,
                    [Styles["active"]]: false,
                    [Styles["disable"]]: false
                })}>
                    <div>今天07-18 </div>
                    <div>不可订</div>
                </div>
                <div className={ClassNames(Styles['common'],{
                    [Styles["default"]]:false,
                    [Styles["active"]]: false,
                    [Styles["disable"]]: true
                })}>
                    <div>明天07-19 </div>
                    <div>¥55</div>
                </div>
                <div className={ClassNames(Styles['common'],{
                    [Styles["default"]]:false,
                    [Styles["active"]]: true,
                    [Styles["disable"]]: false
                })}>
                    <div>07-20周五</div>
                    <div>¥55</div>
                </div>
                <div className={ClassNames(Styles['moreDate'])}>
                    <div>更多日期</div>
                    <div>
                        <i className="fa fa-angle-right fa-lg" style={{"color":"#3E3E3E"}}></i>
                    </div>
                </div>
            </div>
            <div className={Styles['moreDate-remark']}>
                <p className={ClassNames(Styles['font24'], Styles['color_3e'],Styles['mgBottom12'])}>购买后立即使用，7月19日当日使用有效</p>
                <p className={Styles['remarks']}>*此产品可在2017年7月19日 16:00前退款</p>
            </div>
        </div>
    }
}
