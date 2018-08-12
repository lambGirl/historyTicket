import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import Scroll from '../../components/scroll'
import LineBox from '../../components/lineBox'
import PayFooter from '../../components/payfooter'
import Router from 'umi/router'
import { connect } from 'dva'
import {Date,baseUtil} from '../../utils/util'
import Title from './component/title'
import DateChoose from './component/dateChoose'
import CanBuyNum from './component/canBuyNum'
import PassagerChoose from './component/passagerChoose'
import Request from "../../utils/request"
import { Toast } from 'antd-mobile';
@connect(({fillOrder,loading})=>({
    fillOrder,
    loading
}))

export default class FillOrder extends  React.Component{
    constructor(props){
        super(props);
        this.state = {
            reduceAddBtn: [ true, true ],
            passengers:[],
            total:0, //总票价
            priceDetails:[]
        }
    }
    chooseInsurance(){
        Router.push("/insuranceList")
    }
    onPayClicked(){
        /**
         * 这里就需要去提交订单了
         */
        let {pointNo,productNo} =  baseUtil.getSession("jqmp_ticketDetail");
        let {fillOrderDetail, canBuy,chooseInsurance,actionDate} = this.props.fillOrder,
            {productDetail} = fillOrderDetail,priceDetails=[],total = 0,traveller=baseUtil.get("cdqcp_passengers")||[];
        //组装数据
        let  payload = {
            pointNo:pointNo,
            productNo:productNo,
            sellQuantity:canBuy,
            travelDate:actionDate["date"][actionDate.index].date,
            travellers:[],  //游玩人列表
            contactPhone:traveller&&traveller[0].phone,
            contactPhone:traveller&&traveller[0].phone,
            userToken:baseUtil.get("cdqcp_opid")
        }
        //组装统计游客信息
        traveller.map((item)=>{
           // console.log("item", item);
            payload.travellers.push({
                travellerType:item.riderType,
                travellerName:item.userName,
                cardType:item.cardType,
                cardNo:item.cardNo,
                phone:item.phone,
                gender:item.gender
            })
        })

        //Toast.info("sdfsdfsdf", 3);
        //return;
        //这里需要提交订单了
        Request('/api?server=trip_bookOrder',{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(payload)
        }).then((result)=>{
            //console.log("data------------", result);
            if(result.data.pubResponse.code !== "0000"){
                Toast.info(result.data.pubResponse.msg, 3);
                return;
            }
            /**
             * 这里就要判断是下单成功是已经成功了 还是处于booking，状态，如果是booking状态就跳转到详情,否则就去同意支付页
             */
            if(result.data.body.state === "booking"){
                Router.push(`/ticketOrderDetail?orderNum=${result.data.body.orderNo}`)
                return;
            }
            //这里就去请求统一支付页面result.data.body.orderNo
        })
    }

    componentDidMount(){
        let {pointNo,productNo} =  baseUtil.getSession("jqmp_ticketDetail");
        if(!baseUtil.getSession("jcpm_fillOrder")){
            this.props.dispatch({
                type:'fillOrder/fetch',
                payload:{
                    pointNo:pointNo,
                    productNo: productNo
                },
            })
        }
        //这里需要设置对应的乘客
        let cdqcp_passengers =  baseUtil.get("cdqcp_passengers");
        if(cdqcp_passengers){
            this.setState({
                "passengers": cdqcp_passengers
            }, ()=>{
                //这里就去算价格
                this.payPrice(cdqcp_passengers);
            });
        }


    }
    //切换时间选择并计价
    switchTime(index, price){
        //需要去设置时间的选择
        let jpmp_dates =  baseUtil.getSession("jpmp_dates");
        jpmp_dates.index =  index;
        this.props.dispatch({
            type:'fillOrder/setactionDate',
            payload:jpmp_dates
        });
        //对应的乘客存在 就要存在计价
        let cdqcp_passengers =  baseUtil.get("cdqcp_passengers");
        if(cdqcp_passengers){
            this.payPrice(cdqcp_passengers, price)
        }
    }
    //计价规则
    payPrice(cdqcp_passengers,newPrice,num){
        let {fillOrderDetail, canBuy,chooseInsurance, actionDate} = this.props.fillOrder,
            {productDetail} = fillOrderDetail,priceDetails=[],total = 0,
            price = newPrice||actionDate["date"].length&&parseFloat(actionDate["date"][actionDate.index].price)||"",
            totalPerson = num||canBuy;
        //单张票的价格
        priceDetails.push({
            label:"单价",
            num:"" ,
            desc:'',
            value:`¥${price}`
        });
        priceDetails.push({
            label:"总人数",
            num:"" ,
            desc:'人',
            value:totalPerson
        });
        //
        chooseInsurance.flag&&priceDetails.push({
            label:"保险",
            num:"1" ,
            desc:'人',
            value:"12"
        })

        //这里还需要加上保险的价格
        //console.log(fillOrderDetail)
        total += Number(price)*totalPerson;

        this.setState({
            total: total,
            priceDetails: priceDetails
        })
    }

