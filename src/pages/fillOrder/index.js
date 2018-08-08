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

@connect(({fillOrder,loading})=>({
    fillOrder,
    loading
}))
export default class FillOrder extends  React.Component{

    chooseInsurance(){
        Router.push("/insuranceList")
    }
    onPayClicked(){
        Router.push("/ticketOrderDetail")
    }
    componentDidMount(){
        let {pointNo,productNo} =  Router.location.query;
        this.props.dispatch({
            type:'fillOrder/fetch',
            payload:{
                pointNo:pointNo,
                productNo: productNo
            }
        })
    }

    render(){
        let {fillOrderDetail} =  this.props.fillOrder;
        if(!fillOrderDetail){return null}

        return <div className={Styles['fillOrder-main']}>
            <Header
                mode="light"
                leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#3E3E3E"}}></i>}
            >
                <div style={{"textAlign":'center','color':'#3E3E3E'}} >订单填写</div>
            </Header>
            <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
                <Scroll class={Styles['wrapper']}>
                    <div className={Styles['scroll-cotent-bottom']}>
                        <div className={Styles['fillOrder-content-top']}>
                            <Title detail={fillOrderDetail["productDetail"]}/>
                            <DateChoose />
                            <div className={Styles["centerLine"]}></div>
                            <CanBuyNum />
                        </div>
                        <LineBox
                            leftContent={<div className={ClassNames(Styles['color_333'],Styles['font28'],Styles['addPassager'])}>添加游客<span>需<i>1位</i>实际出行的游客信息</span></div>}
                            rightContent={<div className={Styles['addPassageBtn']}>选择游客</div>}
                        >
                        </LineBox>
                        <PassagerChoose />
                        <LineBox
                            rightIcon={true}
                            leftContent={<span className={ClassNames(Styles['color_333'],Styles['font28'])}>游园保障</span>}
                            rightContent={<span className={ClassNames(Styles["color_313131"],Styles["font28"])}>游园保障</span>}
                            clickType="1"
                            clickTap = {this.chooseInsurance.bind(this)}
                        >
                        </LineBox>
                    </div>
                </Scroll>
            </div>
            <PayFooter onPayClicked={this.onPayClicked.bind(this)}></PayFooter>
        </div>
    }
}
