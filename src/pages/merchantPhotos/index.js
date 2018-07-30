import React from 'react'
import ClassNames from 'classnames'
import Styles from './index.less'
import Scroll from '../../components/scroll'
import Header from '../../components/header'
export  default class MerchartPhotos extends  React.Component{
  render(){
    return (
      <div className={Styles['photosListShow']}>
          <Header
            mode="light"
            leftContent={ <i className="fa fa-angle-left fa-lg" style={{"color":"#3E3E3E"}}></i>}
          >
            <div style={{"textAlign":'center','color':'#3E3E3E'}} >商家相册</div>
          </Header>
            <div className={Styles['scroll-content']}>
              <Scroll class={Styles['wrapper']}>
                <div className={Styles['scroll-cotent-bottom']}>
                  <div className={Styles['photosList-box']}>
                    <div className={Styles['photoList-single']}>
                      <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                    </div>
                    <div className={Styles['photoList-single']}>
                      <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                    </div>
                    <div className={Styles['photoList-single']}>
                      <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                    </div>
                    <div className={Styles['photoList-single']}>
                      <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                    </div>
                  <div className={Styles['photoList-single']}>
                    <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                  </div>
                  <div className={Styles['photoList-single']}>
                    <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                  </div>
                  <div className={Styles['photoList-single']}>
                    <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                  </div>
                  <div className={Styles['photoList-single']}>
                    <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                  </div>
                  <div className={Styles['photoList-single']}>
                    <img src='https://p0.meituan.net/400.0/travel/9172c05e9077f176ccec489278c553a4149430.jpg'/>
                  </div>
                </div>

               </div>
            </Scroll>
          </div>
      </div>

    )
  }
}
