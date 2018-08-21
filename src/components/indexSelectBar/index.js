import React from 'react'
import classnames from 'classnames'
import styles from './index.less'
import {baseUtil} from "../../utils/util";

export  default  class IndexSelectBar extends  React.Component{

    render(){
        let { selectBarModelFixed, SelectBarData ,IndexModelSelectBarStatus,allBarColor,
            zlpxColor,
            selectBar} =  this.props;
        return <div className={classnames(styles["selectBarModel"],{
            [styles["selectBarModelFixed"]]:selectBarModelFixed
        })}>
            <div className={styles['selectBar']}>
                <div onClick={(e)=>{selectBar('all',e)}}>
                    <span>{ baseUtil.formatNameStr(8,SelectBarData["all"].data[SelectBarData["all"].activeIndex].cityName)}</span>
                    <i className={classnames("fa fa-caret-down fa-lg", {
                        "fa-caret-up": SelectBarData["all"].parentIndex&&IndexModelSelectBarStatus[0]
                    })}
                       style={{
                           "color":`${allBarColor}`
                       }}
                    ></i>
                </div>
                <div onClick={(e)=>{selectBar('zlpx',e)}}>
                    <span>{ baseUtil.formatNameStr(8,SelectBarData["zlpx"].data[SelectBarData["zlpx"].activeIndex].cityName)}</span>
                    <i className={classnames("fa fa-caret-down fa-lg", {
                        "fa-caret-up": SelectBarData["zlpx"].parentIndex&&IndexModelSelectBarStatus[1]
                    })}
                       style={{"color":`${zlpxColor}`}}></i>
                </div>
            </div>
        </div>
    }
}
