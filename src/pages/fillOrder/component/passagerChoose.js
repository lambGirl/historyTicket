import React from 'react'
import ClassNames from 'classnames'
import Styles from '../index.less'
export default  class PassagerChoose extends React.Component{
    formatIdCard(cardNo){
        if(!cardNo){
            return "";
        }
        return cardNo.substr(0,6)+"******"+cardNo.substr(-2);
    }
    checkCertificate(nowIdCard){
        var finallyCertificate = {},allowIdCardType = "01";
        nowIdCard.forEach(function (itemNow, index) {
            if (allowIdCardType.indexOf(itemNow.cardType) != -1 && itemNow.cardNo) {
                finallyCertificate = itemNow;
            }
        });
        return finallyCertificate;
    }

    render(){
        let {passengers} =  this.props;
        return   <div className={ClassNames(Styles['passageList'], Styles["mgBottom20"])}>
            <div className={Styles["centerLine"]}></div>
            {
                passengers.length&&passengers.map((item, index)=>{
                    let number = this.checkCertificate(item.riderCards);
                    return <div className={Styles['passageList-single']} key={"passageList"+ index}>
                        <div>
                            <div className={Styles['passage-name']}>{item.userName}</div>
                            <div className={Styles['passage-detail']}>
                                <span>身份证: {this.formatIdCard(number["cardNo"])}</span>
                                <span>电话: {item.phone}</span>
                            </div>
                        </div>
                        <div onClick={()=>{this.props.delPerson(item,index)}}>
                            <i className={Styles['reduce-passage-Icon']}></i>
                        </div>
                    </div>
                })
            }
        </div>
    }
}
