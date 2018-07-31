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

class IndexPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 2,
            imgHeight: 0.025*340+"rem",
            data: ['1', '2', '3'],
            pageStatus:{
                currPageY: 0
            },
            headerConfig:{
                mode:"transparent",
                color:'#fff'
            },
            selectBarModelFixed:false
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
      //console.log(tag);
      let {searchBarModel,indexScroll,indexSwiper} = this.refs,
            {clientWidth, clientHeight} = indexSwiper,
            searchBarHeight =  searchBarModel.clientHeight,
            { currPageY } = this.state.pageStatus;
        // console.log("-------------tag--------", currPageY, clientWidth,clientHeight );
        //首先判断当前这个y坐标是否已经超过了searchBarModel的y坐标+他当前的高度，如果超过了就不用执行
        // return;
        //if()
      //  console.log("scrollTop",currPageY,clientHeight,this.refs.indexSwiper.clientHeight);
        if(currPageY > -(clientHeight)) {
         // indexScroll.scrollToElement(this.refs.searchBarModel, 300, 0);
          indexScroll.scrollToElement(this.refs.searchBarModel, 300, 0, -searchBarHeight + 6);
         // indexScroll.scrollTo(clientHeight);
           /* this.setState({
                headerConfig:{
                    mode:"light",
                    color:'#3E3E3E'
                }
            },()=>{
              //indexScroll.scrollToElement(this.refs.searchBarModel, 10, 0, -searchBarHeight + 6);
            });*/
        }
    }

    render(){
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
                               {/* <Header
                                         prefixCls='am-abolute'
                                         mode="transparent"
                                         classModel={styles['headerModel']}
                                         leftContent={<i className="fa fa-angle-left fa-lg"></i>}
                                         onLeftClick={() => window.history.go(-1)}>
                                        <div  className={styles['searchInputBar']}>
                                            <i className="fa fa-search fa-lg"></i>
                                            <input type="text" className={styles["searchInputText"]} name='searchAll' placeholder='景点名称'/>
                                        </div>
                                </Header>*/}
                                <div className={styles["index_banner_img"]}>
                                    <img src="https://p0.meituan.net/400.0/hotel/fd8e418933a722e6ca77f918aa553f89135934.jpg" alt=""/>
                                </div>
                            </div>
                            <div className={classnames(styles["selectBarModel"],{
                              [styles["selectBarModelFixed"]]:this.state.selectBarModelFixed
                            })} ref='searchBarModel'>
                                <div className={styles['selectBar']}>
                                  <div onClick={this.selectBar.bind(this, 'all')}>
                                    <span>全城</span>
                                    <i className="fa fa-caret-down fa-lg"></i>
                                  </div>
                                  <div onClick={this.selectBar.bind(this, 'all')}>
                                    <span>智能排序</span>
                                    <i className="fa fa-caret-down fa-lg"></i>
                                  </div>
                                </div>
                                <div className={styles['selectContent']}>
                                </div>
                            </div>
                            <div className={styles["ticketsListArr"]}>
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
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                            <div>sdfsdfsdfsdf</div>
                        </div>


                    </Scroll>
                </div>
            </div>
        );
    }
}
export default IndexPage
