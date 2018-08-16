import React from 'react'
import classnames from 'classnames'
import styles from './index.less'
import {baseUtil} from "../../utils/util";

export default class AttractTionSingle extends React.Component{

    render (){

        let {clickItem, item} =  this.props;
        //console.log("item",item);
        return <div className={styles['ticketsList']} onClick={()=>{this.props.clickItem(item)}}>
            <img src={item.showImage}/>
            <div>
                <p>{baseUtil.formatNameStr(18, item.name)}</p>
                <div>
                    <div className={styles["remarks"]}>{item.address}{item.distance&&`,距我${item.distance}km`}</div>
                    {item.startPrice&&<div>
                        <span className={classnames(styles["font20"], styles["color_F60"])}>¥</span>
                        <span className={classnames(styles["font40"], styles["color_F60"])}>{item.startPrice}</span>
                        <span className={classnames(styles["font20"], styles["color_fff"])}>起</span>
                    </div>}
                </div>
            </div>
        </div>
    }
}
