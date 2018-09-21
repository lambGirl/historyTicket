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

    UNSAFE_componentWillReceiveProps(props){
       // console.log("props",props.item.showImage==this.state.loadedItems);
        // if(this.state.loadedItems){
        //     this.setState({
        //         loadedItems:''
        //     })
        // }
    }
    onLoadImg(url){
       // console.log("url", url);
        /*this.setState({
            "loadedItems": baseUtil.replaceImgUrl(url)
        },()=>{
            console.log("loadedItems", this.state.loadedItems);
        })*/
    }


    render (){
        const delay = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));
        let {clickItem, item} =  this.props;
       // console.log("item-----------",this.state.loadedItems);
        return <div className={styles['ticketsList']} onClick={()=>{this.props.clickItem(item)}}>
            <div >
              {/* <img src={this.state.loadedItems||Tz} onLoad={this.onLoadImg.bind(this, item.showImage)}/>*/}
              <img src={item.showImage&&baseUtil.replaceImgUrl(item.showImage)||Tz} />
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
