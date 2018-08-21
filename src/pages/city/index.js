import React from 'react'
import {Helmet} from "react-helmet";    //用于修改页面的title
import Header from '../../components/header'
import { connect } from 'dva'
import Styles from './index.less'
import classNames from 'classnames';
import Scroll from '../../components/scroll'
import { getData, baseUtil } from '../../utils/util'
import Loading from '../../components/loading'
import router from 'umi/router';
const ANCHOR_HEIGHT = 18    //索引的高度
const TITLE_HEIGHT = 4     //title的高度

@connect(({city,globalAct,loading})=>({
    globalAct,
    city,
    loading,
    fetchCityData:loading.effects['globalAct/getLocation'],
    fetchCity: loading.effects['city/fetchCity']
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

            scrollY: -1,    //设置滚动高度
            currentIndex: 0,    //当前选中的key
            diff: -1,
            fixedHeight:0,
            noLocal:'',//search搜索框的
            filterData:[],   //过滤数据
            showAz:false
        }
    }
    componentDidMount(){
        this.props.dispatch({type: 'city/fetchCity'});
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
        setTimeout(()=>{
            this.setState({
                "showAz":''
            })
        },10)
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
        let {shortcutList} =  this.props.city;
       // console.log("shortcutList",shortcutList[index]);
        this.setState({
            showAz:shortcutList[index],
            "currentIndex":index,
            "scrollY":-this.state.listHeight[index]
        },function(){
            this.refs.listview.scrollToElement(DomList[index],0)
        });
    }

    componentDidUpdate(prevProps, preState){
        if(prevProps.city.cityList.length){
            this._calculateHeight()
        }
    }

    _calculateHeight(){
       // this.listHeight = []
        this.state.listHeight = [];

        const list = document.getElementsByClassName(Styles['list-group']);
        let height = 0,
        { listHeight } =  this.state;
        listHeight.push(height)
        for(let i = 0; i < list.length; i++) {
            height += list[i].clientHeight
            listHeight.push(height)
        }
    }

    renderfixedTitle() {
        let {currentIndex, scrollY} = this.state;
        let {cityList} = this.props.city
        //  console.log(currentIndex);
        let fixedTitle = cityList[ currentIndex ] ? cityList[ currentIndex ].cityName : '';
        return (
            <div className={Styles["list-fixed"]} ref='fixed'>
                <div className={Styles["fixed-title"]}>{fixedTitle}</div>
            </div>
        )
    }

    scrollFun(pos){

        const { listHeight } = this.state;
     //   console.log("pos", pos,listHeight);
      //  return;
        let newY = pos.y
        //newY 滚动到相应的位置
        if(newY >= 0){
            this.setState({
                "currentIndex":0
            },()=>{
                this.refs.listview.refresh();
            })
            return;
        }

       // console.log("newY",newY, listHeight);
       // return;
        //设置滚动的纵向距离
       /* this.setState({
            "scrollY":newY,
        });*/

        // 在中间部分滚动
        for(var i = 0; i < listHeight.length - 1; i++) {
            let height1 = listHeight[i]
            let height2 = listHeight[i + 1];
           // console.log("height1-------------------",-newY,height1,height2 );
           // return;
            if (-newY >= height1 && -newY < height2){

                this.setState({
                    "currentIndex":i,
                    "diff":(height2 + newY)
                },function(){

                    /*let {diff} = this.state;

                    if(!this.fixedHeight){
                        //this.fixedHeight=this.refs.fixed.getBoundingClientRect().height;
                    }
                    let fixedTop = (diff > 0 && diff < this.fixedHeight) ?
                        (diff - this.fixedHeight) :
                        0;
                    if (this.fixedTop === fixedTop) {
                        return;
                    }

                    this.fixedTop = fixedTop;
                    this.refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`*/
                });
                return
            }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.setState({
            "currentIndex":listHeight.length - 2
        });
    }

    searchFous(){

    }

    searchInput(){

    }

    //按照汉字排序
    localeCompare(a,b){
        if(!a&&!b){
            return;
        }
        return a.shortName.localeCompare(b.shortName);
    }

    keywordChange(e){
        this.setState({
            "noLocal":e.target.value
        })
        let { cityListInit } =  this.props.city, val =  e.target.value.toLowerCase();
        if(!cityListInit.length){
            return;
        }

        var newCity =  cityListInit.filter(function(product){
            //console.log("product",product);
            return Object.keys(product).some(function(item){
              //  console.log("item", item);
                return product['shortName'].indexOf(val) == 0 ||
                    product['fullName'].indexOf(val) == 0 ||
                    product['cityName'].indexOf(val) != -1
            })
        });
       // console.log("newCity",newCity);
        // console.log("------newCity------",newCity.sort(this.localeCompare));
        this.setState({
            "filterData":newCity.sort(this.localeCompare),
        })
    }

    keywordClear(){
        this.setState({
            "noLocal":""
        })
    }

    locationPos(e){
        //获取定位
        e.stopPropagation();
        e.preventDefault();
        this.props.dispatch({
            type:"globalAct/getLocation",
        })
    }

    //render的方法
    render(){
        const { cityList, shortcutList } = this.props.city, _this =  this,{ point,SelectBarData,currentCity} =  this.props.globalAct;
        if(!cityList.length){
            return <div style={{"height":"100%"}}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>选择城市</title>
                </Helmet>
                <Header  mode="light"
                         leftContent={<i className="fa fa-angle-left fa-lg"></i>}
                         leftClick={() => window.history.go(-1)}
                ><div style={{"textAlign":"center"}}>选择城市</div></Header>
            </div>
        }
        return <div style={{"height":"100%","background":'#ECF0F4'}}>
                        <Helmet>
                            <meta charSet="utf-8" />
                            <title>选择城市</title>
                        </Helmet>
                        <Header  mode="light"
                                 leftContent={<i className="fa fa-angle-left fa-lg"></i>}
                                 leftClick={() => window.history.go(-1)}
                        ><div style={{"textAlign":"center"}}>选择城市</div></Header>
                        <div  className={classNames(Styles["city-search"])}>
                              <label className={classNames(Styles["icon-search"])} htmlFor="search">
                                  <i className="fa fa-search fa-lg"></i>
                              </label>
                              <input ref="search"
                                     type="search"
                                     maxLength="20"
                                     value={this.state.noLocal}
                                     onChange={this.keywordChange.bind(this)} name="search" id='search'
                                     placeholder='成都，chengdu，cd'/>
                            {this.state.noLocal&&<label className={classNames(Styles[ "icon-close" ])}
                                    onClick={this.keywordClear.bind(this)}>
                                <i className="fa fa-times-circle" aria-hidden="true"></i>
                            </label>||''
                            }
                        </div>

                        <div className={classNames(Styles['scroll-content'],Styles["defaultHeight"])}>
                             <Scroll
                                 class={classNames(Styles['listview'],Styles["wrap"])}
                                 ref="listview"
                                 scrollFun={this.scrollFun.bind(this)}
                             >
                                 <div style={{"paddingBottom":"200px"}}>
                                    <ul>
                                        {/*定位导航栏*/}
                                        <li  className={Styles["list-group"]}>
                                            <h2 className={Styles["list-group-title"]}>当前定位城市</h2>
                                            <div className={Styles['positionAdress']} onClick={this.switchCity.bind(this, currentCity)}>
                                                <div>{currentCity.cityName}</div>
                                                <div><i className={Styles["locationIocn"]} onClick={this.locationPos.bind(this)}></i></div>
                                            </div>
                                        </li>
                                        {/*热门城市*/}
                                       {/* <li  className={Styles["list-group"]}>
                                            <h2 className={Styles["list-group-title"]}>热门</h2>
                                            <div className={Styles['hotCityList']}>
                                                <span className={Styles["caseCitySpan"]}>重庆</span>
                                                <span className={Styles["caseCitySpan"]}>成都</span>
                                                <span className={Styles["caseCitySpan"]}>贵阳</span>
                                                <span className={Styles["caseCitySpan"]}>昆明</span>
                                                <span className={Styles["caseCitySpan"]}>雅安</span>
                                                <span className={Styles["caseCitySpan"]}>巴中</span>
                                                <span className={Styles["caseCitySpan"]}>南充</span>
                                                <span className={Styles["caseCitySpan"]}>泸州</span>
                                                <span className={Styles["caseCitySpan"]}>绵阳</span>
                                                <span className={Styles["caseCitySpan"]}>眉山</span>
                                            </div>
                                        </li>*/}
                                        {
                                            cityList.map(function(group,groupIndex){
                                                return(
                                                    <li  className={Styles["list-group"]} key={groupIndex + 'listView_/*-'}   >
                                                        <h2 className={Styles["list-group-title"]}>{group.title}</h2>
                                                        <ul>
                                                            {
                                                                group.items.map(function (item,itemIndex) {
                                                                    return (
                                                                        <li onClick={_this.switchCity.bind(_this, item)} key={itemIndex + 'list-group-item' + groupIndex} className={Styles["list-group-item"]} >
                                                                          {/*  <img className={Styles["avatar"]} src={item.avatar}/>*/}
                                                                            <span className={Styles["name"]}>{item.cityName}</span>
                                                                            <span className={Styles['parentRegion']}>{item.parentRegionName}</span>
                                                                        </li>
                                                                    )
                                                                })
                                                            }
                                                        </ul>
                                                    </li>
                                                )})
                                        }
                                    </ul>
                                 </div>
                            </Scroll>
                            <div className={Styles["list-shortcut"]}
                                 onTouchStart={this.onShortcutTouchStart.bind(this)}
                                 onTouchMove={this.onShortcutTouchMove.bind(this)}
                                 onTouchEnd={this.onShortTouchEnd.bind(this)}>
                                <ul>
                                    {
                                        shortcutList.map((item,index)=>{
                                            return(
                                            <li
                                                className={classNames(Styles["item"],{[Styles['current']]:_this.state.currentIndex == index})}
                                                key={index + 'list-shortcut'}
                                                data-index={index}
                                            >
                                                {item}
                                            </li>
                                        )})
                                    }
                                </ul>
                                {this.state.showAz&&<div className={Styles["showAZ"]}>{this.state.showAz}</div>||''}
                            </div>
                        </div>
                            {
                                (this.props.fetchCityData||this.props.fetchCity)&&<Loading/>||''
                            }
                            {this.renderOrid()}
                    </div>

    }

    //选择却换城市
    switchCity(item){
        //console.log("item", item);
        //return;
        /**
         * 设置对应的首页查询条件
         * @type {string}
         */
       // console.log("item", item);
        let jqmp_IndexInit =  baseUtil.getSession("jqmp_IndexInit");
        jqmp_IndexInit.cityName =  item.cityName;
        jqmp_IndexInit.cityNo =  item.cityNo;
        jqmp_IndexInit["all"] =  {
            activeIndex:0,
            data:item.childrens&&[{
                  cityName: "全城", cityNo: "all"
                }, ...item.childrens]||[{
                cityName: "全城", cityNo: "all"
            }]
        };
        jqmp_IndexInit.control =  true;
       //baseUtil.setSession("jqmp_IndexInit",jqmp_IndexInit);
        this.props.dispatch({
            type:'globalAct/getSelectBarData',
            payload:{
                type:false,
                SelectBarData:jqmp_IndexInit
            }
        })
       router.push("/");
        // window.location.href='/';
    }

    renderOrid(){
        let { filterData } =  this.state;
       // console.log("--------------filterData",filterData);
        var defaultStyle = {transition:'top 1s',overflowX:'hidden',padding:'0'};
        return <div className={Styles["ui-standard-top"]} style={{display:this.state.noLocal ? "block" : "none"}}>
            <ul style={{transition:'top 1s',overflowX:'hidden',padding:'0',"height":"80%"}}>
                {this.noDatas()}
                {this.renderSearchContent()}

            </ul>
        </div>
    }
    renderSearchContent() {
        let {filterData} = this.state;
       // console.log("filterData", filterData);
        var v = this.state.noLocal, datas =filterData, itemss = [], hot1, hot, hotc;
        if ( !datas ) return
        var c1 = [], c2 = [], c3 = [], c4 = [], c5 = [], c6 = [], that = this;
        datas.map((item, index)=>{
            itemss[ index ] = []
            if ( (item.shortName.indexOf(v) === 0 && item.shortName.length === v.length) || item.cityName.indexOf(v) === 0 ) {
                hot = item.cityName.substr(0, v.length)
                hotc = item.cityName.substr(v.length, item.cityName.length)
                hot1 = ""
            } else if ( item.cityName.indexOf(v) !== 0 && item.cityName.indexOf(v) !== -1 ) {
                // console.log("datas",datas[a]);
                hot1 = item.cityName.substr(0, item.cityName.indexOf(v));
                hot = item.cityName.substr(item.cityName.indexOf(v), v.length);
                hotc = item.cityName.substr(item.cityName.indexOf(v) + v.length, item.cityName.length);
                // console.log("hot",hot1, hot, hotc);
            } else if ( item.fullName === v ) {
                hotc = "";
                hot = item.cityName
                hot1 = "";
            } else if ( item.fullName.indexOf(v) !== -1 ) {
                hotc = item.cityName;
                hot = "";
                hot1 = ""
            } else {
                hotc = item.cityName
                hot = "";
                hot1 = "";
            }
            var cityNames = item.parentRegionName;
            if (item.cityName.indexOf(v) !== 0 && item.cityName.indexOf(v) !== -1 ) {
                //console.log("222222222222222222222222");
                c2.push(<li key={"renderSearchContent"+index}><p className={Styles["city"]}
                                                   onClick={this.switchCity.bind(this, item)}>{hot1}<i>{hot}</i>{hotc}
                    <span className={Styles["cityName_car"]}>{cityNames}</span>
                </p>
                    {itemss[ index ]}
                </li>)
            } else if ( (item.cityName.indexOf(v) === 0 || item.fullName === v || item.fullName.indexOf(v) !== -1 || item.shortName.indexOf(v) === 0) ) {
                //console.log("1111111111111111111111111111");
                c1.push(<li key={"renderSearchContent"+index}><p className={Styles["city"]} onClick={this.switchCity.bind(this, item, 1)}><i>{hot}</i>{hotc}
                    <span className={Styles["cityName_car"]}>{cityNames}</span>
                </p>
                    {itemss[ index ]}
                </li>)
            } else if (item.cityName.indexOf(v) === -1 && (item.fullName !== v || item.fullName.indexOf(v) === -1) && item.shortName.indexOf(v) !== 0 ) {
                //console.log("333333333333333333333333333",itemss);
                c3.push(<li key={"renderSearchContent"+index}><p className={Styles["city"]}
                               onClick={this.switchCity.bind(this, item)}>{item.cityName}<span
                    className={Styles["cityName_car"]}>{cityNames}</span></p>
                    {itemss[ index ]}
                </li>)
            }
        })
        return c1.concat(c2,c3).concat(c4,c5).concat(c6);
    }
    noDatas(){

    }
}
