import React from 'react';
import { connect } from 'dva';
import router from 'umi/router'
import dynamic from 'umi/dynamic';
import styles from './index.less';
/*import Scroll from '../components/scroll';*/
import Header from  '../components/header';
import classnames from 'classnames';
import {Helmet} from "react-helmet";    //用于修改页面的title
import Router from 'umi/router';
import IndexModelSelectBar from '../components/indexModeSelectBarContent';  //点击select 弹出的model
import IndexSelectBar from '../components/indexSelectBar'   //selectBar
import Scroll from '../components/demo/index' //分页滚动
import AttractionSingle from '../components/indexAttractionSingle';
import Dynamic from 'umi/dynamic';
import { baseUtil } from "../utils/util";
@connect(({globalAct,loading})=>({
    globalAct,
    loading,
    getLocation:  loading.effects['globalAct/getInit'],
}))

class IndexPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageStatus:{
                currPageY: 0    //当前页面滚动的Y坐标
            },
            headerConfig:{          //headerConfig配置
                mode:"none",
                color:'#fff'
            },
            IndexModelSelectBarStatus: [false,false], //IndexModelSelectBar，model什么时候显示
            selectBarModelFixed:false,      //设置toolBar悬浮动画
        }
    }
    componentWillMount(){
        //console.log("222222222222222")
    }

    componentDidMount(){
        /*this.props.dispatch({
            type:'globalAct/getInit',
        });*/
        //console.log("11111111111111");
    }
    goDetail(){
       Router.push('/ticketDetail/')
    }
    //获取门票列表的接口
    getDoorTicketList(){
        let {point,currentCity,currPage,pageNum,totalPage,SelectBarData}  = this.props.globalAct,
        zlpx = SelectBarData["zlpx"],
        all = SelectBarData["all"];
        //执行这里就去负责加一个页
        currPage++;
        if(currPage>totalPage){
            return;
        }
        //初始化查询
        this.props.dispatch({
            type: 'globalAct/getPoints',
            payload: {
                type:true,
                postData:{
                    sortType: zlpx.data[zlpx.activeIndex].cityNo,
                    longitude: point.data&&point.data.lng||"",
                    latitude: point.data&&point.data.lat||"",
                    key:'',
                    pageNum: currPage,
                    pageSize:20,
                    cityNo:all.data[all.activeIndex].cityNo    //这里到时候要改
                },
                currentCity: currentCity
            },
        });
    }
    //监听scroll的滚动
    onScroll(pos,tag){
        /**
         * searchBarModel: 代表selectBar,
         * indexScroll: 代表滚动scroll
         * indexSwiper: 代表背景图片
         * header: 代表header
         */
        //console.log("po---------------s",pos);
        let { pageStatus,headerConfig } =  this.state,
            {searchBarModel,indexSwiper,headers,indexScroll} = this.refs,
            {clientHeight} = indexSwiper;  //滚动图片的高度,如果小于这个都需要重新设置header
        pageStatus.currPageY =  pos.y;
        this.setState({
            pageStatus:pageStatus
        })

      //  console.log("pos.y",pos.y)
        if(-(pos.y) > 40&&(-clientHeight)+5<(pos.y+(-60))){
          //  console.log("pos.y",pos.y)
            this.setState({
                headerConfig:{
                    mode:"transparent",
                    color:'#fff'
                },
                selectBarModelFixed:false
            })
            return;
        }

        //console.log("123123", pos.y);
        if((-clientHeight)+5>=(pos.y+(-40))){
            this.setState({
                headerConfig:{
                    mode:"light",
                    color:'#3E3E3E'
                },
              selectBarModelFixed:true
            })
            return;
        }
       // console.log("clientHeight", (pos.y+(-40)),(-clientHeight));


        if(-(pos.y) < 40&&headerConfig.mode != "none"){
            this.setState({
                headerConfig:{
                    mode:"none",
                    color:'#fff'
                },
              selectBarModelFixed:false
            })
        }
    }

    //点击seachBar
    selectBar(tag,e) {
       // console.log("e",e._constructed);
       // return;
        //判断是够点击model是够展示，如果展示就隐藏 什么都不做
        let {IndexModelSelectBarStatus} =  this.state;
       // console.log("IndexModelSelectBarStatus",IndexModelSelectBarStatus.indexOf(true) !== -1);
        if(IndexModelSelectBarStatus.indexOf(true) !== -1){
            this.setState({
                IndexModelSelectBarStatus:[false,false]
            });
            return;
        }
      let {searchBarModel,indexScroll,indexSwiper} = this.refs,
          {selectBarModelFixed} =  this.state,
            {clientWidth, clientHeight} = indexSwiper,
            searchBarHeight =  searchBarModel.clientHeight,
            { currPageY } = this.state.pageStatus,time = !selectBarModelFixed&&100||0;
        if(currPageY >= -(clientHeight)) {
            //设置滚动
            indexScroll.refs.scrollSwipe.scrollToElement(this.refs.searchBarModel, 300, 0, -searchBarHeight + 10);
        }

        let {SelectBarData } =  this.props.globalAct;
        //清空全部parentIndex 为false，在把对应的设置成true
        ["all","zlpx"].forEach((item)=>{
            SelectBarData[item].parentIndex = false;
        });

        SelectBarData[tag].parentIndex =  true
        this.setState({
            SelectBarData: SelectBarData
        });
        //设置SelectBarData的数据
        this.props.dispatch({
            type:'globalAct/getSelectBarData',
            payload: {
                type:false,
                SelectBarData
            }
        })
        //显示selectBar数据
        var num =  tag=="all"?0:1;
        //还原设置bard
        setTimeout(()=>{
            Object.keys(IndexModelSelectBarStatus).map(function(item){
                IndexModelSelectBarStatus[item] =  false;
            })
            IndexModelSelectBarStatus[num] =  true;
            this.setState({
                IndexModelSelectBarStatus:IndexModelSelectBarStatus,
            });
        },time)
    }

    //重新初始化数据selectBar的数据
    reInitSelect(e){
       // console.log("e",e);
        if(e){
            //设置SelectBarData的数据
            this.props.dispatch({
                type:'globalAct/getSelectBarData',
                payload: {
                    type:true,
                    SelectBarData:e
                }
            })
        }
        //console.log("点击了");
        this.setState({
            IndexModelSelectBarStatus:[false,false]
        },()=>{
            if(e){
                let {indexScroll} = this.refs;
                indexScroll.refs.scrollSwipe.scrollToElement(this.refs.searchBarModel, 300,0, -40);
            }
        })
    }
    //初始化底部实际数据渲染的高度
    initticketsListArrHeight(){
        let bodyHeight =  document.body.clientHeight;
        /*{searchBarModel,indexSwiper,headers} = this.refs;
        if(searchBarModel&&indexSwiper){
            return bodyHeight-searchBarModel.clientHeight-indexSwiper.clientHeight+(indexSwiper.clientHeight-40);
        }*/
        return bodyHeight+140;

    }
    //header 右边点击
    rightClick(){
        router.push("/city")
    }

    //选择景区门票
    chooseTicket(item){
       router.push(`/ticketDetail?point=${item.pointNo}`)
    }

    //centerClick
    centerClick(){
        router.push(`/searchTicketList`);
    }

    goHome(){
        /**
         * 这里要判断是不是ios， android
         * @type {string}
         */
        let from  =  baseUtil.getSession("cdqcp_channel")||router.location.query.from;
        ("iOS" == from || "Android" == from )? window.location.href = "##backToVC=1" : window.location.href="/";
    }

    render(){
        let {SelectBarData,doorList,currPage,totalPage,homeFocusImg} =  this.props.globalAct,{ IndexModelSelectBarStatus } =  this.state,
            allBarColor = (SelectBarData["all"].activeIndex||IndexModelSelectBarStatus[0])?'#37A0F1':"#DBDBDB",
            zlpxColor =  (SelectBarData["zlpx"].activeIndex||IndexModelSelectBarStatus[1])?'#37A0F1':"#DBDBDB";
        let ListArrHeight = this.initticketsListArrHeight();

       // console.log("getPoints",this.props.loading);

        return (
            <div className={styles["container_page"]}>
                <Helmet>
                    <meta charSet="utf-8"/>
                    <title>首页</title>
                </Helmet>
                <div className={styles["index_page"]}>
                   <div  ref='headers'>
                        <Header
                          id='headers'
                            headerInput={true}
                            positionType ='positionAbolute'
                            mode={this.state.headerConfig.mode}
                            leftContent={ <i className={classnames({
                                [styles["headerleftIconWhite"]]: this.state.headerConfig.mode != "light",
                                [styles["headerleftIconBlack"]]: this.state.headerConfig.mode == "light"
                            })}></i>}

                            rightContent={
                                <span style={{"color":`${this.state.headerConfig.color}`}}>
                                    <span style={{"paddingRight":'4px'}} className={styles["headerCityName"]}>{SelectBarData.cityName}</span>
                                    <i className="fa fa-angle-down fa-lg"></i>
                               </span>
                            }
                            centerContentType='1'
                            leftClick={this.goHome.bind(this)}
                            rightClick={this.rightClick.bind(this)}
                            centerClick={this.centerClick.bind(this)}
                        ></Header>
                    </div>
                    {this.props.getLocation&&<div className={styles['loading-fullScreen']}></div>||''}
                    <Scroll class={styles["wrapper"]}
                            ref='indexScroll'
                            needMore={true}
                            currPage={currPage}
                            totalPage={totalPage}
                            loadMoreData={this.getDoorTicketList.bind(this)}
                            height="100%"
                            doScroll={this.onScroll.bind(this)}
                    >
                        <div  className={styles["wrapper_content"]} style={{"minHeight":`${ListArrHeight}px`}}>
                            <div className={styles["swipper_top"]} ref='indexSwiper'>
                                <div className={styles["index_banner_img"]}>
                                    <img src={homeFocusImg.length&&homeFocusImg[0].showImage||''} alt=""/>
                                </div>
                            </div>
                            <div  ref='searchBarModel'>
                                <IndexSelectBar
                                    selectBarModelFixed={false}
                                    SelectBarData={SelectBarData}
                                    allBarColor={allBarColor}
                                    zlpxColor={zlpxColor}
                                    selectBar={this.selectBar.bind(this)}
                                    IndexModelSelectBarStatus={this.state.IndexModelSelectBarStatus}
                                ></IndexSelectBar>
                            </div>
                           {doorList.length&&<div className={styles[ "ticketsListArr" ]}>
                                {
                                    doorList.map((item, index) => {
                                        return (<AttractionSingle key={index} item={item}
                                                                 clickItem={this.chooseTicket.bind(this)}/>)
                                    })
                                }
                            </div>||''
                            }
                            {
                                (this.props.getLocation)&&<div className={styles["loading"]}>
                                    <div className={styles['loading-icon']}></div>
                                    <div className={styles['loading-content']}>
                                        <div className={styles['loading-left']}></div>
                                        <div>正在加载,请等待</div>
                                    </div>
                               </div>||''
                            }
                            {
                                !this.props.getLocation&&typeof doorList == "object"&&!doorList.length&&<div className={styles['search-nothing-content']}>
                                    <div
                                        className={classnames(styles["searchContentIcon"],{
                                            [styles["noData"]]:true,
                                        })}></div>
                                    <div className={styles['search-nothing-font']}>
                                        未找到您筛选的内容
                                    </div>
                                </div>||''
                            }

                        </div>
                    </Scroll>
                </div>

                {
                    this.state.selectBarModelFixed&&<IndexSelectBar
                        selectBarModelFixed={this.state.selectBarModelFixed}
                        SelectBarData={SelectBarData}
                        allBarColor={allBarColor}
                        zlpxColor={zlpxColor}
                        selectBar={this.selectBar.bind(this)}
                        IndexModelSelectBarStatus={this.state.IndexModelSelectBarStatus}
                    ></IndexSelectBar>
                }
                {(IndexModelSelectBarStatus[0]||IndexModelSelectBarStatus[1])&&<IndexModelSelectBar selectBarData={SelectBarData} barClick={this.reInitSelect.bind(this)}/>}

            </div>
        );
    }
}
export default IndexPage
