import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
export default  class PayFooter extends  React.Component{
    constructor(){
        super();
        this.state={
            isShow:false,
        }
    }
    firstChange(){


    }
    componentDidMount(){
        this.firstChange();
    }
    renderDetail() {

        var h = document.body.clientHeight + 'px', modal = {
            // top: '-' + h,
            height: h,
        }
        modal.display = this.state.isShow ? "block" : "none";
        modal.opacity = this.state.isShow ? "0.7" : "0";
        var bottom =  this.state.isShow?"3.348rem":'-400px';

        this.firstChange();
        return <div>

            { this.state.isShow&&<div style={{height:modal.height,display:modal.display,opacity:modal.opacity}} className={ClassNames(Styles["notmove"], Styles["train-pay-modal"])}></div>}
            {this.state.isShow&&<div style={{bottom:bottom}}  className={Styles["train-paydetail-modal"]}>
                <ul >
                    {
                        this.props.priceDetails&&this.props.priceDetails.map(function (item,index) {
                            if(item.modelStyle == "coupon"){
                                return <li key={item.label} className={ClassNames(Styles["item-content "],Styles['item-content'],Styles['coupon-pay-footer'])}>
                                    <div className={Styles["ticket-detail-footer"]}>{item.label}</div>
                                    <div>
                                        <span className={Styles["redfs"]}><i>-</i>{item.value}</span>
                                        <span>{item.desc}</span>
                                    </div>
                                </li>
                            }
                            return <li key={item.label} className={Styles["item-content"]}>
                                <div className={ClassNames(Styles["item-title"], Styles["ticket-detail-footer"])} >{item.label}</div>
                                <div className={Styles["item-title"]}><span
                                    className={Styles["redfs"]}>{item.value}</span><span>{item.desc}</span></div>
                            </li>

                        })
                    }
                </ul>
            </div>}
        </div>
    }
    render(){
        return <div className={Styles["train-pay"]}>
            <div className={Styles["train-pay-content"]}>
                <div className={ClassNames(Styles["col-60"],Styles["train-pay-left"])} >
                    <div>
                        <div>
                            合计: <i>￥</i><i className={Styles["foot-price-new"]}>{(this.props.total==0?"0":this.props.total)}</i>
                        </div>
                        {this.props.showCoupon&&<div>(已优惠￥{this.props.showCoupon})</div>||null}
                    </div>
                    <div onClick={this.showClick.bind(this)} className={Styles["train-pay-detail"]}>
                        <span>明细</span>
                        <span className={ClassNames(Styles["ui-icon"],{
                            [Styles["ui-icon-pay-down1"]]:this.state.isShow,
                            [Styles["ui-icon-pay-up1"]]:!this.state.isShow,
                        })}></span>
                    </div>
                </div>
                <div onClick={this.surePay.bind(this)} className={ClassNames(Styles["col-40"], Styles["train-footer-pay"])}>
                    提交订单
                </div>
            </div>
            {this.renderDetail()}
        </div>
    }
    showClick(){
        let {priceDetails} = this.props;
        if(priceDetails&&priceDetails.length>0){
            this.setState({isShow:!this.state.isShow});
        }
    }
    surePay(){
        let {onPayClicked} =  this.props;
        // if(this.props.total>0){
        onPayClicked&&onPayClicked();
        // }
        // else{
        //     //alert('请添加乘车人信息');
        //     $.toast('请添加至少一个乘客信息');
        // }
    }
}
