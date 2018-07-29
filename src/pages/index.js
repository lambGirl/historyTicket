import React from 'react';
import { connect } from 'dva';
import router from 'umi/router'
import dynamic from 'umi/dynamic';
import styles from './index.less';
import Scroll from '../components/scroll'
import Header from  '../components/header'
import classnames from 'classnames'
import {Helmet} from "react-helmet";    //用于修改页面的title
import Router from 'umi/router'

class IndexPage extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            slideIndex: 2,
            imgHeight: 0.025*340+"rem",
            data: ['1', '2', '3'],
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

    render(){
        return (
            <div className={styles["container_page"]}>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>首页</title>
                </Helmet>
                <div className={styles["index_page"]}>
                    <Scroll class={styles["wrapper"]}>
                        <div  className={styles["wrapper_content"]}>
                            <div className={styles["swipper_top"]}>
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

                                <Header
                                  positionType ='positionAbolute'
                                  mode="transparent"
                                  leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i>}
                                  rightContent={ <i className="fa fa-angle-right fa-lg" style={{"color":"#fff"}}></i>}
                                  centerContentType='1'
                                ></Header>
                                <div className={styles["index_banner_img"]}>
                                    <img src="https://p0.meituan.net/400.0/hotel/fd8e418933a722e6ca77f918aa553f89135934.jpg" alt=""/>
                                </div>
                            </div>
                            <div className={styles["selectBarModel"]}>
                                <div className={styles['selectBar']}>
                                  <div>
                                    <span>全城</span>
                                    <i className="fa fa-caret-down fa-lg"></i>
                                  </div>
                                  <div>
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
