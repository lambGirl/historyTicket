import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import Scroll from '../../components/scroll'
import Router from 'umi/router'
import CardBox from  '../../components/cardBox'
import { baseUtil } from "../../utils/util";
import Request from '../../utils/request'
import {connect} from 'dva'
let orderStatus =  false, paying =  false;

@connect(({orderDetail,loading})=>({
    orderDetail,
    loading
}))

export default class TicketOrderDetail extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            timeIntervar:""
        }
    }
    UNSAFE_componentWillMount(){
        //console.log("now");
        let orderNo =  Router.location.query.orderNum,
        userToken =  baseUtil.get("cdqcp_opid");

         /* 这里去查询此时订单的状态
         */
        this.props.dispatch({
            type:'orderDetail/fetch',
            payload:{
                orderNo:orderNo,
                userToken: userToken
            }
        })
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        let {orderDetail} =  nextProps.orderDetail,_this =  this;
        orderDetail&&!orderStatus&&(orderDetail.state = "booking");
        //开启一个方法去轮训，直到不等于booking，此时就去重新触发一次查询订单详情的接口
        if(orderDetail&&orderDetail.state === "booking"&&!orderStatus){
            let orderNo =  Router.location.query.orderNum,
                userToken =  baseUtil.get("cdqcp_opid");
            orderStatus =  true;
           this.state.timeIntervar =  setInterval(()=>{
               // console.log("------------------");
                Request('/api?server=trip_getOrderState',{
                    method: "post",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify({
                        orderNo:orderNo,
                        userToken: userToken})
                }).then((result)=>{
                    //console.log("result", result);
                    if(result.data.pubResponse.code === "0000"&&result.data.body.state !== "booking"){
                        _this.props.dispatch({
                            type:'orderDetail/fetch',
                            payload:{
                                orderNo:orderNo,
                                userToken: userToken
                            }
                        });
                        clearInterval(_this.state.timeIntervar)
                    }
                })
            },4000);
            return;
        }

        //待支付的情况，开启定时器计算时间
        if(orderDetail&&orderDetail.state === "book_succeed"&&!paying){

            return;
        }

    }
    //基本信息
    renderBaseInfo(){
        let {orderDetail} =  this.props.orderDetail;

        return <div className={Styles['writeOrder-cardContent']}>
            <div>
                <div className={Styles["name"]}>商品名称</div>
                <div>{orderDetail.productName}</div>
            </div>
            <div>
                <div className={Styles["name"]}>入园日期</div>
                <div>{orderDetail.travelDate}{Date.parseTimeStr(orderDetail.travelDate).getweek()}</div>
            </div>
            <div>
                <div className={Styles["name"]}>有效期</div>
                <div>安仁古镇门票</div>
            </div>
            <div>
                <div className={Styles["name"]}>换票时间</div>
                <div>{orderDetail.travelDate}</div>
            </div>
            <div>
                <div className={Styles["name"]}>退改规则</div>
                <div>安仁古镇门票</div>
            </div>
            <div>
                <div className={Styles["name"]}>换票地址</div>
                <div>{orderDetail.ticketGetAddress[0]}</div>
            </div>
            <div>
                <div className={Styles["name"]}>入园地址</div>
                <div>{orderDetail.getInAddress[0]}</div>
            </div>
            <div>
                <div className={Styles["name"]}>成人票</div>
                <div>安仁古镇门票</div>
            </div>
        </div>
    }
    //订单信息
    renderOrderInfo(){
        let {orderDetail} =  this.props.orderDetail;



        return <div className={Styles['writeOrder-cardContent']}>
            <div>
                <div className={Styles["name"]}>订单编号</div>
                <div>{orderDetail.orderNo}</div>
            </div>
            <div>
                <div className={Styles["name"]}>创建时间</div>
                <div>{orderDetail.orderCreateTime}</div>
            </div>
            { orderDetail.orderPayTime&&<div>
                <div className={Styles["name"]}>支付时间</div>
                <div>{orderDetail.orderPayTime}</div>
            </div>||''
            }
        </div>
    }
    //出游客信息
    renderPersonInfo(){
        let {orderDetail} =  this.props.orderDetail,
            {travellers} = orderDetail;

        return <div>
            {travellers.length && travellers.map((item, index) => {
                return <div className={Styles['writeOrder-cardContent']} key={"travellers"+index}>
                    <div className={Styles["paddingLR30"]}>
                        <div className={Styles["name"]}>出游人</div>
                        <div>{item.travellerName}</div>
                    </div>
                    <div className={Styles["paddingLR30"]}>
                        <div className={Styles["name"]}>证件号码</div>
                        <div>{item.cardNo}</div>
                    </div>
                    <div className={Styles["paddingLR30"]}>
                        <div className={Styles["name"]}>手机号</div>
                        <div>{item.phone}</div>
                    </div>
                    {index !== travellers.length-1&&<div className={Styles["line"]}></div>||""}
                </div>
             })
            }
        </div>

    }

    getContent(orderDetail, con){
        //待支付的情况需要对应的时间
        if(orderDetail.status === "book_succeed"){
            return  <div>请在<span>17分30秒</span>内完成支付，逾期将自动取消订单哦~</div>;
        }
        return con.content;
    }
    render(){
        let { orderDetail } =  this.props.orderDetail;
        if(!orderDetail){
            return null
        }
        //console.log("top", orderDetail);
        let top =  baseUtil.orderDetailStatus(orderDetail.state);
        //console.log("top", top);
        return <div className={Styles["ticketOrderDetail-Main"]}>
            <Header
                mode="common"
                leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i>}
            >
                <div style={{"textAlign":'center','color':'#fff'}}>订单详情</div>
            </Header>
            <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
                <Scroll class={Styles['wrapper']}>
                    <div className={Styles['scroll-cotent-bottom']}>
                        <div className={Styles['orderDetail-status']}>
                            <div className={ClassNames(Styles['orderDetail-status-Content'],{
                                [Styles['mangLine']]:top.mangLine,
                                [Styles['singleLine']]:top.singleLine,
                            })}>
                                <div>
                                    <i className={ClassNames(Styles['orderStatus'],{
                                        [Styles["paying"]]:top.icon === 'paying',
                                        [Styles["useing"]]:top.icon === 'useing',
                                        [Styles["used"]]:top.icon === 'used',
                                        [Styles["retired"]]:top.icon === 'retired'
                                    })}></i>
                                    <span>{top.status}</span>
                                </div>
                                <div>
                                    <span>¥{orderDetail.totalPrice}</span>
                                    <i className={Styles['orderStatus-warning']}></i>
                                </div>
                            </div>
                            {top.mangLine&&<div className={Styles['orderDetail-status-detail']}>{this.getContent(orderDetail, top)}</div>||""}
                        </div>
                        <div className={Styles['mgtop20']}>
                            <CardBox
                                cardTitleIcon={true}
                                cardTitle="基本信息"
                                content={this.renderBaseInfo()}
                            />
                        </div>
                        <div className={Styles['mgtop20']}>
                            <CardBox
                                noPadding={true}
                                cardTitleIcon={true}
                                cardTitle="出游人信息"
                                content={this.renderPersonInfo()}
                            />
                        </div>
                        <div className={Styles['mgtop20']}>
                            <CardBox
                                cardTitleIcon={true}
                                cardTitle="订单信息"
                                content={this.renderOrderInfo()}
                                disabled={true}
                            />
                        </div>

                    </div>
                </Scroll>
            </div>
            {
                top.doubleBtn&&<div className={Styles["footer-fixed-paying"]}>
                    <div>
                        <div>作废订单</div>
                        <div>继续支付</div>
                    </div>
                </div>||""
            }
        </div>
    }
    //页面销毁前
    componentWillUnmount(){
        this.state.timeIntervar&&clearInterval(this.state.timeIntervar);
    }
}
