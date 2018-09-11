import React from 'react'
import Styles from '../index.less'
import ClassNames from 'classnames'
import {baseUtil} from "../../../utils/util";

export  default  class OrderItem extends React.Component{

    render(){
        let {item} =  this.props, orderItem = baseUtil.orderDetailStatus(item.state) ;
        if(!item){
            return;
        }
        console.log("orderItem",orderItem);
        return <li className={Styles['orderListSingle']} onClick={(e)=>{e.stopPropagation(); e.preventDefault();this.props.ClickItem(item)}}>
            <div className={Styles["orderListStatus"]}><span
            style={{"color":`${orderItem.statusColor}`}}>{orderItem.status}</span></div>
            <div className={Styles["orderListCenter"]}>
                <div>
                    <div className={ClassNames(Styles["color_1B1B1B"],
                        Styles["font30"])}>{item.productName}</div>
                    <div className={ClassNames(Styles["color_929292"],
                        Styles["font24"])}>使用时间: {Date.parse1(item.travelDate).format("MM月dd号")}</div>
                </div>
                <div>
                    <div className={ClassNames(Styles["color_3e"],
                        Styles["font32"])} style={{"fontWeight":"bolder"}}>¥{item.totalPrice}</div>
                    <div className={ClassNames(Styles["color_3e"],
                        Styles["font24"])}>共{item.sellQuantity}张票</div>
                </div>
            </div>
            {
                orderItem.orderListGroupBtn&&orderItem.orderListGroupBtn.show&&<div>
                    {orderItem.orderListGroupBtn.btnList["pay"]&&<div className={Styles[ "payment" ]} onClick={(e)=>{e.stopPropagation(); e.preventDefault();this.props.btnClick(item,'pay')}}>立即支付</div>||''}
                    {orderItem.orderListGroupBtn.btnList["delete"]&&<div className={Styles[ "cancel" ]} onClick={(e)=>{e.stopPropagation(); e.preventDefault();this.props.btnClick(item,'delete')}}>删除</div>||''}
            </div>||''
            }
        </li>
    }
}
