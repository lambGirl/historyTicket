import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import Scroll from '../../components/scroll'
import LineBox from '../../components/lineBox'
import PayFooter from '../../components/payfooter'
import Router from 'umi/router'

export default class FillOrder extends  React.Component{

    chooseInsurance(){
        Router.push("/insuranceList")
    }
    onPayClicked(){
        Router.push("/ticketOrderDetail")
    }

    render(){
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
                            <div className={Styles['fillOrderTitle']}>
                                <div className={ClassNames(Styles['color_333'],Styles['@font32'],
                                    {
                                        [Styles['mg_bottom19']]: true
                                    })}>三和老爷车博物馆门票成人票</div>
                                <div className={Styles['remarks']}>*凭身份证直接入园</div>
                            </div>
                            <div className={Styles['fillOrderDate']}>
                                <div className={ClassNames(Styles['fontIconStyle'])}>
                                    <span className={Styles['fontIcon']}></span>
                                    使用日期
                                </div>
                                <div className={Styles['chooseDateList']}>
                                    <div className={ClassNames(Styles['common'],{
                                        [Styles["default"]]:true,
                                        [Styles["active"]]: false,
                                        [Styles["disable"]]: false
                                    })}>
                                        <div>今天07-18 </div>
                                        <div>不可订</div>
                                    </div>
                                    <div className={ClassNames(Styles['common'],{
                                        [Styles["default"]]:false,
                                        [Styles["active"]]: false,
                                        [Styles["disable"]]: true
                                    })}>
                                        <div>明天07-19 </div>
                                        <div>¥55</div>
                                    </div>
                                    <div className={ClassNames(Styles['common'],{
                                        [Styles["default"]]:false,
                                        [Styles["active"]]: true,
                                        [Styles["disable"]]: false
                                    })}>
                                        <div>07-20周五</div>
                                        <div>¥55</div>
                                    </div>
                                    <div className={ClassNames(Styles['moreDate'])}>
                                        <div>更多日期</div>
                                        <div>
                                            <i className="fa fa-angle-right fa-lg" style={{"color":"#3E3E3E"}}></i>
                                        </div>
                                    </div>
                                </div>
                                <div className={Styles['moreDate-remark']}>
                                    <p className={ClassNames(Styles['font24'], Styles['color_3e'],Styles['mgBottom12'])}>购买后立即使用，7月19日当日使用有效</p>
                                    <p className={Styles['remarks']}>*此产品可在2017年7月19日 16:00前退款</p>
                                </div>
                            </div>
                            <div className={Styles["centerLine"]}></div>
                            <div className={Styles['buyNum']}>
                                <div className={ClassNames(Styles['fontIconStyle'])}>
                                    <span className={Styles['fontIcon']}></span>
                                    购买数量
                                </div>
                                <div>
                                    <div className={ClassNames(Styles['common'], Styles['reduce'],Styles['mgright20'])}>-</div>
                                    <div className={ClassNames(Styles['numberShow'],Styles['mgright20'])}>0</div>
                                    <div className={ClassNames(Styles['common'], Styles['add'])}>+</div>
                                </div>
                            </div>
                        </div>
                        <LineBox
                            leftContent={<div className={ClassNames(Styles['color_333'],Styles['font28'],Styles['addPassager'])}>添加游客<span>需<i>1位</i>实际出行的游客信息</span></div>}
                            rightContent={<div className={Styles['addPassageBtn']}>选择游客</div>}
                        >
                        </LineBox>
                        <div className={ClassNames(Styles['passageList'], Styles["mgBottom20"])}>
                            <div className={Styles["centerLine"]}></div>
                            <div className={Styles['passageList-single']}>
                                <div>
                                    <div className={Styles['passage-name']}>王小米</div>
                                    <div className={Styles['passage-detail']}>
                                        <span>身份证: 500231******12</span>
                                        <span>电话: 18008100961</span>
                                    </div>
                                </div>
                                <div>
                                    <i className={Styles['reduce-passage-Icon']}></i>
                                </div>
                            </div>
                            <div className={Styles['passageList-single']}>
                                <div>
                                    <div className={Styles['passage-name']}>王小米</div>
                                    <div className={Styles['passage-detail']}>
                                        <span>身份证: 500231******12</span>
                                        <span>电话: 18008100961</span>
                                    </div>
                                </div>
                                <div>
                                    <i className={Styles['reduce-passage-Icon']}></i>
                                </div>
                            </div>
                            <div className={Styles['passageList-single']}>
                                <div>
                                    <div className={Styles['passage-name']}>王小米</div>
                                    <div className={Styles['passage-detail']}>
                                        <span>身份证: 500231******12</span>
                                        <span>电话: 18008100961</span>
                                    </div>
                                </div>
                                <div>
                                    <i className={Styles['reduce-passage-Icon']}></i>
                                </div>
                            </div>
                            <div className={Styles['passageList-single']}>
                                <div>
                                    <div className={Styles['passage-name']}>王小米</div>
                                    <div className={Styles['passage-detail']}>
                                        <span>身份证: 500231******12</span>
                                        <span>电话: 18008100961</span>
                                    </div>
                                </div>
                                <div>
                                    <i className={Styles['reduce-passage-Icon']}></i>
                                </div>
                            </div>
                        </div>
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