    controlBtn(num){
        /**
         * 首要要控制最少多少人，最多多少人
         */
        let {fillOrderDetail, canBuy} = this.props.fillOrder,
            {productBookRule} = fillOrderDetail.productDetail;
      // console.log("canBuy", (typeof canBuy));
      // return;
        /**
         * 先处理减的情况
         *  1. 如果为-1,此时canBuy为0，就return 并且讲左边的按钮变成灰色不能点击
         *  2.如果限制有数数字。 则等于这个数字不能点击
         *  做加法， 如果做加法，同理
         */
        canBuy  =  parseInt(canBuy);
        if(num === -1&&(productBookRule.minBuyCount === -1 && (canBuy-1) === 0||(canBuy-1)<productBookRule.minBuyCount )){
           // console.log("1");
            this.setState({reduceAddBtn:[false, true]});
            return;
        }
        if(num === 1&&((canBuy+1)>productBookRule.maxBuyCount)){
           // console.log("2");
            this.setState({reduceAddBtn:[true, false]});
            return;
        }
        this.setState({reduceAddBtn:[true, true]});
        this.props.dispatch({
            type:'fillOrder/canBuy',
            payload:num
        });
        //这里需要设置对应的乘客
        let cdqcp_passengers =  baseUtil.get("cdqcp_passengers");
        if(cdqcp_passengers){
            //这里就去算价格
            this.payPrice(cdqcp_passengers,"", num);
        }
    }

    choosePassager(){
        /**
         * 先要验证是否登陆
         */
        var opid = baseUtil.get('cdqcp_opid');  //用户登陆的opid是否为空
        if(!opid){
            window.location.href="/user/login?tzType=new&tzBuss=jpmp_ChoosePerson";
            return;
        }
        window.location.href="/user/newpassenger?allowIdCardType=01&allowTicketType=0,1,2&tzType=new&tzBuss=jpmp_ChoosePerson"
    }

    render(){
        let {fillOrderDetail, canBuy,actionDate} =  this.props.fillOrder;
        if(!fillOrderDetail){return null}
        let {passengers,total,priceDetails} =  this.state;
        return <div className={Styles['fillOrder-main']}>
            <Header
                mode="light"
                leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#3E3E3E"}}></i>}
                leftClick={()=>{window.history.go(-1)}}
            >
                <div style={{"textAlign":'center','color':'#3E3E3E'}} >订单填写</div>
            </Header>
            <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
                <Scroll class={Styles['wrapper']}>
                    <div className={Styles['scroll-cotent-bottom']}>
                        <div className={Styles['fillOrder-content-top']}>
                            <Title detail={fillOrderDetail["productDetail"]}/>
                            <DateChoose effectiveDate={actionDate} switchTime={this.switchTime.bind(this)}/>
                            <div className={Styles["centerLine"]}></div>
                            <CanBuyNum initNum={canBuy} clickItem={this.controlBtn.bind(this)} fillOrderDetail={fillOrderDetail}/>
                        </div>
                        <LineBox
                            leftContent={<div className={ClassNames(Styles['color_333'],Styles['font28'],Styles['addPassager'])}>添加游客<span>需<i>1位</i>实际出行的游客信息</span></div>}
                            rightContent={<div className={Styles['addPassageBtn']}>选择游客</div>}
                            clickTap={this.choosePassager.bind(this)}
                            clickType="1"
                        >
                        </LineBox>
                        {passengers.length&&<PassagerChoose passengers={passengers}/>||""}
                        <div className={Styles["mgtop20"]}>
                            <LineBox
                                rightIcon={true}
                                leftContent={<span className={ClassNames(Styles['color_333'],Styles['font28'])}>游园保障</span>}
                                rightContent={<span className={ClassNames(Styles["color_313131"],Styles["font28"])}>游园保障</span>}
                                clickType="1"
                                clickTap = {this.chooseInsurance.bind(this)}
                            >
                            </LineBox>
                        </div>
                    </div>
                </Scroll>
            </div>
            <PayFooter  total={total} onPayClicked={this.onPayClicked.bind(this)} priceDetails={this.state.priceDetails}></PayFooter>
        </div>
    }
}
