import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import { Carousel } from 'antd-mobile';
import Scroll from '../../components/scroll'
import Router from 'umi/router'

export  default class ticketDetail extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
      slideIndex:0,
      data:[]
    }
  }
  componentDidMount(){
    setTimeout(() => {
      this.setState({
        data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
      });
    }, 100);
  }
  scrollFun(){

  }
  //执行跳转
  showPhotosList(){
    Router.push('/merchantPhotos');
  }

  render(){
    var _this = this;
    return <div className={ClassNames(Styles['ticketDetailContent'])}>
        <div className={Styles['ticketTop']}>
          <Header
            positionType ='positionAbolute'
            mode="none"
            leftContent={ <span className={Styles['leftBtnCircle']}><i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i></span>}
          ></Header>
          <Carousel
            autoplay={true}
            infinite
            dots={false}
            selectedIndex={this.state.slideIndex}
            beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
            afterChange={index => {this.setState({"slideIndex": index})}}
          >
            {this.state.data.map((val, index) => (
              <a
                key={val + index}
                href="javascript:;"
                onClick={_this.showPhotosList.bind(_this,index)}
                className={Styles['swiper-single-a']}
              >
                <img
                  src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                  alt=""
                  onLoad={() => {
                    // fire window resize event to change height
                    window.dispatchEvent(new Event('resize'));
                    this.setState({ imgHeight: 'auto' });
                  }}
                />
              </a>
            ))}
          </Carousel>
          <div className={Styles['swiper-bottom']}>
            <div>
              <div>成都三和老爷车博物馆</div>
              <div>{this.state.slideIndex+1}/{this.state.data.length}张</div>
            </div>
          </div>
        </div>
      <div className={Styles["ticketAddress"]}>
        <div>
          四川省成都市武侯区红牌楼佳灵仙路124号
        </div>
        <div>
          <i className="fa fa-phone" aria-hidden="true"></i>
        </div>
      </div>
      <div className={Styles['scroll-content']}>
        <Scroll class={Styles['wrapper']}>
          <div className={Styles['scroll-cotent-bottom']}>
            <div className={Styles['card']}>
              <div className={Styles['card-Title']}>
                <span className={Styles['card-title-leftIcon']}></span>
                门票
              </div>
              <div className={Styles['card-content']}>
                  <div className={ClassNames(Styles['door-ticketList-single'],Styles['borderBottom'])}>
                    <div>
                      <div className={ClassNames(Styles['font28'],Styles['color_3e'])}>三和老爷车博物馆(成人票)</div>
                      <div>
                        <span className={ClassNames(Styles['font20'],Styles['color_F60'])}>¥</span>
                        <span className={ClassNames(Styles['font34'],Styles['color_F60'])}>50</span>
                        <span className={ClassNames(Styles['font20'],Styles['color_94'])}>起</span>
                      </div>
                    </div>
                    <div>
                        <div className={Styles['ticket-buy']}>立即预订</div>
                    </div>
                  </div>
                  <div className={ClassNames(Styles['door-ticketList-single'],Styles['borderBottom'])}>
                    <div>
                      <div className={ClassNames(Styles['font28'],Styles['color_3e'])}>三和老爷车博物馆(成人票)</div>
                      <div>
                        <span className={ClassNames(Styles['font20'],Styles['color_F60'])}>¥</span>
                        <span className={ClassNames(Styles['font34'],Styles['color_F60'])}>50</span>
                        <span className={ClassNames(Styles['font20'],Styles['color_94'])}>起</span>
                      </div>
                    </div>
                    <div>
                      <div className={Styles['ticket-buy']}>立即预订</div>
                    </div>
                  </div>
                  <div className={ClassNames(Styles['door-ticketList-single'])}>
                    <div>
                      <div className={ClassNames(Styles['font28'],Styles['color_3e'])}>三和老爷车博物馆(成人票)</div>
                      <div>
                        <span className={ClassNames(Styles['font20'],Styles['color_F60'])}>¥</span>
                        <span className={ClassNames(Styles['font34'],Styles['color_F60'])}>50</span>
                        <span className={ClassNames(Styles['font20'],Styles['color_94'])}>起</span>
                      </div>
                    </div>
                    <div>
                      <div className={Styles['ticket-buy']}>立即预订</div>
                    </div>
                  </div>
              </div>
            </div>
            <div className={Styles['card']}>
              <div className={Styles['card-Title']}>
                <span className={Styles['card-title-leftIcon']}></span>
                开放时间
              </div>
              <div className={Styles['card-content']}>
                <div className={Styles['card-content-text']}>
                  1月1日-8月31日 周二至周日 全天：09:00-17:00 最晚入园时间
                  17:00
                  周一闭馆
                  9月1日-12月31日 周三至周日 全天：09:00-17:00 最晚入园时
                  间16:00
                  <span className={Styles['']}>备注：周一、周二闭馆</span>
                </div>
              </div>
            </div>
            <div className={Styles['card']}>
              <div className={Styles['card-Title']}>
                <span className={Styles['card-title-leftIcon']}></span>
                开放时间
              </div>
              <div className={Styles['card-content']}>
                <div className={Styles['card-content-text']}>
                  1月1日-8月31日 周二至周日 全天：09:00-17:00 最晚入园时间
                  17:00
                  周一闭馆
                  9月1日-12月31日 周三至周日 全天：09:00-17:00 最晚入园时
                  间16:00
                  <span className={Styles['']}>备注：周一、周二闭馆</span>
                </div>
              </div>
            </div>
            <div className={Styles['line-box']}>
              <div>
                  <span className={Styles['line-leftBox-icon']}></span>
                  <span className={ClassNames(Styles['font28'],Styles['color_3e'])}>安全须知</span>
              </div>
              <div>
                <span className={ClassNames(Styles['color_94'],Styles['font28'])}>了解详情</span>
                <i className="fa fa-angle-right fa-lg" style={{"color":"#cacaca"}}></i>
              </div>
            </div>
          </div>
        </Scroll>
      </div>

    </div>
  }
}
