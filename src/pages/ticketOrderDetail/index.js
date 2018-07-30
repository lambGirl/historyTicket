import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import Scroll from '../../components/scroll'
import Router from 'umi/router'
import CardBox from  '../../components/cardBox'

export default class TicketOrderDetail extends React.Component{
    renderBaseInfo(){
        return <div className={Styles['ticketOrderDetail-cardContent']}>
            <p>
                <span className={Styles["name"]}>商品名称</span>
                <span>安仁古镇门票</span>
            </p>
            <p>
                <span className={Styles["name"]}>商品名称</span>
                <span>安仁古镇门票</span>
            </p>
        </div>
    }
    render(){
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
                                [Styles['mangLine']]:true,
                                [Styles['singleLine']]:false,
                            })}>
                                <div>
                                    <i className={ClassNames(Styles['orderStatus'],{
                                        [Styles["paying"]]:true,
                                        [Styles["useing"]]:false,
                                        [Styles["used"]]:false,
                                        [Styles["retired"]]:false
                                    })}></i>
                                    <span>待支付</span>
                                </div>
                                <div>
                                    <span>¥32</span>
                                    <i className={Styles['orderStatus-warning']}></i>
                                </div>
                            </div>
                            <div className={Styles['orderDetail-status-detail']}>请在<span>17分30秒</span>内完成支付，逾期将自动取消订单哦~</div>
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
                                cardTitleIcon={true}
                                cardTitle="出游人信息"
                                content={this.renderBaseInfo()}
                            />
                        </div>
                        <div className={Styles['mgtop20']}>
                            <CardBox
                                cardTitleIcon={true}
                                cardTitle="订单信息"
                                content={this.renderBaseInfo()}
                                disabled={true}
                            />
                        </div>
                        <div className={Styles['mgtop20']}>
                            <CardBox
                                cardTitleIcon={true}
                                cardTitle="订单信息"
                                content={this.renderBaseInfo()}
                            />
                        </div>
                        <div className={Styles['mgtop20']}>
                            <CardBox
                                cardTitleIcon={true}
                                cardTitle="订单信息"
                                content={this.renderBaseInfo()}
                            />
                        </div>
                    </div>
                </Scroll>
            </div>
            <div className={Styles["footer-fixed-paying"]}>
                <div>
                    <div>作废订单</div>
                    <div>继续支付</div>
                </div>
            </div>
        </div>
    }
}
