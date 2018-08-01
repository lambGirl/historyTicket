import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import ScrollRefresh from '../../components/refreshScroll'
import Router from 'umi/router'
import Tab from '../../components/tab'
export default class TicketOrder extends React.Component{

    renderTab(index){
        return <ScrollRefresh>
            <div>12123123123</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>sdfserwer</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
            <div>111111111111111111111</div>
        </ScrollRefresh>
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
