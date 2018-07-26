import React from 'react'
import {Helmet} from "react-helmet";    //用于修改页面的title
import Header from 'tz_mobile/lib/header'
import { connect } from 'dva'
import Styles from './index.less'
import classNames from 'classnames';
import Scroll from '../../components/scroll'
import { getData } from '../../utils/util'
const ANCHOR_HEIGHT = 18
const TITLE_HEIGHT = 30
@connect(({city,loading})=>({
    city,
}))
export  default  class cityChoose  extends  React.Component{

    constructor(props){
        super(props);
        this.state = {
            /*初始化数据*/
            probeType:3,
            listenScroll:true,
            listHeight :[],
          /*  click: true,
            pullup:true,
            beforeScroll: true,
            refreshDelay:20,*/
            touch:{
                y1:"",
                anchorIndex:'',
                itemHeight:'',
                y2:'',
            },

            scrollY: -1,
            currentIndex: 0,
            diff: -1,
            fixedHeight:0
        }
    }

    componentDidMount(){
        //先获取数据
        this.props.dispatch({type: 'city/fetch'})
        this._calculateHeight()
    }


    onShortcutTouchStart(e){
        e.stopPropagation();
        e.preventDefault();
        //所对应的元素值
        let anchorIndex = getData(e.target,'index'),
            { touch } =  this.state;

        let firstTouch = e.touches[0];      //起始点
        touch.y1 = firstTouch.pageY;        //起始点的纵坐标
        touch.anchorIndex = anchorIndex;    //锚点起点的索引值
        this.setState({
            "touch":touch
        })
        this._scrollTo(anchorIndex)
    }

    onShortcutTouchMove(e){
        e.stopPropagation();
        e.preventDefault();

        let firstTouch =  e.touches[0],
            { touch } =  this.state;
        touch.y2 =  firstTouch.pageY;
        let delta = (touch.y2 - touch.y1) / ANCHOR_HEIGHT | 0;
        let anchorIndex = parseInt(touch.anchorIndex) + delta;
        this._scrollTo(anchorIndex)

    }

    onShortTouchEnd(e){
        e.preventDefault();
        e.stopPropagation();
    }

    _scrollTo(index){
        const DomList = document.getElementsByClassName(Styles['list-group'])
        if (!index && index !== 0){
            return
        }

        if (index < 0){
            index = 0
        } else if (index > this.state.listHeight.length - 2){
            index = this.state.listHeight.length - 2
        }

        console.log("currentIndex",index);
        this.setState({
            "currentIndex":index,
        },function(){
           // console.log("this.refs",DomList[index]);
            this.refs.listview.scrollToElement(DomList[index],0)
        });
    }


    componentDidUpdate(prevProps, preState){
      //  console.log("prevProps",this.props.city.singers, prevProps.city.singers);
        if(prevProps.city.singers.length){
            this._calculateHeight()
        }
    }

    _calculateHeight(){
        this.listHeight = []
        const list = document.getElementsByClassName(Styles['list-group']);
       // console.log("------------------list---------------", list);
        let height = 0,
        { listHeight } =  this.state;
        listHeight.push(height)
        for(let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeight.push(height)
        }
       /* this.setState({
            listHeight: listHeight
        })*/
    }

    //render的方法
    render(){
        console.log("index", this.state.currentIndex);
        const { city } = this.props;



















        const { singers, shortcutList } = city, _this =  this;
        return <div style={{"height":"100%"}}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>选择城市</title>
                        </Helmet>
                        <Header  mode="light"
                                 leftContent={<i className="fa fa-angle-left fa-lg"></i>}
                                 onLeftClick={() => window.history.go(-1)}
                        >选择城市</Header>
                        <div style={{"height":"100%", "position":'relative'}}>
                             <Scroll class={Styles['listview']} ref="listview">
                                <ul>
                                    {
                                        singers.map(function(group,groupIndex){
                                            return(
                                                <li  className={Styles["list-group"]} key={groupIndex + 'listView_/*-'}   >
                                                    <h2 className={Styles["list-group-title"]}>{group.title}</h2>
                                                    <ul>
                                                        {
                                                            group.items.map(function (item,itemIndex) {
                                                                return (
                                                                    <li key={itemIndex + 'list-group-item' + groupIndex} className={Styles["list-group-item"]} >
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
                            </Scroll>
                            <div className={Styles["list-shortcut"]}
                                 onTouchStart={this.onShortcutTouchStart.bind(this)}
                                 onTouchMove={this.onShortcutTouchMove.bind(this)}
                                 onTouchEnd={this.onShortTouchEnd.bind(this)}>
                                <ul>
                                    {
                                        shortcutList.map((item,index)=>{return(
                                            <li
                                                className={classNames(Styles["item"],{[Styles['current']]:_this.state.currentIndex === index})}
                                                key={index + 'list-shortcut'}
                                                data-index={index}
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
