import React from 'react'
import DateContainer from '../../components/date/date'
import Header from '../../components/header'
import Router from 'umi/router'
import { baseUtil, Date } from "../../utils/util"
import { connect } from "dva"
import global from "../../models/global";
import Request from "../../utils/request"
import Styles  from '../../assets/css/var.less'
@connect(({fillOrder,loading})=>({
    fillOrder,
    loading
}))

export default class DateIndex extends React.Component{
    constructor(props){
        super(props);
        let defaultDate =  Router.location.query.defaultDate||new Date().format("yyyy-MM-dd"),
            {fillOrderDetail} =  props.fillOrder,
            globalConfig =  baseUtil.getSession("globalConfig");
        this.state =  {
            preSellDays: baseUtil.ConfigFind("max_presell_days"),
            defaultDate: [defaultDate],
            holidays:[],
            sellDetail:fillOrderDetail["productDatePrices"]
        }
    }
    componentDidMount(){
        let {from} =  Router.location.query,_this =  this;
        Request("/api?server=tz_getHoliday",{
            method: "post",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                preSellDays:this.state.preSellDays,
                _p_from:from||baseUtil.get("appFrom")||baseUtil.get("cdqcp_channel")
            })
        }).then((result)=>{
            if(result.data.pubResponse.code === "0000"){
                _this.setState({
                    holidays: result.data.body.data
                })
            }
        })
    }
    getChangeDate = (date,tag)=>{
        /**
         *  1. 这里首先要验证选中的当前日期是不是里面的今天和明天，如果是，就选中今天和明天中的一个，
         *  2. 如果不是今天明天，则去修改最后一个数据为选中的当前日期,作为最好一个日期
         */
        if(tag === "init"){
            return;
        }

      //  console.log("date",date, tag);
        let {actionDate} =  this.props.fillOrder,{content} = tag;
        if(date[0] === actionDate["date"][0].date){
            actionDate.index =  0;
            actionDate["date"][0].price =  content;
            actionDate["date"][0].use =  true;
        }
        else if(date[0] === actionDate["date"][1].date){
            actionDate.index =  1;
            actionDate["date"][1].price =  content;
            actionDate["date"][1].use =  true;
        }else{
            actionDate.index =  2;
            actionDate["date"][2].price =  content;
            actionDate["date"][2].date =  date[0] ;
            actionDate["date"][2].use =  true;
        }
        this.props.dispatch({
            type:'fillOrder/setactionDate',
            payload:actionDate
        })

        window.history.go(-1);
    }
    rightClick = ()=>{
        console.log("rightClick 被点击")
    }

    render(){
        return <div style={{height:"100%"}}>
            {/*<Header   />*/}
            <Header      mode="light"
                         leftContent={<i className={Styles["headerleftIconBlack"]}></i>}
                         leftClick={() => window.history.go(-1)}
            >
                <div style={{"textAlign":"center"}}>日期</div>
            </Header>
            <div style={{"position":"relative",height:"100%"}}>
                <DateContainer
                    refs="getDate"
                    defaultDate={this.state.defaultDate || []}
                    holidays={this.state.holidays}
                    limitDate={this.state.preSellDays}
                    chooseNumber="1"
                    type="single"   //选择单个
                    tips={null}
                    model='jqmp' // 景区门票显示规则
                    DateChange={this.getChangeDate.bind(this)}
                    defineClass='defineDateClass'
                    sellDetail={this.state.sellDetail}
                />
            </div>
        </div>
    }
};



