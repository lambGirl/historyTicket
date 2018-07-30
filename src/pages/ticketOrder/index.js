import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import Scroll from '../../components/scroll'
import Router from 'umi/router'

export default class TicketOrder extends React.Component{

    render(){
        return <div className={Styles["ticketOrder-Main"]}>
            <Header
                mode="common"
                leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i>}
            >
                <div style={{"textAlign":'center','color':'#3E3E3E'}}>景区门票订单</div>
            </Header>
        </div>
    }
}
