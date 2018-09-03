import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Scroll from '../../components/scroll'
import Header from '../../components/header'
import Router from 'umi/router'

import { connect } from 'dva'

@connect(({ticketDetail,loading})=>({
    ticketDetail,
    loading
}))
export  default class MerchartPhotos extends  React.Component{

  showPhoto(index){
     // console.log("index",index);
      //显示的图片
      Router.push(`/showPhotos?index=${index}`);
  }

  render(){
      let {ticketDetail} =  this.props.ticketDetail;
    return (
      <div className={Styles['photosListShow']}>
          <Header
            mode="light"
            leftContent={ <i className={Styles["headerleftIconBlack"]}></i>}
            leftClick={()=>{window.history.go(-1)}}
          >
            <div style={{"textAlign":'center','color':'#3E3E3E'}} className={Styles["font36"]}>商家相册</div>
          </Header>
            <div className={Styles['scroll-content']}>
              <Scroll class={Styles['wrapper']}>
                <div className={Styles['scroll-cotent-bottom']}>
                  <div className={Styles['photosList-box']}>
                      {
                          ticketDetail.images.map((item,index)=>{
                              return <div key={"item"+index} className={Styles['photoList-single']} onClick={this.showPhoto.bind(this,index)}>
                                  <img src={item}/>
                              </div>
                          })
                      }
                </div>
               </div>
            </Scroll>
          </div>
      </div>
    )
  }
}
