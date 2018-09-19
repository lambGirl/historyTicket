import React from 'react'
import classnames from 'classnames'
import styles from './index.less'
import {baseUtil} from "../../utils/util";
import Tz from '../../assets/img/defaultIndex.png'

export default class AttractTionSingle extends React.Component{
    constructor(props) {
        super(props)
        this.state = { loadedItems: "" }
    }
    onLoadImg(url){
        this.setState(({ loadedItems }) => {
            return { loadedItems: baseUtil.replaceImgUrl(url) }
        })
    }

    render (){
        const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
        let {clickItem, item} =  this.props;
        //console.log("item",item);
        return <div className={styles['ticketsList']} onClick={()=>{this.props.clickItem(item)}}>
            <div >
              {/* <img src={item.showImage}/>*/}
                <img src={this.state.loadedItems||Tz} onLoad={this.onLoadImg.bind(this, item.showImage)}/>
            </div>
            <div>
                <div style={{"WebkitBoxOrient":"vertical","boxOrient":'vertical',"MozBoxOrient":"vertical","msboxOrient":'vertical'}}>
                    {item.name}
                </div>
                <div>
                    <div className={styles["remarks"]} style={{"WebkitBoxOrient":"vertical","boxOrient":'vertical',"MozBoxOrient":"vertical","msboxOrient":'vertical'}}>{item.cityName}{item.distance&&`, 距我${item.distance}km`}</div>
                    {item.startPrice&&<div>
                        <span className={classnames(styles["font20"], styles["color_F60"])}>¥</span>
                        <span className={classnames(styles["font40"], styles["color_F60"])}>{baseUtil.numFixed1(item.startPrice)}</span>
                        <span className={classnames(styles["font20"], styles["color_94"])}>起</span>
                    </div>}
                </div>
            </div>
        </div>
    }
}
