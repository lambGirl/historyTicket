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
import { Modal} from 'antd-mobile';
const prompt = Modal.alert;
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
            timeIntervar:"",
            returntime:0,        //判断支付时间是否已经过期
            orderNo: Router.location.query.orderNum,
            userToken: baseUtil.get("cdqcp_opid")||Router.location.query.opid
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
       /*orderDetail&&!orderStatus&&(orderDetail.state = "sell_succeed");*/
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
            //这里就需要去开启定时器并设置时间
            this.setPayTime(orderDetail);
            return;
        }

    }
    setPayTime(orderDetail){

        var expirationDate = orderDetail.expireTime.replace(/-/g,"/");

        var serverTime = orderDetail.serverTime.replace(/-/g,"/");

        var dateTimess = new Date(expirationDate).getUnixTimeStamp() - new Date(serverTime).getUnixTimeStamp();
        //支付时间过期。 重新查询订单详情接口
       // console.log("dateTimess",dateTimess);return;
        if (dateTimess <= 0) {
            this.setState({
                "returntime": 0,
            });
        }else{
            this.getTimeOut(orderDetail);
        }
    }
    getTimeOut(orderDetail){
        var expirationDate = new Date(orderDetail.expireTime.replace(/-/g,"/"));
        var serverTime = new Date(orderDetail.serverTime.replace(/-/g,"/"));
        var dateTimess = expirationDate.getUnixTimeStamp() - serverTime.getUnixTimeStamp();
        //支付时间过期。 重新查询订单详情接口
        if (dateTimess <= 0){
            this.setState({
                "returntime":0
            });
            /*setTimeout(function(){
                window.location.reload();
            },30000)*/
            //这里就去重新执行type
            /* 这里去查询此时订单的状态
         */
            this.props.dispatch({
                type:'orderDetail/fetch',
                payload:{
                    orderNo:this.state.orderNo,
                    userToken: this.state.userToken
                }
            })
            return;
        }
        this.setState({
            "returntime":dateTimess
        })
        //console.log("1111111111111");
        //轮训计算
        this.caculateTime();
    }
    caculateTime(){
        let _this =  this;
      //  console.log("returntime",_this.state.returntime);
        this.lock_interval&&clearInterval(this.lock_interval);
        this.lock_interval = setInterval(function(){
            if (!_this._reactInternalInstance){
                clearInterval(_this.lock_interval);
                /*_this.props.dispatch({
                    type:'orderDetail/fetch',
                    payload:{
                        orderNo:_this.state.orderNo,
                        userToken: _this.state.userToken
                    }
                });*/
                return;
            }
            if (_this.state.returntime <= 1){

                clearInterval(_this.lock_interval);
                /*_this.props.dispatch({
                    type:'orderDetail/fetch',
                    payload:{
                        orderNo:_this.state.orderNo,
                        userToken: _this.state.userToken
                    }
                });*/

                return;
            }
            //console.log("getUnixTimeStamp",_this.state.returntime);
            var ac = _this.state.returntime;
            ac--;
            _this.setState({returntime:ac});
        },1000)
    }
    //格式化时间
    convertNum(v){
        return v < 10 ? "0" + v : v;
    }

    //renderTime
    renderTime(){
        var n = this.state.returntime;
        var m = parseInt(n / 60);
        var s = n % 60;
        return (this.convertNum(m)) + "分" + (this.convertNum(s)) + "秒";
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
       // console.log("time", orderDetail);
        if(orderDetail.state === "book_succeed"){
            let time = this.state.returntime;

            return  time&&<div>请在<span>{this.renderTime()}</span>内完成支付，逾期将自动取消订单哦~</div>||"超出支付期限，请重新购买!";
        }
        if(orderDetail.state === "sell_failed"){
            return <div>请耐心等待，票款将在<span>7个工作日</span>内返回您的帐上</div>;
        }
        return con.content;
    }
    render(){
        let { orderDetail } =  this.props.orderDetail;
        if(!orderDetail){
            return <div className={Styles["ticketOrderDetail-Main"]}>
                <Header
                    mode="common"
                    leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i>}
                    leftClick={()=>{Router.push(`/orderList`)}}
                >
                    <div style={{"textAlign":'center','color':'#fff'}}>订单详情</div>
                </Header>
            </div>
        }
        //console.log("top", orderDetail);
        let top =  baseUtil.orderDetailStatus(orderDetail.state);
        //console.log("top", top);
        return <div className={Styles["ticketOrderDetail-Main"]}>
            <Header
                mode="common"
                leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i>}
                leftClick={()=>{Router.push(`/orderList`)}}
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
                        {top.refundMoney&&<div className={Styles["refundBtn"]} onClick={this.refundMoney.bind(this)}>申请退票</div>||''}
                    </div>
                </Scroll>
            </div>
            {
                top.doubleBtn&&<div className={Styles["footer-fixed-paying"]}>
                    <div>
                        <div onClick={this.obsolete.bind(this)}>作废订单</div>
                        <div onClick={this.payload.bind(this)}>继续支付</div>
                    </div>
                </div>||""
            }
            {
                top.singleBtn&&<div className={Styles["footer-fixed-rebuy"]} onClick={()=>{Router.push("/")}}>
                    重新购买
                </div>||''
            }
        </div>
    }
    //申请退票
    refundMoney(){
        this.props.dispatch({
            type:'orderDetail/refundTicket',
            payload:{
                orderNo:this.state.orderNo,
                userToken: this.state.userToken,
                refundQuantity:"",
                refundReason:""
            }
        })
    }

    //作废订单
    obsolete(){
        prompt('', <div>你确定要作废订单么</div>, [
            { text: '确定', onPress: () => {this.props.dispatch({
                    type:'orderDetail/obsoleteOrder',
                    payload:{
                        orderNo:this.state.orderNo,
                        userToken: this.state.userToken
                    }
                })}, style:'' },
            { text: '再想哈多', onPress: () => console.log('ok') },
        ])
    }

    //这里去执行获取支付页面的操作
    payload(){
        let {from} =  Router.location.query, {orderDetail} =  this.props.orderDetail,_this =  this;
       // console.log("orderDetail",orderDetail);
        //return;

        Request(`/config/payhref?_p_from=${baseUtil.get("cdqcp_channel") || from||""}&type=${baseUtil.getSession("channelTokenName")||""}`,{
            method: "get",
        }).then(function(result){
          //console.log("result", result);
            if (result.payHref){
                var from = result["channelCode"]||baseUtil.get("cdqcp_channel");
                var obj={
                    businessNo:orderDetail.orderNo,//订单号
                    userToken:_this.state.userToken,//用户标识
                    from:baseUtil.get("cdqcp_channel"),
                    opid:baseUtil.get("cdqcp_opid"),
                    wxcode: baseUtil.get("cdqcp_wxopenId"),
                    channelName: from,
                    wxOpenId:baseUtil.get("cdqcp_wxopenId"),
                    manualBackUrl:window.location.origin+"/mtTicket/#/orderList/[from,wxcode,opid]",
                    backUrl:encodeURIComponent(window.location.origin+`/mtTicket/#/ticketOrderDetail?orderNum=${orderDetail.orderNo}&opid=${baseUtil.get("cdqcp_opid")}`)
                };
                var href = result["payHref"] + '/index.html?';
                href=href+Object.keys(obj).map(function (key) {
                    return key+"="+obj[key]
                }).join("&");
                console.log("payHref", href);
                window.location.href =  href;
            }
        })
    }

    //页面销毁前
    componentWillUnmount(){
        this.state.timeIntervar&&clearInterval(this.state.timeIntervar);
    }
}
