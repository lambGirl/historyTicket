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
@connect(({globalAct})=>({
    globalAct
}))

class IndexPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            pageStatus:{
                currPageY: 0    //当前页面滚动的Y坐标
            },
            headerConfig:{          //headerConfig配置
                mode:"transparent",
                color:'#fff'
            },
            IndexModelSelectBarStatus: [false,false], //IndexModelSelectBar，model什么时候显示
            selectBarModelFixed:false,      //设置toolBar悬浮动画
        }
    }

    componentDidMount(){
        this.props.dispatch({
            type:'globalAct/getInit',
        });
        //拿去定位结果，如果定位成功则去请求，获取城市的接口。得到城市之后，去查询所有的门票的列表
        //console.log("sdfsdfsdfsdfsdf", this.props);
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
                postData:{
                    sortType: zlpx.data[zlpx.activeIndex].key,
                    longitude: point.data&&point.data.lng||"",
                    latitude: point.data&&point.data.lat||"",
                    key:'',
                    pageNum: currPage,
                    pageSize:20,
                    cityNo:'all'    //这里到时候要改
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
            {searchBarModel,indexSwiper,headers} = this.refs,
            {clientHeight} = indexSwiper;  //滚动图片的高度,如果小于这个都需要重新设置header
        pageStatus.currPageY =  pos.y;
        this.setState({
            pageStatus:pageStatus
        })

        //console.log("123123", (pos.y+(-40)),(-clientHeight))
        if((pos.y+(-40))<(-clientHeight)+5){
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

        if(headerConfig.mode != "transparent"){
            this.setState({
                headerConfig:{
                    mode:"transparent",
                    color:'#fff'
                },
              selectBarModelFixed:false
            })
        }
    }

    //点击seachBar
    selectBar(tag,e) {
      let {searchBarModel,indexScroll,indexSwiper} = this.refs,
          {selectBarModelFixed,IndexModelSelectBarStatus} =  this.state,
            {clientWidth, clientHeight} = indexSwiper,
            searchBarHeight =  searchBarModel.clientHeight,
            { currPageY } = this.state.pageStatus,time = !selectBarModelFixed&&100||0;
        if(currPageY >= -(clientHeight)) {
            //设置滚动
            indexScroll.refs.scrollSwipe.scrollToElement(this.refs.searchBarModel, 300, 0, -searchBarHeight + 6);
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
                    SelectBarData:e
                }
            })
        }
        this.setState({
            IndexModelSelectBarStatus:[false,false]
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

    render(){
        let {SelectBarData,doorList,currPage,totalPage} =  this.props.globalAct,{ IndexModelSelectBarStatus } =  this.state,
            allBarColor = (SelectBarData["all"].activeIndex||IndexModelSelectBarStatus[0])?'#37A0F1':"#DBDBDB",
            zlpxColor =  (SelectBarData["zlpx"].activeIndex||IndexModelSelectBarStatus[1])?'#37A0F1':"#DBDBDB";
        let ListArrHeight = this.initticketsListArrHeight();
        //console.log("SelectBarData",SelectBarData);
        return (
            <div className={styles["container_page"]}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>首页</title>
                </Helmet>
                <div className={styles["index_page"]}>
                   <div  ref='headers'>
                        <Header
                          id='headers'
                            positionType ='positionAbolute'
                            mode={this.state.headerConfig.mode}
                            leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":`${this.state.headerConfig.color}`}}></i>}
                            rightContent={
                                <span style={{"color":`${this.state.headerConfig.color}`}}>
                                    <span style={{"paddingRight":'4px'}}>{SelectBarData.cityName}</span>
                                    <i className="fa fa-angle-down fa-lg"></i>
                               </span>
                            }
                            centerContentType='1'
                            rightClick={this.rightClick.bind(this)}
                        ></Header>
                    </div>
                    {SelectBarData.cityName&&<Scroll class={styles["wrapper"]}
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
                                    <img src="https://p0.meituan.net/400.0/hotel/fd8e418933a722e6ca77f918aa553f89135934.jpg" alt=""/>
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

                            <div className={styles["ticketsListArr"]}>
                                {
                                    doorList&&doorList.map((item,index)=>{
                                        return  <AttractionSingle key={index} item={item} clickItem={this.chooseTicket.bind(this)}/>
                                    })
                                }
                            </div>
                        </div>
                    </Scroll>}
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
