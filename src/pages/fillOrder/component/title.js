import React from 'react'
import ClassNames from 'classnames'
import Styles from '../index.less'
import {baseUtil} from "../../../utils/util";

export default  class Title extends React.Component{
    constructor(props){
        super(props);
    }
    entryParkMethod(){
        let {detail} =  this.props,
            {productUseRule} =  detail,
            voucherLoaders = productUseRule.voucherLoaders&&productUseRule.voucherLoaders.split(",")||'',
        method = productUseRule.voucherLoaders.indexOf("6") !== -1&&"6"||productUseRule.voucherLoaders.indexOf("4") !== -1&&"4"||voucherLoaders.length&&voucherLoaders[0]||"",
            content = baseUtil.entryParkMethods(voucherLoaders[0])
        //console.log("detail",detail);
        return content&&`*凭借通过${content}换取纸质票入园`
    }
    render(){
        let {detail} =  this.props,
            {productUseRule} =  detail;
        if(!detail){
            return null;
        }
       // console.log("detail",detail);
        return <div className={Styles['fillOrderTitle']}>
            <div className={ClassNames(Styles['color_333'],Styles['@font32'],
                {
                    [Styles['mg_bottom19']]: true
                })}>{detail.productName.length === 18&&detail.productName||baseUtil.formatNameStr(18,detail.productName)}</div>
           <div className={Styles['remarks']}>{productUseRule.needTicket === "0" &&"无需换票直接入园"||this.entryParkMethod()}</div>
        </div>
    }
}
