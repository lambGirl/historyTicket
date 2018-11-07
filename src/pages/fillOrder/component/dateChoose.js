import React from 'react'
import Styles from '../index.less'
import ClassNames from 'classnames'
import Router from 'umi/router'
import {baseUtil} from "../../../utils/util";
import { Toast } from 'antd-mobile';

export  default class DateChoose extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            effectiveDate: props.effectiveDate, //effectiveDate:可用的日期
        }
    }

    getChooseDate(){
        let {effectiveDate} = this.props,{date,index} =  effectiveDate;
        if(effectiveDate.index === ""){
            return Toast.info("没有可用日期",2);
        }
        let defaultDate = date[effectiveDate.index].date;
        Router.push(`/date?defaultDate=${defaultDate}`);
    }

    switchTime(index, item){
        if(!item.use){
            return;
        }
        this.props.switchTime(index, item.price);
    }

    renderDateDetialShow(){
        let {fillOrderDetail,effectiveDate} = this.props,
            {productDetail} = fillOrderDetail;
        /**
         * bookType:0, voucherDateEnd 如果为0，则需要只需要在结束日期前有效均可
         * 诶如果不会零就要去计算了累加多少天
         */
         if(!productDetail.bookType)  {
             return <span>
                 {`${Date.parse1(productDetail.productUseRule["voucherDateEnd"]).format("yyyy年MM月dd日")}之前有效`}
             </span>
         }
         if(effectiveDate&&effectiveDate.date.length){
             if(effectiveDate['index'] === ""){
                 return '';
             }

             let date =  effectiveDate.date[effectiveDate['index']].date;

              let dateArray =  baseUtil.formatDateArray(date, productDetail.bookType);
             return <span>
                    购买后在{dateArray.join("或")}使用有效
                </span>
         }
        return null;


    }

    render(){
        let {effectiveDate,fillOrderDetail} = this.props;
        if(!fillOrderDetail){
            return null;
        }
        //console.log("effectiveDate",effectiveDate);
        return <div className={Styles['fillOrderDate']}>
            <div className={ClassNames(Styles['fontIconStyle'])}>
                <div className={Styles['fontIcon']}></div>
                <div className={Styles["name"]}>使用日期</div>
            </div>
            <div className={Styles['chooseDateList']}>

                {
                    effectiveDate.date.length&&effectiveDate.date.map((item,index)=>{
                        return <div onClick={this.switchTime.bind(this, index, item)} key={'chooseDateList'+index} className={ClassNames(Styles['common'],{
                            [Styles["default"]]:item.use,
                            [Styles["active"]]: effectiveDate.index === index,
                            [Styles["disable"]]:!item.use
                        })}>
                            <div>{index === 0&&"今天"||index === 1&&"明天"||""}{item.date.substr(5,item.date.length)}{index !== 0&&index !== 1&&Date.parse1(item.date).getweek()} </div>
                            <div style={{"whiteSpace": "nowrap","overflow":"hidden","width":"100%","textOverflow": "inherit"}}>{item.use&&`¥${baseUtil.numFixed1(item.price)}`||"不可订"}</div>
                        </div>
                    })||''
                }
                <div className={ClassNames(Styles['moreDate'])} onClick={this.getChooseDate.bind(this)}>
                    <div>更多日期</div>
                    <div>
                        <i className="fa fa-angle-right fa-lg" style={{"color":"#3E3E3E"}}></i>
                    </div>
                </div>
            </div>
            <div className={Styles['moreDate-remark']}>
                <p className={ClassNames(Styles['font24'], Styles['color_3e'],Styles['mgBottom12'])}>{this.renderDateDetialShow()}</p>
                {/*<p className={Styles['remarks']}>*此产品可在2017年7月19日 16:00前退款</p>*/}
            </div>
        </div>
    }
}
