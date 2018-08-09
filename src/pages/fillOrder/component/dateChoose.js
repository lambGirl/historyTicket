import React from 'react'
import Styles from '../index.less'
import ClassNames from 'classnames'
import Router from 'umi/router'
export  default class DateChoose extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            effectiveDate: props.effectiveDate, //effectiveDate:可用的日期
        }
    }

    getChooseDate(){
        let {effectiveDate} = this.props,{date,index} =  effectiveDate;
        let defaultDate = date[effectiveDate.index].date;
        Router.push(`/date?defaultDate=${defaultDate}`);
    }

    render(){
        let {effectiveDate} = this.props;
      // console.log("effectiveDate",effectiveDate);
        return <div className={Styles['fillOrderDate']}>
            <div className={ClassNames(Styles['fontIconStyle'])}>
                <span className={Styles['fontIcon']}></span>
                使用日期
            </div>
            <div className={Styles['chooseDateList']}>

                {
                    effectiveDate.date.map((item,index)=>{
                        return <div key={'chooseDateList'+index} className={ClassNames(Styles['common'],{
                            [Styles["default"]]:item.use,
                            [Styles["active"]]: effectiveDate.index === index,
                            [Styles["disable"]]:!item.use
                        })}>
                            <div>{index === 0&&"今天"||index === 1&&"明天"||""}{item.date.substr(5,item.date.length)} </div>
                            <div style={{"whiteSpace": "nowrap","overflow":"hidden","width":"100%","textOverflow": "inherit"}}>{item.use&&`¥${item.price}`||"不可用"}</div>
                        </div>
                    })
                }
                <div className={ClassNames(Styles['moreDate'])} onClick={this.getChooseDate.bind(this)}>
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
