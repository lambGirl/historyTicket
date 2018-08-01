import React from 'react';
import { connect } from 'dva';
import router from 'umi/router'
import dynamic from 'umi/dynamic';
import styles from './index.less';
import Scroll from '../components/scroll';
import Header from  '../components/header';
import classnames from 'classnames';
import {Helmet} from "react-helmet";    //用于修改页面的title
import Router from 'umi/router';
import IndexModelSelectBar from '../components/indexModeSelectBarContent';
import IndexSelectBar from '../components/indexSelectBar'

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

        let { pageStatus,headerConfig } =  this.state,
            {searchBarModel,indexScroll,indexSwiper,headers} = this.refs,
            {clientHeight} = indexSwiper;  //滚动图片的高度,如果小于这个都需要重新设置header

        pageStatus.currPageY =  pos.y;
        this.setState({
            pageStatus:pageStatus
        })
       // console.log("clientHeight", (pos.y+(-38)));
       // return;
       //  console.log("clientHeight", (pos.y),(-clientHeight),tag);
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

        if(currPageY > -(clientHeight)) {
            //设置滚动
            indexScroll.scrollToElement(this.refs.searchBarModel, 300, 0, -searchBarHeight + 6);
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

    render(){
        let { IndexModelSelectBarStatus,SelectBarData } =  this.state,
            allBarColor = (SelectBarData["all"].activeIndex||IndexModelSelectBarStatus)&&SelectBarData["all"].parentIndex?'#37A0F1':"#DBDBDB",
            zlpxColor =  (SelectBarData["zlpx"].activeIndex||IndexModelSelectBarStatus)&&SelectBarData["zlpx"].parentIndex?'#37A0F1':"#DBDBDB";
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
                        ></Header>
                    </div>
                    <Scroll class={styles["wrapper"]}
                            ref='indexScroll'
                            scrollFun={this.onScroll.bind(this)}
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
                            {/*<div className={classnames(styles["selectBarModel"],{
                              [styles["selectBarModelFixed"]]:this.state.selectBarModelFixed
                            })} ref='searchBarModel'>
                                <div className={styles['selectBar']}>
                                  <div onClick={this.selectBar.bind(this, 'all')}>
                                    <span>{ SelectBarData["all"].data[SelectBarData["all"].activeIndex].val}</span>
                                    <i className={classnames("fa fa-caret-down fa-lg", {
                                        "fa-caret-up": SelectBarData["all"].parentIndex&&this.state.IndexModelSelectBarStatus
                                    })}
                                     style={{
                                         "color":`${allBarColor}`
                                     }}
                                    ></i>
                                  </div>
                                  <div onClick={this.selectBar.bind(this, 'zlpx')}>
                                    <span>{ SelectBarData["zlpx"].data[SelectBarData["zlpx"].activeIndex].val}</span>
                                      <i className={classnames("fa fa-caret-down fa-lg", {
                                          "fa-caret-up": SelectBarData["zlpx"].parentIndex&&this.state.IndexModelSelectBarStatus
                                      })}
                                    style={{"color":`${zlpxColor}`}}></i>
                                  </div>
                                </div>
                            </div>*/}
                            <div className={styles["ticketsListArr"]} style={{"height":"1000px"}}>
                                <div className={styles['ticketsList']} onClick={this.goDetail.bind(this)}>
                                    <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                                    <div>
                                        <p>克罗地亚之海</p>
                                        <div>
                                            <div className={classnames(styles['font24'],styles['color_CCC'])}>双流，距我79km</div>
                                            <div>
                                                <span className={classnames(styles["font20"], styles["color_F60"])}>¥</span>
                                                <span className={classnames(styles["font40"], styles["color_F60"])}>9346</span>
                                                <span className={classnames(styles["font20"], styles["color_fff"])}>起</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles['ticketsList']}>
                                    <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                                    <div>
                                        <p>克罗地亚之海</p>
                                        <div>
                                            <div>双流，距我79km</div>
                                            <div>
                                                <span className={classnames(styles["font20"], styles["color_F60"])}>¥</span>
                                                <span className={classnames(styles["font40"], styles["color_F60"])}>9346</span>
                                                <span className={classnames(styles["font20"], styles["color_fff"])}>起</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
