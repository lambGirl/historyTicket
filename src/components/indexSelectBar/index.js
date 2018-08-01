import React from 'react'
import classnames from 'classnames'
import styles from './index.less'

export  default  class IndexSelectBar extends  React.Component{

    render(){
        let { selectBarModelFixed, SelectBarData ,IndexModelSelectBarStatus,allBarColor,
            zlpxColor,
            selectBar} =  this.props;

        return <div className={classnames(styles["selectBarModel"],{
            [styles["selectBarModelFixed"]]:selectBarModelFixed
        })}>
            <div className={styles['selectBar']}>
                <div onClick={()=>{selectBar('all')}}>
                    <span>{ SelectBarData["all"].data[SelectBarData["all"].activeIndex].val}</span>
                    <i className={classnames("fa fa-caret-down fa-lg", {
                        "fa-caret-up": SelectBarData["all"].parentIndex&&IndexModelSelectBarStatus
                    })}
                       style={{
                           "color":`${allBarColor}`
                       }}
                    ></i>
                </div>
                <div onClick={()=>{selectBar('zlpx')}}>
                    <span>{ SelectBarData["zlpx"].data[SelectBarData["zlpx"].activeIndex].val}</span>
                    <i className={classnames("fa fa-caret-down fa-lg", {
                        "fa-caret-up": SelectBarData["zlpx"].parentIndex&&IndexModelSelectBarStatus
                    })}
                       style={{"color":`${zlpxColor}`}}></i>
                </div>
            </div>
        </div>
    }
}
