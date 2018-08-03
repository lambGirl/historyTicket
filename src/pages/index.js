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
import AttractionSingle from '../components/indexAttractionSingle'

const Data = []
let NEWDATAINDEX = 1
for (let i = 0; i < 10; i++) {
    Data.push(i)
}

class IndexPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            listData: Data,
            currPage:1,
            totalPage:10,
            pageStatus:{
                currPageY: 0    //当前页面滚动的Y坐标
            },
            headerConfig:{          //headerConfig配置
                mode:"transparent",
                color:'#fff'
            },
            IndexModelSelectBarStatus: false, //IndexModelSelectBar，model什么时候显示
            SelectBarData:{
                "all":{
                    activeIndex:0,
                    parentIndex: false,
                    data:[
                        {key:'qc', val:'全城'},
                        {key:'qc', val:'武侯区'},
                    ]
                },
                'zlpx':{
                    activeIndex:0,
                    parentIndex: false,
                    data:[
                        {key:'0', val:'智能排序'},
                        {key:'1', val:'由近到远'},
                    ]
                }
            }
        }
    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({
                data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
        }, 100);
    }
    goDetail(){
      //console.log("ticketDetail");
       Router.push('/ticketDetail/')
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
        if((pos.y+(-40))<(-clientHeight)){
            this.setState({
                headerConfig:{
                    mode:"light",
                    color:'#3E3E3E'
                },
              /*selectBarModelFixed:true*/
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
      //console.log(tag);
      let {searchBarModel,indexScroll,indexSwiper} = this.refs,
            {clientWidth, clientHeight} = indexSwiper,
            searchBarHeight =  searchBarModel.clientHeight,
            { currPageY } = this.state.pageStatus;
     // console.log("indexScroll",indexScroll);
     // return;
        if(currPageY > -(clientHeight)) {
            //设置滚动
        //    indexScroll.scrollToElement(this.refs.searchBarModel, 300, 0, -searchBarHeight + 6);
            indexScroll.refs.scrollSwipe.scrollToElement(this.refs.searchBarModel, 300, 0, -searchBarHeight + 6);
        }

        let {SelectBarData } =  this.state;
        //清空全部parentIndex 为false，在把对应的设置成true
        Object.keys(SelectBarData).forEach((item)=>{
            SelectBarData[item].parentIndex = false;
        });
        SelectBarData[tag].parentIndex =  true
        this.setState({
           // IndexModelSelectBarStatus:true,
            SelectBarData: SelectBarData
        });
        //显示selectBar数据
        setTimeout(()=>{
            this.setState({
                IndexModelSelectBarStatus:true,
            });
        },250)
    }

    //重新初始化数据selectBar的数据
    reInitSelect(e){
        if(e){
            this.setState({
                SelectBarData:e
            })
        }
        this.setState({
            IndexModelSelectBarStatus:false
        })
    }
    //初始化底部实际数据渲染的高度
    initticketsListArrHeight(){
        let bodyHeight =  document.body.clientHeight,
        {searchBarModel,indexSwiper,headers} = this.refs;
        if(searchBarModel&&indexSwiper){
            return bodyHeight-searchBarModel.clientHeight-indexSwiper.clientHeight+(indexSwiper.clientHeight-40);
        }
        return "";

    }

    loadMoreData = () => {
        // 更新数据
        return new Promise( (resolve,reject) => {
            if(this.state.listData.length >=30){
                this.setState({
                    currPage: 10,
                    totalPage:10
                });
                resolve({
                    currentPage:10,
                    totalPage:10
                })
                return;
            }
            setTimeout(() => {
                if (Math.random() > 0) {
                    // 如果有新数据
                    let newPage = []
                    for (let i = 0; i < 9; i++) {
                        newPage.push(`我是新数据${NEWDATAINDEX++}`)
                    }
                    this.setState({
                        listData: [
                            ...this.state.listData,
                            ...newPage
                        ],
                        currPage: 1,
                        totalPage:10
                    })
                }
                resolve({
                    currentPage:1,
                    totalPage:10
                })
            }, 1000)
        })
    }
    //header 右边点击
    rightClick(){
        router.push("/city")
    }

    //选择景区门票
    chooseTicket(item){
        //console.log("-----------------item----------------",item);
        router.push("/ticketDetail")
    }

    render(){
        let { IndexModelSelectBarStatus,SelectBarData } =  this.state,
            allBarColor = (SelectBarData["all"].activeIndex||IndexModelSelectBarStatus)&&SelectBarData["all"].parentIndex?'#37A0F1':"#DBDBDB",
            zlpxColor =  (SelectBarData["zlpx"].activeIndex||IndexModelSelectBarStatus)&&SelectBarData["zlpx"].parentIndex?'#37A0F1':"#DBDBDB";
        let ListArrHeight = this.initticketsListArrHeight();
        //console.log("ListArrHeight",ListArrHeight);
        return (
            <div className={styles["container_page"]}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>首页</title>
                </Helmet>
                <div className={styles["index_page"]}>
                    <div  ref='headers'>
                        <Header
                            positionType ='positionAbolute'
                            mode={this.state.headerConfig.mode}
                            leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":`${this.state.headerConfig.color}`}}></i>}
                            rightContent={
                                <span style={{"color":`${this.state.headerConfig.color}`}}>
                                    <span style={{"paddingRight":'4px'}}>成都</span>
                                    <i className="fa fa-angle-down fa-lg"></i>
                               </span>
                            }
                            centerContentType='1'
                            rightClick={this.rightClick.bind(this)}
                        ></Header>
                    </div>
                    <Scroll class={styles["wrapper"]}
                            ref='indexScroll'
                            needMore={true}
                            currPage={this.state.currPage}
                            totalPage={this.state.totalPage}
                            loadMoreData={this.loadMoreData.bind(this)}
                            height="100%"
                            doScroll={this.onScroll.bind(this)}
                    >
                        <div  className={styles["wrapper_content"]}>
                            <div className={styles["swipper_top"]} ref='indexSwiper'>
                                <div className={styles["index_banner_img"]}>
                                    <img src="https://p0.meituan.net/400.0/hotel/fd8e418933a722e6ca77f918aa553f89135934.jpg" alt=""/>
                                </div>
                            </div>
                            <div  ref='searchBarModel'>
                                <IndexSelectBar
                                    selectBarModelFixed={this.state.selectBarModelFixed}
                                    SelectBarData={SelectBarData}
                                    allBarColor={allBarColor}
                                    zlpxColor={zlpxColor}
                                    selectBar={this.selectBar.bind(this)}
                                    IndexModelSelectBarStatus={this.state.IndexModelSelectBarStatus}
                                ></IndexSelectBar>
                            </div>

                            <div className={styles["ticketsListArr"]} style={{"minHeight":`${ListArrHeight}px`}}>
                                {
                                    this.state.listData.map((item,index)=>{
                                        return  <AttractionSingle key={index} item={item} clickItem={this.chooseTicket.bind(this)}/>
                                    })
                                }
                            </div>
                        </div>
                    </Scroll>
                </div>

                {IndexModelSelectBarStatus&&<IndexModelSelectBar selectBarData={SelectBarData} barClick={this.reInitSelect.bind(this)}/>}
            </div>
        );
    }
}
export default IndexPage
