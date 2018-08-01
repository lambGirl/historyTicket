import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import Scroll from '../../components/demo/index'
import Router from 'umi/router'
import Tab from '../../components/tab'
import OrderItem from "./component/orderItem"
export default class TicketOrder extends React.Component{

    renderTab(index){
        return <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
            <Scroll>
                <div className={Styles['scroll-cotent-bottom']}>
                    <ul className={Styles["orderList"]}>
                        <OrderItem></OrderItem>
                        <OrderItem></OrderItem>
                        <OrderItem></OrderItem>
                        <OrderItem></OrderItem>
                        <OrderItem></OrderItem>
                        <OrderItem></OrderItem>
                        <OrderItem></OrderItem>
                    </ul>
                </div>
            </Scroll>
        </div>
    }

    render(){
        let activeIndex = 0;
        return <div className={Styles["ticketOrder-Main"]}>
            <Header
                mode="common"
                leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i>}
            >
                <div style={{"textAlign":'center','color':'#fff'}}>景区门票订单</div>
            </Header>
            <Tab
              activeIndex={activeIndex}
              headers={["全部","待使用","已使用"]}
              renderTab={this.renderTab.bind(this)}
            ></Tab>

        </div>
    }
}
