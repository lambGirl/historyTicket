import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
export default class LineBox extends React.Component{

    render(){
        let {leftIcon, leftContent, rightContent, rightIcon ,clickType,clickTap} =  this.props;

        return <div className={Styles['line-box']} onClick={clickType=="1"&& (()=>{clickTap()})||(()=>{return false})}>
            <div>
                {leftIcon&&<span className={Styles['line-leftBox-icon']}></span>}
                {leftContent}
                {/*<span className={ClassNames(Styles['font28'],Styles['color_3e'])}>安全须知</span>*/}
            </div>
            <div onClick={clickType=="2"&& ((e)=>{clickTap()})||(()=>{return false})}>
               {/* <span className={ClassNames(Styles['color_94'],Styles['font28'])}>了解详情</span>*/}
                {rightContent}
                {rightIcon&&<i className="fa fa-angle-right fa-lg" style={{"color":"#cacaca"}}></i>}
            </div>
        </div>
    }
}
