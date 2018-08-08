import React from 'react'
import ClassNames from 'classnames'
import Styles from '../index.less'
export default  class Title extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        let {detail} =  this.props;
        console.log("detail",detail);
        return <div className={Styles['fillOrderTitle']}>
            <div className={ClassNames(Styles['color_333'],Styles['@font32'],
                {
                    [Styles['mg_bottom19']]: true
                })}>{detail.productName}</div>
            <div className={Styles['remarks']}>*凭身份证直接入园</div>
        </div>
    }
}
