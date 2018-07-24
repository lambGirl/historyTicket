import React from 'react'
import {Helmet} from "react-helmet";    //用于修改页面的title
import Header from 'tz_mobile/lib/header'
import { connect } from 'dva'
import Styles from './index.less'
import classNames from 'classnames';

@connect(({city,loading})=>({
    city,
}))


export  default  class cityChoose  extends  React.Component{

    constructor(props){
        super(props);
        this.state = {
            currentIndex: 0,     //当前的Index
            touch:{
                y1:"",
                anchorIndex:'',
                itemHeight:''
            }
        }
    }
    componentDidMount(){
        //先获取数据
        this.props.dispatch({type: 'city/fetch'})
    }

    selectItem(){

    }
    //字母touch
    onShortcutTouchStart(index,e){
        console.log("e",e.touches[0].pageY);
        this.state.touch["y1"] = e.touches[0].pageY;

        this.state.touch.anchorIndex = index;
        this.state.touch.itemHeight = this.refs.navList.getBoundingClientRect().height
        //this.refs.listview.scrollToElement(this.$refs.listGroup[index], 0)
     /*   console.log("$refs", this.refs.navList.getBoundingClientRect().height);*/
        /*this.$refs.listview.scrollToElement(this.$refs.listGroup[index], 0);
       this.scrollY = -this.listHeight[index];*/
    }

    //字母touch
    onShortcutTouchMove(){

    }

    //render的方法
    render(){
       // console.log("this.props", this.props.city)
        const { city } = this.props;
        const { singers, shortcutList } = city, _this =  this;

        return <div>
                    <Helmet>
                        <meta charSet="utf-8" />
                        <title>城市列表</title>
                    </Helmet>
                    <Header
                      mode="light"
                      leftContent={<i className="fa fa-angle-left fa-lg"></i>}
                      onLeftClick={() => window.history.go(-1)}>城市列表</Header>
                    <div className={Styles.listview} style={{"position":"relative"}}>
                        <ul>
                            {
                                singers.map(function(group,groupIndex){
                                    return(
                                        <li  className={Styles["list-group"]} key={groupIndex}>
                                            <h2 className={Styles["list-group-title"]}>{group.title}</h2>
                                            <ul>
                                                {
                                                    group.items.map(function (item,itemIndex) {
                                                        return (
                                                            <li key={itemIndex} className={Styles["list-group-item"]} onClick={_this.selectItem.bind(_this.item)}>
                                                                <img className={Styles["avatar"]} src={item.avatar}/>
                                                                <span className={Styles["name"]}>{item.name}</span>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                        </li>
                                    )})
                            }
                        </ul>
                        <div className={Styles["list-shortcut"]}>
                            <ul>
                                {
                                    shortcutList.map((item,index)=>{return(
                                        <li
                                            onTouchStart={this.onShortcutTouchStart.bind(this,index)}
                                            onTouchEnd={this.onShortcutTouchMove.bind(this, index)}
                                            ref="navList"
                                            className={classNames(Styles["item"],{[Styles['current']]:_this.state.currentIndex === index})}
                                            key = {index}
                                        >
                                            {item}
                                        </li>
                                    )})
                                }
                            </ul>
                        </div>
                    </div>
                </div>
    }
}
