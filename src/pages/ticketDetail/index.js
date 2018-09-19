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
import { Modal,List } from 'antd-mobile';

const alert = Modal.alert;

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
        pointNo: Router.location.query.point,
        showPhone: false
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
    //console.log("scroll",this.refs.scroll);
  }

  UNSAFE_componentWillReceiveProps(){
      this.refs.scroll.refresh();
     // console.log("UNSAFE_componentWillReceiveProps")
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
          return <div className={Styles['ticketDetial-cardContent']}>
              <div>
                  <div className={Styles["name"]}>订票须知:</div>
                  <div>
                      {productBookRule.aheadTimeType == "1"?"预定后立即可用":`需要提前${baseUtil.getHours(productBookRule.aheadMinutes)}购买`}<br/>
                      {productBookRule.aheadNote&& `(注: ${productBookRule.aheadNote})`}
                  </div>
              </div>
              <div>
                  <div className={Styles["name"]}>换票须知:</div>
                  <div>{productUseRule.needTicket=="1"&&"持团子电子票 先换票再入园"||"无需换票，持团子电子票直接入园"}</div>
              </div>
              <div>
                  <div className={Styles["name"]}>退票须知:</div>
                  <div>{
                    baseUtil.productRefundRule(productRefundRule.refundType)
                  }</div>
              </div>
          </div>
      }
      if(tag === "fybh"){
          return <div className={Styles['ticketDetial-cardContent']}>
              {
                  showModelContent.costIncludeNote&&<div>
                  <div className={Styles[ "name" ]}>费用包含:</div>
                  <div>{showModelContent.costIncludeNote}</div>
              </div>
              }
              {
                  showModelContent.costExcludeNote&&<div>
                    <div className={Styles[ "name" ]}>费用不含:</div>
                    <div>{showModelContent.costExcludeNote}</div>
                  </div>
              }
              {/*<div>
                  <div className={Styles["name"]}>其他</div>
                  <div>安仁古镇门票</div>
              </div>*/}
          </div>
      }

      if(tag === "sysm"){
          return <div className={Styles['ticketDetial-cardContent']}>
              {
                  productUseRule.voucherTimes&&<div>
                    <div className={Styles[ "name" ]}>换票时间:</div>
                    <div>{`${productUseRule.voucherTimes[0].beginTime+"-"+productUseRule.voucherTimes[0].endTime}`}</div>
                  </div>
              }
              {
                  productUseRule.ticketGetAddress.length&&<div>
                      <div className={Styles[ "name" ]}>换票地址:</div>
                      <div>{productUseRule.ticketGetAddress[0]}</div>
                  </div>||null
              }
              {
                  productUseRule.getInAddress.length&&<div>
                      <div className={Styles[ "name" ]}>入园地址:</div>
                      <div>{productUseRule.getInAddress[0]}</div>
                  </div>||null
              }
              {
                  productUseRule.otherNote&&<div>
                      <div className={Styles[ "name" ]}>注意事项:</div>
                      <div>{productUseRule.otherNote}</div>
                  </div>||null
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
      return <div style={{"height":"100%"}}>
          <Carousel
              className={Styles["carousel"]}
              autoplay={false}
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
                      style={{ display: 'block', position: 'relative', width: '100%',  height: "auto",}}
                  >
                      <img
                          src={baseUtil.replaceImgUrl(val)}
                          alt=""
                          style={{ width: '100%', verticalAlign: 'top'}}
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
                  <div><div style={{"WebkitBoxOrient":"vertical","boxOrient":'vertical',"MozBoxOrient":"vertical","msboxOrient":'vertical'}}>{ticketDetail.pointName}</div></div>
                  <div><div>{this.state.slideIndex+1}/{ticketDetail.images.length}张</div></div>
              </div>
          </div>
      </div>
  }
  renderPhone(){
      let {ticketDetail} =  this.props.ticketDetail, {servicePhones} = ticketDetail;
      return <div className={Styles["ticketAddress"]}  >
          <div>
              <div className={Styles["address_Icon"]}></div>
              <div>{ticketDetail.pointAddress}</div>
          </div>
          {
              servicePhones&&servicePhones.length&&<div onClick={this.callPhone.bind(this)}>
              <div className={Styles["ticketDetail_phone"]}></div>
          </div>||''
          }
      </div>
  }

  renderTicketDetial(){
      let {ticketDetail} =  this.props.ticketDetail;
      if(!ticketDetail){
          return;
      }
      return    <div className={Styles['card']}>
          <div className={Styles['card-Title']}>
            {/*  <div className={Styles['card-title-leftIcon']}></div>*/}
              <div className={ClassNames(Styles["name"], Styles["border_left"])}><span>门票</span></div>
          </div>
          <div className={Styles['card-content']}>
              {ticketDetail.productDetails.map((item,index)=>{
                  return <div key={"productDetails"+index} className={ClassNames(Styles['door-ticketList-single'],{
                      [Styles['borderBottom']]: index+1 === ticketDetail.productDetails.length?false:true
                  })} onClick={this.preOrder.bind(this,true, item)}>
                      <div>
                          <div className={ClassNames(Styles['font28'],Styles['color_3e'])}>{item.productName}</div>
                          <div>
                              <span className={ClassNames(Styles['font20'],Styles['color_F60'])}>¥</span>
                              <span className={ClassNames(Styles['font34'],Styles['color_F60'])}>{baseUtil.numFixed1(item.showPrice)}</span>
                              <span className={ClassNames(Styles['font20'],Styles['color_94'])}>起</span>
                          </div>
                      </div>
                      <div>
                          <div className={Styles['ticket-buy']} >立即预订</div>
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
      baseUtil.setSession("jcpm_fillOrder","");
      baseUtil.setSession("jpmp_dates","");
      baseUtil.set("cdqcp_passengers","");
    //把需要传入的参数存入session好了
    baseUtil.setSession("jqmp_ticketDetail",{
        pointNo:this.state.pointNo,
        productNo: item.productNo
    })
    Router.push(`/fillOrder`)
  }

  renderTicketModel(){
      let { showModelContent } =  this.state,{ ticketDetail } =  this.props.ticketDetail,
          {productBookRule,productUseRule,productRefundRule} = showModelContent;
      return <div className={ClassNames(Styles[ 'ticketDetail_model' ])}>
          <div className={Styles[ 'model' ]}></div>
          <div className={Styles[ 'ticketDetail_model_show' ]}>
              <div className={Styles[ 'close' ]} onClick={this.preOrder.bind(this,false)}>
                  <div className={Styles["closeBtn"]}></div>
              </div>
              <div className={Styles[ 'detail_title' ]}>
                  <div>
                      <div>
                        <img src={baseUtil.replaceImgUrl(ticketDetail.images[0])}
                             alt=""/>
                      </div>
                  </div>
                  <div>
                      <div style={{"WebkitBoxOrient":"vertical","boxOrient":'vertical',"MozBoxOrient":"vertical","msboxOrient":'vertical'}}>
                        {showModelContent.productName}
                      </div>
                  </div>
              </div>
              <div className={ClassNames(Styles[ 'scroll-content' ], Styles[ "defaultHeight_detail" ])}>
                  <Scroll class={Styles[ 'wrapper' ]}>
                      <div className={Styles[ 'scroll-cotent-bottom' ]}>
                          <div className={Styles[ 'writeOrder_detail_content' ]}>
                              <div>
                                  <CardBox
                                      cardTitleIcon={true}
                                      cardTitle="购票须知"
                                      content={this.renderBaseInfo('gpxz')}
                                  />
                              </div>
                              {(showModelContent.costIncludeNote||showModelContent.costExcludeNote)&&<div>
                                  <CardBox
                                      cardTitleIcon={true}
                                      cardTitle="费用包含"
                                      content={this.renderBaseInfo('fybh')}
                                  />
                              </div>||''}
                              <div>
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
                          <span className={ClassNames(Styles[ 'color_F48831' ], Styles[ 'font40' ])}>{baseUtil.numFixed1(showModelContent.showPrice)}</span>
                          <span className={ClassNames(Styles[ 'color_94' ], Styles[ 'font24' ])}>起</span>
                      </div>
                      <div onClick={this.writeOrder.bind(this, showModelContent)}>填写订单</div>
                  </div>
              </div>
          </div>
      </div>
  }
  renderPhoneModel(){
      let { showModelContent } =  this.state,{ ticketDetail } =  this.props.ticketDetail;
      return <div className={ClassNames(Styles[ 'ticketDetail_model' ])}>
          <div className={Styles[ 'model' ]} onClick={this.onClose.bind(this)}></div>
          <div className={Styles['mangBtn']}>
              <div className={Styles["btns"]}>
                  {
                      ticketDetail.servicePhones.length&&ticketDetail.servicePhones.map((item,key)=>{
                          return <div className={Styles["btn"]} key={"servicePhones"+key}><a href={`tel:${item.phone}`}>{item.phone}({item.startTime&&item.endTime?baseUtil.formatTime(item.startTime)+'-'+baseUtil.formatTime(item.endTime):''})</a></div>
                      })
                  }
                <div className={Styles["btn"]} onClick={this.onClose.bind(this)}>取消</div>
              </div>
          </div>
      </div>
  }
  render(){
    var _this = this;
    let {ticketDetail} =  this.props.ticketDetail,
        {servicePhones} = ticketDetail;
    if(!ticketDetail){
        <div className={ClassNames(Styles['ticketDetailContent'])}>
            <div className={Styles['ticketTop']}>
                <Header
                    positionType ='positionAbolute'
                    mode="none"
                    leftContent={ <span className={Styles['leftBtnCircle']}><i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i></span>}
                    leftClick={()=>{Router.push("/")}}
                ></Header>
            </div>
        </div>
    }
     // ticketDetail&&(ticketDetail.pointDes = baseUtil.get("pointDes"))
    //console.log("servicePhones",servicePhones);
    return <div className={ClassNames(Styles['ticketDetailContent'])}>
      <div className={ClassNames(Styles['scroll-content'],Styles["defaultHeight"])}>
        <Scroll class={Styles['wrapper']} ref='scroll'>
          <div className={Styles['scroll-cotent-bottom']} style={{"paddingBottom":"0"}}>
              <div className={Styles['ticketTop']}>
                  <Header
                      positionType ='positionAbolute'
                      mode="none"
                      leftContent={ <span className={Styles['leftBtnCircle']}><i className="fa fa-angle-left fa-lg" style={{"color":"#fff"}}></i></span>}
                      leftClick={()=>{Router.push("/")}}
                  ></Header>
                  {this.renderTop()}
              </div>
              {this.renderPhone()}
              {this.renderTicketDetial()}
              {ticketDetail.pointOpenInfo&&<div className={Styles[ 'card' ]}>
                  <div className={Styles[ 'card-Title' ]}>
                    {/*  <div className={Styles[ 'card-title-leftIcon' ]}></div>*/}
                      <div className={ClassNames(Styles["name"], Styles["border_left"])}><span>开放时间</span></div>
                  </div>
                  <div className={Styles[ 'card-content' ]}>
                      <div className={Styles[ 'card-content-text' ]}>
                          {ticketDetail.pointOpenInfo}
                          <div>以上信息仅供参考,具体以景区当日实际公示信息为准</div>
                      </div>
                  </div>
              </div>||''
              }
              {/*<div className={Styles['card']}>
                  <div className={Styles['card-Title']}>
                      <div className={Styles['card-title-leftIcon']}></div>
                      <div className={ClassNames(Styles["name"], Styles["border_left"])}><span>景点状态</span></div>
                  </div>
                  <div className={Styles['card-content']}>
                      <div className={Styles['card-content-text']}>
                          <div style={{"textAlign":"center","padding":"10px 0"}}>
                            {ticketDetail.pointState == "0"?"停售中":"正在营业"}
                          </div>
                      </div>
                  </div>
              </div>*/}
              {ticketDetail.pointDes&&<div className={Styles['card']}>
                  <div className={Styles['card-Title']}>
                     {/* <div className={Styles['card-title-leftIcon']}></div>*/}
                      <div className={ClassNames(Styles["name"], Styles["border_left"])}><span>景点介绍</span></div>
                  </div>
                  <div className={Styles['card-content']}>
                      <div className={ClassNames(Styles['card-content-text'],Styles['textStyle'] )} dangerouslySetInnerHTML={{__html:ticketDetail.pointDes}}>
                      </div>
                  </div>
              </div>||''}
              <LineBox
                  leftIcon={true}
                  leftContent={<span className={ClassNames(Styles['font32'],Styles['color_3e'])}>安全须知</span>}
                  rightIcon={true}
                  clickType='1'
                  clickTap={()=>{window.location.href='/article/article_pub?key=trip_safety_notice&server=queryProtocolDetail&temp_title=安全须知'}}
                  rightContent={<span className={ClassNames(Styles['color_94'],Styles['font28'])} style={{"verticalAlign":"middle"}}>了解详情</span>}

              />
          </div>
        </Scroll>
      </div>

        {
            this.state.showModel&&this.renderTicketModel()
        }

        {
            this.state.showPhone&&this.renderPhoneModel()
        }

    </div>
  }

  //打电话
    callPhone(){
        let {ticketDetail} =  this.props.ticketDetail, {servicePhones} = ticketDetail;
        if(servicePhones&&servicePhones.length){
            this.setState({
                "showPhone":true
            })
            return;
        }
        return;

    }
    onClose(phone){
    //  console.log(phone);
        this.setState({
            "showPhone":false
        });
      /*if(phone){
        return `tel:${phone}`
      }*/
    }
}
