import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Header from '../../components/header'
import { Carousel } from 'antd-mobile';
import Scroll from '../../components/scroll'
import Router from 'umi/router'
import LineBox from  '../../components/lineBox'
import CardBox from  '../../components/cardBox'
import { connect } from 'dva'
import {Date,baseUtil} from '../../utils/util'

@connect(({ticketDetail,loading})=>({
    ticketDetail,
    loading
}))

export  default class ticketDetail extends  React.Component{
  constructor(props){
    super(props);
    this.state = {
        slideIndex: 0,
        showModel: false,
        showModelContent: "",
        pointNo: Router.location.query.point
    }
  }

  componentDidMount(){
    let {point} =  Router.location.query;
    this.props.dispatch({
        type:'ticketDetail/fetch',
        payload:{
            pointNo:point
        }
    })

  }
  scrollFun(){

  }
  //执行跳转
  showPhotosList(){
    Router.push('/merchantPhotos');
  }
  //preOrder 预定
  preOrder(tag,item){

      if(tag){
          this.setState({
              "showModelContent": item
          },()=>{
              this.setState({
                  "showModel": tag
              });
          });
          return;
      }
      this.setState({
          "showModel": tag
      });

  }
  renderBaseInfo(tag){
      let {showModelContent} =  this.state,
          {productBookRule,productUseRule,productRefundRule} = showModelContent;

      if(tag === "gpxz"){
          return <div className={Styles['writeOrder-cardContent']}>
              <div>
                  <div className={Styles["name"]}>订票须知</div>
                  <div>
                      {productBookRule.aheadTimeType == "1"?"15:00点前可订今日,预定后立即可用":`预定${baseUtil.getHours(productBookRule.aheadMinutes)}后可用`}<br/>
                      {productBookRule.aheadNote&& `(注: ${productBookRule.aheadNote})`}

                  </div>
              </div>
              <div>
                  <div className={Styles["name"]}>换票须知</div>
                  <div>{productUseRule.needTicket=="1"&&"持团子电子票 先换票再入园"||"无需换票，持团子电子票直接入园"}</div>
              </div>
              <div>
                  <div className={Styles["name"]}>退票须知</div>
                  <div>{
                    baseUtil.productRefundRule(productRefundRule.refundType)
                  }</div>
              </div>
          </div>
      }
      if(tag === "fybh"){
          return <div className={Styles['writeOrder-cardContent']}>
              {
                  showModelContent.costIncludeNote&&<div>
                  <div className={Styles[ "name" ]}>费用包含</div>
                  <div>{showModelContent.costIncludeNote}</div>
              </div>
              }
              {
                  showModelContent.costExcludeNote&&<div>
                    <div className={Styles[ "name" ]}>费用不含</div>
                    <div>{showModelContent.costExcludeNote}</div>
                  </div>
              }
              <div>
                  <div className={Styles["name"]}>其他</div>
                  <div>安仁古镇门票</div>
              </div>
          </div>
      }

      if(tag === "sysm"){
          return <div className={Styles['writeOrder-cardContent']}>
              {
                  productUseRule.voucherTimes&&<div>
                    <div className={Styles[ "name" ]}>换票时间</div>
                    <div>{`${productUseRule.voucherTimes.beginTime+"-"+productUseRule.voucherTimes.endTime}`}</div>
                  </div>
              }
              {
                  productUseRule.ticketGetAddress.length&&<div>
                      <div className={Styles[ "name" ]}>换票地址</div>
                      <div>{productUseRule.ticketGetAddress[0]}</div>
                  </div>
              }
              {
                  productUseRule.getInAddress.length&&<div>
                      <div className={Styles[ "name" ]}>入园地址</div>
                      <div>{productUseRule.getInAddress[0]}</div>
                  </div>
              }
          </div>
      }


  }
  //renderTop
  renderTop(){
      let _this =  this, {ticketDetail} =  this.props.ticketDetail;
      //console.log("ticketDetail",ticketDetail);
      if(!ticketDetail){
          return <div></div>
      }
      return <div>
          <Carousel
              className={Styles["carousel"]}
              autoplay={true}
              infinite
              dots={false}
              selectedIndex={this.state.slideIndex}
              afterChange={index => {this.setState({"slideIndex": index})}}
          >
              {ticketDetail&&ticketDetail.images.map((val, index) => (
                  <a
                      key={index}
                      href="javascript:;"
                      onClick={_this.showPhotosList.bind(_this,index)}
                      className={Styles['swiper-single-a']}
                  >
                      <img
                          src={val}
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
                  <div>{ticketDetail.pointAddress}</div>
                  <div>{this.state.slideIndex+1}/{ticketDetail.images.length}张</div>
              </div>
          </div>
      </div>
  }
  renderPhone(){
      let {ticketDetail} =  this.props.ticketDetail;
      return <div className={Styles["ticketAddress"]}>
          <div>
              {ticketDetail.pointAddress}
          </div>
          <div>
              <i className="fa fa-phone" aria-hidden="true"></i>
          </div>
      </div>
  }

  renderTicketDetial(){
      let {ticketDetail} =  this.props.ticketDetail;
      if(!ticketDetail){
          return;
      }
      return    <div className={Styles['card']}>
          <div className={Styles['card-Title']}>
              <span className={Styles['card-title-leftIcon']}></span>
              门票
          </div>
          <div className={Styles['card-content']}>
              {ticketDetail.productDetails.map((item,index)=>{
                  return <div key={"productDetails"+index} className={ClassNames(Styles['door-ticketList-single'],{
                      [Styles['borderBottom']]: index+1 === ticketDetail.productDetails.length?false:true
                  })}>
                      <div>
                          <div className={ClassNames(Styles['font28'],Styles['color_3e'])}>{item.productName}</div>
                          <div>
                              <span className={ClassNames(Styles['font20'],Styles['color_F60'])}>¥</span>
                              <span className={ClassNames(Styles['font34'],Styles['color_F60'])}>{item.showPrice}</span>
                              <span className={ClassNames(Styles['font20'],Styles['color_94'])}>起</span>
                          </div>
                      </div>
                      <div>
                          <div className={Styles['ticket-buy']} onClick={this.preOrder.bind(this,true, item)}>立即预订</div>
                      </div>
                  </div>
              })}

          </div>
      </div>
  }

  /**
   * 执行跳转
   */
  writeOrder(item){
    Router.push(`/fillOrder?pointNo=${this.state.pointNo}&productNo=${item.productNo}`)
  }

  renderTicketModel(){
      let { showModelContent } =  this.state,{ ticketDetail } =  this.props.ticketDetail;
      return <div className={ClassNames(Styles[ 'ticketDetail_model' ])}>
          <div className={Styles[ 'model' ]}></div>
          <div className={Styles[ 'ticketDetail_model_show' ]}>
              <div className={Styles[ 'close' ]} onClick={this.preOrder.bind(this,false)}>
                  <i className="fa fa-close fa-lg" style={{"color": "#000"}}></i>
              </div>
              <div className={Styles[ 'detail_title' ]}>
                  <div>
                      <img src={ticketDetail.images[0]}
                           alt=""/>
                  </div>
                  <div>
                      {showModelContent.productName}
                  </div>
              </div>
              <div className={ClassNames(Styles[ 'scroll-content' ], Styles[ "defaultHeight_detail" ])}>
                  <Scroll class={Styles[ 'wrapper' ]}>
                      <div className={Styles[ 'scroll-cotent-bottom' ]}>
                          <div className={Styles[ 'writeOrder_detail_content' ]}>
                              <div className={Styles[ 'mgtop20' ]}>
                                  <CardBox
                                      cardTitleIcon={true}
                                      cardTitle="购票须知"
                                      content={this.renderBaseInfo('gpxz')}
                                  />
                              </div>
                              <div className={Styles[ 'mgtop20' ]}>
                                  <CardBox
                                      cardTitleIcon={true}
                                      cardTitle="费用包含"
                                      content={this.renderBaseInfo('fybh')}
                                  />
                              </div>
                              <div className={Styles[ 'mgtop20' ]}>
                                  <CardBox
                                      cardTitleIcon={true}
                                      cardTitle="使用说明"
                                      content={this.renderBaseInfo('sysm')}
                                  />
                              </div>
                          </div>
                      </div>
                  </Scroll>
              </div>
              <div className={Styles[ 'writerOrder-btn' ]}>
                  <div>
                      <div>
                          <span className={ClassNames(Styles[ 'color_F48831' ], Styles[ 'font24' ])}>¥</span>
                          <span className={ClassNames(Styles[ 'color_F48831' ], Styles[ 'font40' ])}>{showModelContent.showPrice}</span>
                          <span className={ClassNames(Styles[ 'color_94' ], Styles[ 'font24' ])}>起</span>
                      </div>
                      <div onClick={this.writeOrder.bind(this, showModelContent)}>填写订单</div>
                  </div>
              </div>
          </div>
      </div>
  }
  render(){
    var _this = this;
    return <div className={ClassNames(Styles['ticketDetailContent'])}>
        <div className={Styles['ticketTop']}>
          <Header
            positionType ='positionAbolute'
            mode="none"
            leftContent={ <span className={Styles['leftBtnCircle']}><i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i></span>}
            leftClick={()=>{Router.push("/")}}
          ></Header>
            {this.renderTop()}
        </div>

      <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
        <Scroll class={Styles['wrapper']}>
          <div className={Styles['scroll-cotent-bottom']}>
              {this.renderPhone()}
              {this.renderTicketDetial()}
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
              <LineBox
                  leftIcon={true}
                  leftContent={<span className={ClassNames(Styles['font28'],Styles['color_3e'])}>安全须知</span>}
                  righIcon={true}
                  rightContent={<span className={ClassNames(Styles['color_94'],Styles['font28'])}>了解详情</span>}
              />
          </div>
        </Scroll>
      </div>

        {
            this.state.showModel&&this.renderTicketModel()
        }
    </div>
  }
}
